/* eslint-disable comma-dangle, no-multi-spaces, key-spacing */

/**
 * Edit base E-Com Plus Application object here.
 * Ref.: https://developers.e-com.plus/docs/api/#/store/applications/
 */

const app = {
  app_id: 105922,
  title: 'Tiny ERP',
  slug: 'tiny-erp',
  type: 'external',
  state: 'active',
  authentication: true,

  /**
   * Uncomment modules above to work with E-Com Plus Mods API on Storefront.
   * Ref.: https://developers.e-com.plus/modules-api/
   */
  modules: {
    /**
     * Triggered to calculate shipping options, must return values and deadlines.
     * Start editing `routes/ecom/modules/calculate-shipping.js`
     */
    // calculate_shipping:   { enabled: true },

    /**
     * Triggered to validate and apply discount value, must return discount and conditions.
     * Start editing `routes/ecom/modules/apply-discount.js`
     */
    // apply_discount:       { enabled: true },

    /**
     * Triggered when listing payments, must return available payment methods.
     * Start editing `routes/ecom/modules/list-payments.js`
     */
    // list_payments:        { enabled: true },

    /**
     * Triggered when order is being closed, must create payment transaction and return info.
     * Start editing `routes/ecom/modules/create-transaction.js`
     */
    // create_transaction:   { enabled: true },
  },

  /**
   * Uncomment only the resources/methods your app may need to consume through Store API.
   */
  auth_scope: {
    'stores/me': [
      'GET'            // Read store info
    ],
    procedures: [
      'POST'           // Create procedures to receive webhooks
    ],
    products: [
      'GET',           // Read products with public and private fields
      'POST',          // Create products
      'PATCH',         // Edit products
      // 'PUT',           // Overwrite products
      // 'DELETE',        // Delete products
    ],
    brands: [
      // 'GET',           // List/read brands with public and private fields
      // 'POST',          // Create brands
      // 'PATCH',         // Edit brands
      // 'PUT',           // Overwrite brands
      // 'DELETE',        // Delete brands
    ],
    categories: [
      'GET',           // List/read categories with public and private fields
      'POST',          // Create categories
      // 'PATCH',         // Edit categories
      // 'PUT',           // Overwrite categories
      // 'DELETE',        // Delete categories
    ],
    customers: [
      // 'GET',           // List/read customers
      // 'POST',          // Create customers
      // 'PATCH',         // Edit customers
      // 'PUT',           // Overwrite customers
      // 'DELETE',        // Delete customers
    ],
    orders: [
      'GET',           // List/read orders with public and private fields
      'POST',          // Create orders
      'PATCH',         // Edit orders
      // 'PUT',           // Overwrite orders
      // 'DELETE',        // Delete orders
    ],
    carts: [
      // 'GET',           // List all carts (no auth needed to read specific cart only)
      // 'POST',          // Create carts
      // 'PATCH',         // Edit carts
      // 'PUT',           // Overwrite carts
      // 'DELETE',        // Delete carts
    ],

    /**
     * Prefer using 'fulfillments' and 'payment_history' subresources to manipulate update order status.
     */
    'orders/fulfillments': [
      'GET',           // List/read order fulfillment and tracking events
      'POST',          // Create fulfillment event with new status
      // 'DELETE',        // Delete fulfillment event
    ],
    'orders/payments_history': [
      'GET',           // List/read order payments history events
      'POST',          // Create payments history entry with new status
      // 'DELETE',        // Delete payments history entry
    ],

    /**
     * Set above 'quantity' and 'price' subresources if you don't need access for full product document.
     * Stock and price management only.
     */
    'products/quantity': [
      // 'GET',           // Read product available quantity
      'PUT',           // Set product stock quantity
    ],
    'products/variations/quantity': [
      // 'GET',           // Read variaton available quantity
      'PUT',           // Set variation stock quantity
    ],
    'products/price': [
      // 'GET',           // Read product current sale price
      // 'PUT',           // Set product sale price
    ],
    'products/variations/price': [
      // 'GET',           // Read variation current sale price
      // 'PUT',           // Set variation sale price
    ],

    /**
     * You can also set any other valid resource/subresource combination.
     * Ref.: https://developers.e-com.plus/docs/api/#/store/
     */
  },

  admin_settings: {
    tiny_api_token: {
      schema: {
        type: 'string',
        maxLength: 255,
        title: 'Token da API Tiny',
        description: 'Onde encontrar o token: https://www.tiny.com.br/ajuda/api/api2-gerar-token-api'
      },
      hide: true
    },
    new_orders: {
      schema: {
        type: 'boolean',
        default: true,
        title: 'Exportar novos pedidos',
        description: 'Criar novos pedidos no Tiny automaticamente'
      },
      hide: true
    },
    approved_orders_only: {
      schema: {
        type: 'boolean',
        default: false,
        title: 'Apenas pedidos aprovados',
        description: 'Criar pedido no Tiny após aprovação'
      },
      hide: true
    },
    update_financial_orders_only: {
      schema: {
        type: 'boolean',
        default: false,
        title: 'Atualizar apenas status financeiro'
      },
      hide: true
    },
    ready_for_shipping_only: {
      schema: {
        type: 'boolean',
        default: false,
        title: 'Apenas pedidos prontos para envio',
        description: 'Criar pedido no Tiny a partir do status "preparado para envio"'
      },
      hide: true
    },
    new_products: {
      schema: {
        type: 'boolean',
        default: false,
        title: 'Exportar novos produtos',
        description: 'Criar novos produtos no Tiny automaticamente'
      },
      hide: true
    },
    update_quantity: {
      schema: {
        type: 'boolean',
        default: true,
        title: 'Importar estoques',
        description: 'Atualizar estoques na plataforma, necessário módulo "API para estoque em tempo real" no Tiny'
      },
      hide: true
    },
    update_product: {
      schema: {
        type: 'boolean',
        default: false,
        title: 'Sobrescrever produtos',
        description: 'Atualizar cadastro (não apenas estoque) de produtos importados já existentes na plataforma'
      },
      hide: true
    },
    update_price: {
      schema: {
        type: 'boolean',
        default: false,
        title: 'Exportar preços',
        description: 'Atualizar preços no Tiny automaticamente'
      },
      hide: true
    },
    disable_price: {
      schema: {
        type: 'boolean',
        default: false,
        title: 'Desabilitar importação de preços',
        description: 'Desabilitar importação de preços após importação do produto'
      },
      hide: true
    },
    disable_image_exportation: {
      schema: {
        type: 'boolean',
        default: false,
        title: 'Desabilitar exportação de imagem de produto',
        description: 'Desabilitar exportação da imagem do produto ao exportar o produto'
      },
      hide: true
    },
    disable_ncm: {
      schema: {
        type: 'boolean',
        default: false,
        title: 'Desabilitar sincronização de NCMs',
        description: 'Desabilitar importação/exportação de NCM/MPN de produtos'
      },
      hide: true
    },
    non_number: {
      schema: {
        type: 'boolean',
        default: false,
        title: 'Enviar número zero quando endereço não existir número',
        description: 'Quando não existe número, por padrão enviamos sem esse número, porém pode dar erro de sincronização com outras integrações vinculadas ao tiny'
      },
      hide: true
    },
    enable_category_import: {
      schema: {
        type: 'boolean',
        default: false,
        title: 'Importar categorias',
        description: 'Habilita importação de categorias em produtos enviados do Tiny'
      },
      hide: true
    },
    exportation: {
      schema: {
        title: 'Exportação manual',
        description: 'Fila a exportar para o Tiny, serão removidos automaticamente após exportação',
        type: 'object',
        properties: {
          product_ids: {
            title: 'Produtos a exportar',
            type: 'array',
            items: {
              type: 'string',
              pattern: '^[a-f0-9]{24}$',
              title: 'ID do produto'
            }
          },
          order_ids: {
            title: 'Pedidos a exportar',
            type: 'array',
            items: {
              type: 'string',
              pattern: '^[a-f0-9]{24}$',
              title: 'ID do pedido'
            }
          }
        }
      },
      hide: false
    },
    importation: {
      schema: {
        title: 'Importação manual',
        description: 'Fila a importar do Tiny, serão removidos automaticamente após importação',
        type: 'object',
        properties: {
          skus: {
            title: 'Produtos a importar',
            type: 'array',
            items: {
              type: 'string',
              title: 'SKU do produto ou variação',
              description: 'O estoque do produto será atualizado na plataforma se já existir com o mesmo SKU'
            }
          },
          order_numbers: {
            title: 'Pedidos a importar',
            type: 'array',
            items: {
              type: 'string',
              title: 'Número do pedido no Tiny',
              description: 'Número único do pedido de venda no Tiny'
            }
          }
        }
      },
      hide: false
    },
    tiny_order_data: {
      schema: {
        title: 'Configuração para novos pedidos no Tiny',
        description: 'Predefinições para pedidos exportados da plataforma para o Tiny',
        type: 'object',
        properties: {
          id_ecommerce: {
            type: 'integer',
            minimum: 1,
            maximum: 999999,
            title: 'ID do e-commerce cadastrado no Tiny'
          },
          id_vendedor: {
            type: 'integer',
            minimum: 1,
            maximum: 999999,
            title: 'ID do vendedor cadastrado no Tiny'
          },
          nome_vendedor: {
            type: 'string',
            maxLength: 50,
            title: 'Nome do vendedor'
          },
          valor_frete: {
            type: 'number',
            minimum: 0,
            maximum: 999999,
            title: 'Fixar valor do frete',
            description: 'Por padrão será enviado o frete original de cada pedido'
          },
          frete_por_conta: {
            type: 'string',
            enum: ['R', 'D'],
            title: 'Frete por conta',
            description: '"R"-Remetente, "D"-Destinatário'
          },
          valor_desconto: {
            type: 'number',
            minimum: 0,
            maximum: 999999,
            title: 'Fixar valor do desconto',
            description: 'Por padrão será enviado o desconto original de cada pedido'
          }
        }
      },
      hide: true
    },
    tiny_map_status: {
      schema: {
        title: 'Mapeamento de status',
        type: 'array',
        maxItems: 30,
        items: {
          title: 'Relacionar status',
          description: 'Escolha a equivalência de um status tiny para um status e-com.plus',
          type: 'object',
          properties: {
            ecom_status: {
              type: 'string',
              enum: [
                'Pendente',
                'Em análise',
                'Autorizado',
                'Pago',
                'Em disputa',
                'Estornado',
                'Cancelado',
                'Em produção',
                'Em separação',
                'NF emitida',
                'Pronto para envio',
                'Enviado',
                'Entregue',
                'Aguardando troca',
                'Devolvido',
                'Retorno e troca',
                'Não alterar status'
              ],
              title: 'Status e-com.plus'
            },
            tiny_status: {
              type: 'string',
              enum: [
                'Em aberto',
                'Aprovado',
                'Preparando envio',
                'Faturado',
                'Pronto para envio',
                'Enviado',
                'Entregue',
                'Não entregue',
                'Dados incompletos',
                'Cancelado'
              ],
              title: 'Status Tiny'
            }
          }
        }
      },
      hide: false
    },
    payment_method_maps: {
      schema: {
        title: 'Mapear de formas de pagamento',
        type: 'array',
        maxItems: 30,
        items: {
          title: 'Rótulo da forma de pagamento De > Para',
          type: 'object',
          properties: {
            from: {
              type: 'string',
              title: 'Rótulo original no pedido'
            },
            to: {
              type: 'string',
              title: 'Substituir pelo rótulo',
              description: 'Valor final enviado como "Meio de pagamento" para o Tiny'
            }
          }
        }
      },
      hide: false
    },
    shipping_method_maps: {
      schema: {
        title: 'Mapear de formas de envio',
        type: 'array',
        maxItems: 30,
        items: {
          title: 'Rótulo da forma de envio De > Para',
          type: 'object',
          properties: {
            from: {
              type: 'string',
              title: 'Rótulo original no pedido'
            },
            to: {
              type: 'string',
              title: 'Substituir pelo rótulo',
              description: 'Valor final enviado como "Forma de frete" para o Tiny'
            }
          }
        }
      },
      hide: false
    },
    logs: {
      schema: {
        title: 'Logs',
        type: 'array',
        maxItems: 300,
        items: {
          title: 'Registro de log',
          type: 'object',
          properties: {
            resource: {
              type: 'string',
              maxLength: 255,
              title: 'Recurso'
            },
            resource_id: {
              type: 'string',
              pattern: '^[a-f0-9]{24}$',
              title: 'ID do recurso'
            },
            tiny_id: {
              type: 'string',
              maxLength: 255,
              title: 'ID do recurso no Tiny'
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              title: 'Horário'
            },
            success: {
              type: 'boolean',
              default: true,
              title: 'Sucesso'
            },
            notes: {
              type: 'string',
              maxLength: 5000,
              title: 'Notas'
            }
          }
        }
      },
      hide: true
    }
  }
}

