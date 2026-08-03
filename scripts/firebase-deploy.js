/**
 * Gera o arquivo `functions/.env`, lido em runtime por `functions/__env.js`.
 *
 * Este script NÃO faz mais o deploy. Antes ele chamava a API programática do
 * `firebase-tools` (`client.functions.config.set()` + `client.deploy()`), que
 * encerrava o processo com exit 0 sem publicar nada — deixando o workflow verde
 * enquanto a produção seguia parada. Ver issue #177.
 *
 * O deploy agora é feito pelo CLI, que falha alto quando algo dá errado:
 *   firebase deploy --only functions --project <id> --non-interactive
 */

require('dotenv').config()
const path = require('path')
const fs = require('fs')

require('./scripts-minification')

const { name, version } = require('../package.json')
const { project, baseUri } = require('./_constants')

const { SERVER_OPERATOR_TOKEN } = process.env

if (!SERVER_OPERATOR_TOKEN) {
  console.error('\x1b[31m%s\x1b[0m', 'SERVER_OPERATOR_TOKEN não definido')
  console.error(
    'As functions rejeitam todo webhook sem esse valor (functions/index.js, x-operator-token).'
  )
  process.exit(1)
}

const envFile = path.resolve(__dirname, '../functions/.env')

fs.writeFileSync(envFile, `NAME=${name}
VERSION=${version}
SERVER_OPERATOR_TOKEN=${SERVER_OPERATOR_TOKEN}
SERVER_BASE_URI=${baseUri}
`)

console.log('\x1b[32m%s\x1b[0m', `\nfunctions/.env escrito para o projeto '${project}'`)
console.log(`  NAME=${name}`)
console.log(`  VERSION=${version}`)
console.log(`  SERVER_BASE_URI=${baseUri}`)
console.log('  SERVER_OPERATOR_TOKEN=<definido>')
console.log()
