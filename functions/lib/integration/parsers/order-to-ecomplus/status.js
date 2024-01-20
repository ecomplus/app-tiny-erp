module.exports = (situacao, mapStatus) => {
  const parsePaymentStatus = (status) => {
    switch (status) {
      case 'Pendente':
        return 'pending'
      case 'Em análise':
        return 'under_analysis'
      case 'Autorizado':
        return 'authorized'
      case 'Pago':
        return 'paid'
      case 'Em disputa':
        return 'in_dispute'
      case 'Estornado':
        return 'refunded'
      case 'Cancelado':
        return 'voided'
        break;   
    }
  }
  const parseShippingStatus = (status) => {
    switch (status) {
      case 'Em produção':
        return 'in_production'
      case 'Em separação':
        return 'in_separation'
      case 'NF emitida':
        return 'invoice_issued'
      case 'Pronto para envio':
        return 'ready_for_shipping'
      case 'Enviado':
        return 'shipped'
      case 'Devolvido':
        return 'returned'
      case 'Entregue':
        return 'delivered'
      case 'Aguardando troca':
        return 'received_for_exchange'
      case 'Retorno e troca':
        return 'returned_for_exchange'
        break;   
    }
  }
  let financialStatus, fulfillmentStatus
  switch (situacao) {
    case 'aprovado':
      financialStatus = 'paid'
      break
    case 'preparando_envio':
    case 'preparando envio':
      fulfillmentStatus = 'in_separation'
      break
    case 'faturado':
    case 'faturado (atendido)':
    case 'atendido':
      fulfillmentStatus = 'invoice_issued'
      break
    case 'pronto_envio':
    case 'pronto para envio':
      fulfillmentStatus = 'ready_for_shipping'
      break
    case 'enviado':
      fulfillmentStatus = 'shipped'
      break
    case 'entregue':
      fulfillmentStatus = 'delivered'
      break
    case 'cancelado':
      financialStatus = 'voided'
      break
  }
  if (4566 == storeId) {
    console.log('Mapeando status in function', JSON.stringify(mapStatus))
  }
  if (Array.isArray(mapStatus) && mapStatus.length) {
    if (4566 == storeId) {
      console.log('Inside mapping')
    }
    const currentStatus = mapStatus.find(({tiny_status}) => tiny_status === situacao)
    if (4566 == storeId) {
      console.log('Find current status', JSON.stringify(currentStatus))
    }
    if (currentStatus && currentStatus.ecom_status) {
      financialStatus = parsePaymentStatus(currentStatus.ecom_status)
      fulfillmentStatus = parseShippingStatus(currentStatus.ecom_status)
    }
    if (4566 == storeId) {
      console.log('Result mapping', financialStatus, fulfillmentStatus)
    }
  }
  return { financialStatus, fulfillmentStatus }
}
