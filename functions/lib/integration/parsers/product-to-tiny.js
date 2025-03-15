const ecomUtils = require('@ecomplus/utils')

module.exports = (product, originalTinyProduct, appData, storeId) => {
  const hasVariations = product.variations && product.variations.length

  const tinyProduct = {
    sequencia: 1,
    origem: 0,
    situacao: product.available && product.visible ? 'A' : 'I',
    tipo: 'P',
    classe_produto: hasVariations ? 'V' : 'S',
    codigo: product.sku,
    nome: ecomUtils.name(product, 'pt_br').substring(0, 120),
    unidade: originalTinyProduct && originalTinyProduct.unidade
      ? originalTinyProduct.unidade
      : product.measurement && product.measurement.unit !== 'oz' && product.measurement.unit !== 'ct'
        ? product.measurement.unit.substring(0, 3).toUpperCase()
        : 'UN'
  }

  if (ecomUtils.onPromotion(product)) {
    tinyProduct.preco = product.base_price
    tinyProduct.preco_promocional = ecomUtils.price(product)
  } else {
    tinyProduct.preco = product.price
  }
  if (product.cost_price) {
    tinyProduct.preco_custo = product.cost_price
  }
  if (product.min_quantity) {
    tinyProduct.unidade_por_caixa = product.min_quantity < 1000
      ? String(product.min_quantity)
      : '999'
  }

  if (product.short_description) {
    tinyProduct.descricao_complementar = product.short_description
  }
  if (product.warranty) {
    tinyProduct.garantia = product.warranty.substring(0, 20)
  }

  if (product.mpn && product.mpn.length && !appData.disable_ncm) {
    tinyProduct.ncm = product.mpn[0]
  }
  if (product.gtin && product.gtin.length) {
    tinyProduct.gtin = product.gtin[0]
    if (product.gtin[1]) {
      tinyProduct.gtin_embalagem = product.gtin[1]
    }
  }

  if (product.weight && product.weight.value) {
    tinyProduct.peso_bruto = product.weight.value
    tinyProduct.peso_liquido = product.weight.value
    if (Number(storeId) === 4566) {
      product.weight.unit = 'g'
    }
    switch (product.weight.unit) {
      case 'mg':
        tinyProduct.peso_bruto /= 1000000
        tinyProduct.peso_liquido /= 1000000
        break
      case 'g':
        tinyProduct.peso_bruto /= 1000
        tinyProduct.peso_liquido /= 1000
    }
  }
  if (product.dimensions) {
    for (const side in product.dimensions) {
      if (product.dimensions[side] && product.dimensions[side].value) {
        let field = side === 'width'
          ? 'largura'
          : side === 'height' ? 'altura' : 'comprimento'
        field += '_embalagem'
        tinyProduct[field] = product.dimensions[side].value
        switch (product.dimensions[side].unit) {
          case 'mm':
            tinyProduct[field] *= 0.1
            break
          case 'm':
            tinyProduct[field] *= 100
        }
      }
    }
  }

  if (product.brands && product.brands.length) {
    tinyProduct.marca = product.brands[0].name
  }
  if (product.category_tree) {
    tinyProduct.categoria = product.category_tree.replace(/\s?>\s?/g, ' >> ').replace(/&+/g, 'e')
  } else if (product.categories && product.categories.length) {
    tinyProduct.categoria = product.categories.map(({ name }) => name).join(' >> ').replace(/&+/g, 'e')
  }

  if (product.pictures && product.pictures.length && !appData.disable_image_exportation) {
    tinyProduct.anexos = []
    product.pictures.forEach(({ zoom, big, normal }) => {
      const img = (zoom || big || normal)
      if (img) {
        tinyProduct.anexos.push({
          anexo: img.url
        })
      }
    })
  }

  if (originalTinyProduct) {
    tinyProduct.id = originalTinyProduct.id
    if (!appData.update_price) {
      ;['preco', 'preco_promocional', 'preco_custo'].forEach(field => {
        if (typeof originalTinyProduct[field] === 'number') {
          tinyProduct[field] = originalTinyProduct[field]
        }
      })
    }
  } else {
    tinyProduct.estoque_atual = product.quantity || 0
  }

  if (hasVariations) {
    tinyProduct.variacoes = []
    product.variations.forEach((variation, i) => {
      const tinyVariation = {
        codigo: variation.sku || `${product.sku}-${(i + 1)}`,
        grade: {}
      }
      if (!originalTinyProduct) {
        tinyVariation.estoque_atual = variation.quantity || 0
      }
      for (const gridId in variation.specifications) {
        const gridOptions = variation.specifications[gridId]
        if (gridOptions && gridOptions.length) {
          gridOptions.forEach(({ text }, i) => {
            tinyVariation.grade[i === 0 ? gridId : `${gridId}_${(i + 1)}`] = text
          })
        }
      }
      tinyProduct.variacoes.push({
        variacao: tinyVariation
      })
    })
  }

  return tinyProduct
}
