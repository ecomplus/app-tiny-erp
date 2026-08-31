const ecomUtils = require('@ecomplus/utils')
const axios = require('axios')
const FormData = require('form-data')
const { logger } = require('../../../context')

const replaceAccents = str => str.replace(/[áàãâÁÀÃÂ]/g, 'a')
  .replace(/[éêÉÊ]/g, 'e')
  .replace(/[óõôÓÕÔ]/g, 'o')
  .replace(/[íÍ]/g, 'i')
  .replace(/[úÚ]/g, 'u')
  .replace(/[çÇ]/g, 'c')

const tryImageUpload = (storeId, auth, originImgUrl, product) => {
  return axios.get(originImgUrl, {
    responseType: 'arraybuffer',
    timeout: 9000
  })
    .then(({ data }) => {
      const form = new FormData()
      form.append('file', Buffer.from(data), originImgUrl.replace(/.*\/([^/]+)$/, '$1'))
      return axios.post(`https://apx-storage.e-com.plus/${storeId}/api/v1/upload.json`, form, {
        headers: {
          ...form.getHeaders(),
          'X-Store-ID': storeId,
          'X-My-ID': auth.myId,
          'X-Access-Token': auth.accessToken
        },
        timeout: 15000
      })
    })
    .then(({ data, status }) => {
      if (data.picture) {
        for (const imgSize in data.picture) {
          if (data.picture[imgSize]) {
            if (!data.picture[imgSize].url) {
              delete data.picture[imgSize]
              continue
            }
            if (data.picture[imgSize].size !== undefined) {
              delete data.picture[imgSize].size
            }
            data.picture[imgSize].alt = `${product.name} (${imgSize})`
          }
        }
        if (Object.keys(data.picture).length) {
          return {
            _id: ecomUtils.randomObjectId(),
            ...data.picture
          }
        }
      }
      const err = new Error('Unexpected Storage API response')
      err.response = { data, status }
      throw err
    })
    .catch(err => {
      const status = err.response && err.response.status
      const data = err.response && err.response.data
      logger.warn(`Failed importing image for #${storeId} ${product.sku}: ${status || err.message}`, {
        originImgUrl,
        sku: product.sku,
        status,
        // a failed arraybuffer download yields a Buffer body — never serialize it
        response: Buffer.isBuffer(data) ? `<buffer ${data.length} bytes>` : data
      })
      return undefined
    })
}

const IMAGE_UPLOAD_CONCURRENCY = 10