/**
 * List of Procedures to be created on each store after app installation.
 * Ref.: https://developers.e-com.plus/docs/api/#/store/procedures/
 */

const procedures = []

/**
 * Uncomment and edit code above to configure `triggers` and receive respective `webhooks`:
 */

const { baseUri } = require('./__env')

procedures.push({
  title: app.title,

  triggers: [
    // Receive notifications order new or edited with financial/fulfillment status:
    {
      resource: 'orders',
      field: 'financial_status',
    },
    {
      resource: 'orders',
      field: 'fulfillment_status',
    },

    // Receive notifications when products/variations prices changes:
    {
      resource: 'products',
      field: 'price',
    },
    {
      resource: 'products',
      subresource: 'variations',
      field: 'price',
    },

    // Receive notifications when new product is created:
    {
      resource: 'products',
      action: 'create',
    },

    /* Receive notifications when cart is edited:
    {
      resource: 'carts',
      action: 'change',
    },

    // Receive notifications when customer is deleted:
    {
      resource: 'customers',
      action: 'delete',
    },

    // Feel free to create custom combinations with any Store API resource, subresource, action and field.
    */
  ],

  webhooks: [
    {
      api: {
        external_api: {
          uri: `${baseUri}/ecom/webhook`
        }
      },
      method: 'POST'
    }
  ]
})

/*
 * You may also edit `routes/ecom/webhook.js` to treat notifications properly.
 */

exports.app = app

exports.procedures = procedures
