const ecomUtils = require('@ecomplus/utils')

const removeAccents = str => str.trim()
  .replace(/[áàãâÁÀÃÂ]/gi, 'a')
  .replace(/[éêÉÊ]/gi, 'e')
  .replace(/[óõôÓÕÔ]/gi, 'o')
  .replace(/[íÍ]/gi, 'i')
  .replace(/[úÚ]/gi, 'u')
  .replace(/[çÇ]/gi, 'c')
  .replace(/[-.]/gi, '')

const getCategoriesAll = async ({ appSdk, storeId, auth }) => {
  let hasRepeat = true
  let offset = 0
  const limit = 1000
  const categoriesAll = []

  while (hasRepeat) {
    const query = `fields=name,slug,_id,parent&offset=${offset}&limit=${limit}`
    const categories = await appSdk.apiRequest(storeId, `/categories.json?${query}`, 'GET', null, auth)
      .then(({ response }) => {
        const { data: { result } } = response
        if (Array.isArray(result) && result.length) {
          return result
        } else {
          return null
        }
      })
      .catch((_err) => {
        return null
      })

    if (categories && Array.isArray(categories)) {
      categoriesAll.push(...categories)
    } else {
      hasRepeat = false
    }

    offset += limit
  }
  return categoriesAll
}

module.exports = async ({ appSdk, storeId, auth }, productId, tinyCategories) => {
  const categoriesAll = await getCategoriesAll({ appSdk, storeId, auth })
  if (categoriesAll.length) {
    const promises = []
    const categoriesToProduct = []
    let i = 0
    while (i < tinyCategories.length) {
      const tinyCategory = tinyCategories[i]
      i += 1
      const { id, descricao, idPai } = tinyCategory
      const category = categoriesAll.find(({ name }) => name.toUpperCase() === descricao.toUpperCase())
      if (!category) {
        const body = {
          name: descricao[0].toUpperCase() + descricao.substring(1),
          slug: removeAccents(descricao.toLowerCase())
            .replace(/[^a-z0-9-_./]/gi, '-')
        }

        body.metafields = [{
          _id: ecomUtils.randomObjectId(),
          namespace: 'tiny',
          field: 'idCategoria',
          value: `${id}`
        }]

        if (idPai) {
          const endpoint = `/categories.json?metafields.namespace=tiny&metafields.field=idCategoria&metafields.value=${idPai}&limit=1`
          const categoriaPai = await appSdk.apiRequest(storeId, endpoint, 'GET', null, auth)
            .then(({ response }) => {
              const { data: { result } } = response
              return result.length && result[0]
            })

          if (categoriaPai) {
            body.parent = {
              _id: categoriaPai._id,
              name: categoriaPai.name,
              slug: categoriaPai.slug
            }
          }
        }

        const newCategory = await appSdk.apiRequest(storeId, '/categories.json', 'POST', body, auth)
          .then(({ response }) => {
            const { data: { _id } } = response
            return { _id, ...body }
          })
          .catch(e => null)
        if (newCategory) {
          categoriesToProduct.push(newCategory)
        }
      } else {
        categoriesToProduct.push(category)
      }
    }
    categoriesToProduct.forEach(category => {
      promises.push(
        appSdk.apiRequest(storeId, `/products/${productId}/categories.json`, 'POST', { _id: category._id }, auth)
      )
    })
    await Promise.all(promises)
  }
}