module.exports = async (tinyProduct, storeId, auth, isNew = true, tipo, appData) => {
  const sku = tinyProduct.codigo || String(tinyProduct.id)
  const name = (tinyProduct.nome || sku).trim()
  const isProduct = tipo === 'produto'
  const fixToNumber = (price) => {
    return Number(price) > 0 ? Number(price) : 0
  }
  const price = fixToNumber(tinyProduct.preco_promocional || tinyProduct.precoPromocional) ||
    fixToNumber(tinyProduct.preco)
  const product = {
    available: tinyProduct.situacao === 'A',
    sku,
    name,
    price,
    base_price: Number(tinyProduct.preco),
    body_html: tinyProduct.descricao_complementar || tinyProduct.descricaoComplementar
  }
  const costPrice = fixToNumber(tinyProduct.preco_custo || tinyProduct.precoCusto)
  if (costPrice) {
    product.cost_price = costPrice
  }
  if (appData && appData.disable_price && !isNew && !isProduct) {
    delete product.price
  }
  if (tinyProduct.estoqueAtual) {
    product.quantity = tinyProduct.estoqueAtual
  }

  if (isNew) {
    if (tinyProduct.seo) {
      if (tinyProduct.seo.slug && tinyProduct.seo.slug.length) {
        product.slug = tinyProduct.seo.slug.trim()
      }
      if (tinyProduct.seo.title && tinyProduct.seo.title.length) {
        product.meta_title = tinyProduct.seo.title.slice(0, 254)
      }
      if (tinyProduct.seo.description && tinyProduct.seo.description.length) {
        product.meta_description = tinyProduct.seo.description.slice(0, 999)
      }
      if (tinyProduct.seo.keywords && tinyProduct.seo.keywords.length) {
        const splitChar = tinyProduct.seo.keywords.includes(',') ? ',' : '-'
        const keywords = tinyProduct.seo.keywords.split(splitChar)
        product.keywords = keywords.slice(0, 99).map((keyword) => keyword.substring(0, 50))
      }
    }
    if (!product.slug) {
      product.slug = replaceAccents(name.toLowerCase())
        .replace(/[\s.]+/g, '-')
        .replace(/[^a-z0-9-_/]/g, '')
      if (!/[a-z0-9]/.test(product.slug.charAt(0))) {
        product.slug = `p-${product.slug}`
      }
    }
  }

  if (tinyProduct.garantia) {
    product.warranty = tinyProduct.garantia
  }
  if (tinyProduct.unidade_por_caixa || tinyProduct.unidadePorCaixa) {
    const minQuantity = fixToNumber(tinyProduct.unidade_por_caixa || tinyProduct.unidadePorCaixa)
    if (minQuantity > 0) {
      product.min_quantity = minQuantity
    }
  }
  if (tinyProduct.ncm && !appData?.disable_ncm) {
    product.mpn = [tinyProduct.ncm]
  }
  const validateGtin = gtin => typeof gtin === 'string' && /^([0-9]{8}|[0-9]{12,14})$/.test(gtin)
  if (validateGtin(tinyProduct.gtin)) {
    product.gtin = [tinyProduct.gtin]
    if (validateGtin(tinyProduct.gtin_embalagem || tinyProduct.gtinEmbalagem)) {
      product.gtin.push(tinyProduct.gtin_embalagem || tinyProduct.gtinEmbalagem)
    }
  }

  const weight = !isProduct ? (tinyProduct.peso_bruto || tinyProduct.peso_liquido) : (tinyProduct.pesoBruto || tinyProduct.pesoLiquido)
  if (weight > 0) {
    product.weight = {
      unit: 'kg',
      value: parseFloat(weight)
    }
  }

  ;[
    ['largura', 'width'],
    ['altura', 'height'],
    ['comprimento', 'length']
  ].forEach(([lado, side]) => {
    const dimension = tinyProduct[`${lado}_embalagem`] || tinyProduct[`${lado}Embalagem`]
    if (dimension > 0) {
      if (!product.dimensions) {
        product.dimensions = {}
      }
      product.dimensions[side] = {
        unit: 'cm',
        value: parseFloat(dimension)
      }
    }
  })

  if (isNew) {
    if (Array.isArray(tinyProduct.variacoes) && tinyProduct.variacoes.length) {
      product.variations = []
      tinyProduct.variacoes.forEach(variacaoObj => {
        const variacao = !isProduct
          ? variacaoObj.variacao
          : variacaoObj
        const { codigo, preco, grade, estoqueAtual, anexos } = variacao
        if (grade) {
          const specifications = {}
          const specTexts = []
          const gridIdFormat = text => {
            return replaceAccents(text.toLowerCase())
              .replace(/\s+/g, '_')
              .replace(/[^a-z0-9_]/g, '')
              .substring(0, 30)
              .padStart(2, 'i')
          }
          if (!Array.isArray(grade)) {
            for (const tipo in grade) {
              if (grade[tipo]) {
                const gridId = gridIdFormat(tipo)
                const spec = {
                  text: grade[tipo]
                }
                specTexts.push(spec.text)
                if (gridId !== 'colors') {
                  spec.value = replaceAccents(spec.text.toLowerCase()).substring(0, 100)
                }
                specifications[gridId] = [spec]
              }
            }
          } else if (Array.isArray(grade)) {
            grade.forEach(gd => {
              const gridId = gridIdFormat(gd.chave)
              const spec = {
                text: gd.valor
              }
              specTexts.push(spec.text)
              if (gridId !== 'colors') {
                spec.value = replaceAccents(spec.text.toLowerCase()).substring(0, 100)
              }
              specifications[gridId] = [spec]
            })
          }
          let pictureId = 0
          if (Array.isArray(anexos) && anexos.length) {
            // variation images must be queued for upload even when the parent
            // product has no `anexos` of its own
            if (!Array.isArray(tinyProduct.anexos)) {
              tinyProduct.anexos = []
            }
            pictureId = tinyProduct.anexos.length
            for (const anexo of anexos) {
              tinyProduct.anexos.push(anexo)
            }
          }
          if (specTexts.length) {
            const variation = {
              _id: ecomUtils.randomObjectId(),
              name: `${name} / ${specTexts.join(' / ')}`.substring(0, 100),
              sku: codigo,
              specifications,
              quantity: estoqueAtual
            }
            if (Array.isArray(tinyProduct.anexos) && tinyProduct.anexos.length) {
              variation.picture_id = pictureId
            }
            const varPrice = parseFloat(preco)
            if (!isNaN(varPrice) && price !== varPrice) {
              variation.price = varPrice
            }
            const gtin = variacao.gtin || variacao.gtin_embalagem || variacao.gtinEmbalagem
            if (validateGtin(gtin)) {
              variacao.gtin = gtin
            }
            product.variations.push(variation)
          }
        }
      })
    }

    if (Array.isArray(tinyProduct.imagens_externas)) {
      product.pictures = []
      tinyProduct.imagens_externas.forEach(imagemExterna => {
        if (imagemExterna.imagem_externa) {
          const { url } = imagemExterna.imagem_externa
          if (url) {
            product.pictures.push({
              normal: { url },
              _id: ecomUtils.randomObjectId()
            })
          }
        }
      })
    }

    if (tinyProduct.anexos) {
      const images = []
      if (!product.pictures) {
        product.pictures = []
      }
      const { anexos } = tinyProduct
      const uploadQueue = []
      for (let i = 0; i < anexos.length; i++) {
        const anexo = anexos[i]
        const url = anexo && (anexo.anexo || anexo.url)
        if (typeof url === 'string' && url.startsWith('http')) {
          uploadQueue.push({ index: i, url })
        }
      }
      // sliding window: each worker picks the next pending upload as soon as
      // its current one settles, so one slow image never stalls the other slots
      let cursor = 0
      const runUploadWorker = async () => {
        while (cursor < uploadQueue.length) {
          const { index, url } = uploadQueue[cursor]
          cursor += 1
          images[index] = await tryImageUpload(storeId, auth, url, product)
        }
      }
      await Promise.all(uploadQueue.slice(0, IMAGE_UPLOAD_CONCURRENCY).map(runUploadWorker))
      // `images` stays indexed by anexo position for `picture_id` resolution below;
      // uploaded anexo pictures keep coming first in the gallery (legacy cover
      // behavior) with `imagens_externas` entries preserved after them, instead
      // of being overwritten by index collision
      product.pictures = [...images.filter(Boolean), ...product.pictures]
      if (Array.isArray(product.variations) && product.variations.length) {
        product.variations.forEach(variation => {
          if (variation.picture_id || variation.picture_id === 0) {
            const variationImage = images[variation.picture_id]
            if (variationImage && variationImage._id) {
              variation.picture_id = variationImage._id
            } else {
              delete variation.picture_id
            }
          }
        })
      }
    }
  }
  return product
}
