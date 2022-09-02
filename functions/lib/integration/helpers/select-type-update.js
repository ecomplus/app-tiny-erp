module.exports = latestUpdate => {
    if (latestUpdate.status) {
        switch (latestUpdate.status) {
            case 'pending':
            case 'under_analysis':
            case 'unknown':
            case 'authorized':
            case 'partially_paid':
            case 'voided':
            case 'refunded':
            case 'in_dispute':
            case 'unauthorized':
            case 'paid':
                return 'financial'
            case 'in_production':
            case 'in_separation':
            case 'invoice_issued':
            case 'ready_for_shipping':
            case 'shipped':
            case 'partially_shipped':
            case 'delivered':
            case 'returned':
                return 'fulfillment'
        }
    }
    return 'financial'
}
  