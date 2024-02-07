const admin = require('firebase-admin')
const { setup } = require('@ecomplus/application-sdk')
const { getFirestore } = require('firebase-admin/firestore')

const parseVariation = require('../integration/parsers/product-to-tiny-variation')

const getAppSdk = () => {
  return new Promise(resolve => {
    setup(null, true, admin.firestore())
      .then(appSdk => resolve(appSdk))
  })
}

const firestoreColl = 'variations'
module.exports = async () => {
  const appSdk = await getAppSdk(admin)
  let documentRef, storeId, product, variations, originalTinyProduct, appData
  if (firestoreColl) {
    const db = getFirestore()
    const d = new Date(new Date().getTime() - 9000)
    const documentSnapshot = await db.collection(firestoreColl)
      .where('queuedAt', '<=', d)
      .orderBy('queuedAt')
      .limit(1)
      .get()
    const info = documentSnapshot.docs && documentSnapshot.docs[0] && documentSnapshot.docs[0].data()
    storeId = info.storeId
    appData = info.appData
    product = info.product
    variations = info.variations
    originalTinyProduct = info.originalTinyProduct
    documentRef = require('firebase-admin')
      .firestore()
      .doc(`${firestoreColl}/${storeId}`)
      return appSdk.getAuth(storeId)
      .then(async (auth) => {
          if (variations && variations.length) {
            const products = variations.slice(0, 8)
            for (let i = 0; i < products.length; i++) {
              try {
                  console.log('Sending:', products.length, 'index:', i)
                  const parsedVariation = parseVariation(product, products[i], originalTinyProduct, appData, storeId)
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  tiny.post('/produto.alterar.php', {
                    produto: {
                      produtos: [{
                        produto: parsedVariation
                      }]
                    }
                  }).then(async response => {
                    console.log(`Product ${products[i].codigo} sync successfully | #${storeId}`, response.data)
                    variations.splice(i, 1)
                    await documentRef.set({
                      storeId,
                      product,
                      variations,
                      originalTinyProduct,
                      appData,
                      queuedAt: admin.firestore.Timestamp.now()
                    })
                    console.log(`#${storeId} saving in firestore list of products after create or update`, products.length) 
                  })
              } catch (err) {
                  console.error(`Product ${products[i]._id} sync failed | #${storeId}`, err)
              }
            }
          }
      })
      .catch((err) => {
        if (err.appWithoutAuth) {
          console.error(err)
        } else {
          throw err
        }
      })
      .then(() => {
        console.log('>> End Event exportation')
      })
  }
}
