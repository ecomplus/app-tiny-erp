const { firestore } = require('firebase-admin')

module.exports = context => {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  const timestamp = firestore.Timestamp.fromDate(date)

  const delOldDocs = (collName, fieldName, fieldVal) => {
    return firestore()
      .collection(collName)
      .where(fieldName, '<', fieldVal)
      .limit(2000)
      .get().then(async querySnapshot => {
        for (const doc of querySnapshot.docs) {
          // eslint-disable-next-line no-await-in-loop
          await doc.ref.delete()
        }
        return querySnapshot
      })
  }

  return delOldDocs('tiny_orders', 'updatedAt', timestamp)
    .then(querySnapshot => {
      console.log(`> Deleted ${querySnapshot.size} Tiny order states`)
      return delOldDocs('integration_retries', 'd', date.toISOString())
    })
    .then(querySnapshot => {
      console.log(`> Deleted ${querySnapshot.size} integration retries`)
      return delOldDocs('tiny_stock_updates', 'updatedAt', timestamp)
    })
    .then(querySnapshot => {
      console.log(`> Deleted ${querySnapshot.size} Tiny stock entries`)
      return true
    })
}
