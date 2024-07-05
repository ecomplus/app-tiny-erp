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
  const getCategoriesAll = []

  while (hasRepeat) {
    const query = `fields=name,slug,_id,parent,metafields&offset=${offset}&limit=${limit}`
    const categories = await appSdk.apiRequest(storeId, `/categories.json?${query}`, 'GET', null, auth)
      .then(({ response }) => {
        const { data: { result } } = response
        if (Array.isArray(result) && result.length) {
          return result
        } else {
          return null
        }
      })
      .catch(console.error)

    if (categories && categories.length) {
      hasRepeat = categories.length === limit
      getCategoriesAll.push(...categories)
    } else {
      hasRepeat = false
    }

    offset += limit
  }
  return getCategoriesAll
}

module.exports = async ({ appSdk, storeId, auth }, productId, tinyCategories) => {
  const allStoreCategories = await getCategoriesAll({ appSdk, storeId, auth })
  if (allStoreCategories.length) {
    const categories = []
    let i = 0
    while (i < tinyCategories.length) {
      const tinyCategory = tinyCategories[i]
      i += 1
      const { id, descricao, idPai } = tinyCategory
      const category = allStoreCategories.find(({ name }) => name.toUpperCase() === descricao.toUpperCase())
      if (!category) {
        const body = {
          name: descricao,
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
          const categoriaPai = allStoreCategories.find(
            ({ metafields }) => metafields?.find(
              ({ namespace, field, value }) => namespace === 'tiny' && field === 'idCategoria' && value === `${idPai}`
            )
          )

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
          .catch(console.error)
        if (newCategory) {
          // next interation new category exists in store
          allStoreCategories.push(newCategory)

          const { _id, name, slug } = newCategory
          categories.push({ _id, name, slug })
        }
      } else {
        const { _id, name, slug } = category
        categories.push({ _id, name, slug })
      }
    }

    await appSdk.apiRequest(storeId, `/products/${productId}.json`, 'PATCH', { categories }, auth)
      .catch(console.error)
  }
}
