# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.0.1](https://github.com/ecomplus/application-starter/compare/v3.4.2...v4.0.1) (2025-02-14)


### Bug Fixes

* add timeout to external image download, reduce timeout to upload on storage api ([4660a79](https://github.com/ecomplus/application-starter/commit/4660a79ee6278df9344784dd09bbd6b02ba674b0))
* better debugging failed requests on tiny webhook throw ([4e24226](https://github.com/ecomplus/application-starter/commit/4e24226a89f212bbca8aaa54227a9c6c863a47ae))
* better debugging failed requests on tiny webhook throw ([6614081](https://github.com/ecomplus/application-starter/commit/6614081d31458d6c670e5f692f99346037e505ee))
* cleaning special chars from order notes on export ([33b401a](https://github.com/ecomplus/application-starter/commit/33b401a14367f48afc40e9bf69cbb990176c861f))
* delay to throw and retry on tiny events ended with 503 (rate limit) ([70c5b95](https://github.com/ecomplus/application-starter/commit/70c5b9596e9f515c58ea92ad9fe8fc645347d725))
* fix checking min quantity to number from tiny data on product import ([99582f1](https://github.com/ecomplus/application-starter/commit/99582f136946f9d77065afe37108ca4ee474bc74))
* prevent infinite retries on queue with store api 403 error ([d67dd60](https://github.com/ecomplus/application-starter/commit/d67dd60a24e10b51af5623206f3433a02ffc2d13))
* properly parsing prices from tiny on product import ([6f950e8](https://github.com/ecomplus/application-starter/commit/6f950e8141d082f50086cf53784aef91d99e18de))
* replacing & in item names to avoid order erros ([#164](https://github.com/ecomplus/application-starter/issues/164)) ([7558a98](https://github.com/ecomplus/application-starter/commit/7558a98407d9a130f9dd5df1c2bfdbeefc2afb91))

### [3.4.2](https://github.com/ecomplus/application-starter/compare/v3.4.0...v3.4.2) (2024-09-11)


### Bug Fixes

* **ecom-config:** add permission to manipulate categories ([52d77f9](https://github.com/ecomplus/application-starter/commit/52d77f9fc47d90e03f38b95d41531a457bded2e3))
* fix handling sync image uploads on product import ([3d7ce21](https://github.com/ecomplus/application-starter/commit/3d7ce212876c543917085f865876979570fa9806))
* **import-categories:** update debug ([2c3aaf0](https://github.com/ecomplus/application-starter/commit/2c3aaf09f9f0bf50e48299aad66d4bbadc0afc5b))
* **import-image:** set timeout to import image ([c8fb988](https://github.com/ecomplus/application-starter/commit/c8fb98825fd459fe3fc40a1a2795e7d4dfc227e1))
* **import-images:** fix import images ([8a08a5f](https://github.com/ecomplus/application-starter/commit/8a08a5f0b6dc203fcebf31fbd1a2d23218a13047))
* **import-product:** disable images queue ([9600aa4](https://github.com/ecomplus/application-starter/commit/9600aa4eec2fc9e6f0c9bddcd99cce8cbfa421e0))
* **import-product:** remove function images queue ([ce83dd7](https://github.com/ecomplus/application-starter/commit/ce83dd731774090f618504770a594de463bef8c3))
* **import-products:** add debug to import category ([a609484](https://github.com/ecomplus/application-starter/commit/a609484a6af08954dda719af59fba6b6e0fa31b6))
* **import-products:** remove import images ([ed81b97](https://github.com/ecomplus/application-starter/commit/ed81b97f3e62fa305dd5e3987b09ab0aa87c49b0))
* list stores from auths up to 48h ([0deebf0](https://github.com/ecomplus/application-starter/commit/0deebf04ff234bb80fe2f8a3a3685914b9ffc383))
* properly checking keywords max items and length on product import ([389ffc4](https://github.com/ecomplus/application-starter/commit/389ffc4027652fadb8f6547520178f3584c2aeb5))
* **webhook-tiny:** back webhooks ([f5c9df5](https://github.com/ecomplus/application-starter/commit/f5c9df584a3d4c2e1f66fb9fc3ffa3095b1393bd))
* **webhook-tiny:** remove unnecessary comments ([eb2bdf6](https://github.com/ecomplus/application-starter/commit/eb2bdf6298dafdaf6fe4aeb821799a6f861dfeb8))

### [3.4.1](https://github.com/ecomplus/application-starter/compare/v3.4.0...v3.4.1) (2024-09-10)


### Bug Fixes

* **ecom-config:** add permission to manipulate categories ([52d77f9](https://github.com/ecomplus/application-starter/commit/52d77f9fc47d90e03f38b95d41531a457bded2e3))
* **import-products:** add debug to import category ([a609484](https://github.com/ecomplus/application-starter/commit/a609484a6af08954dda719af59fba6b6e0fa31b6))
* list stores from auths up to 48h ([0deebf0](https://github.com/ecomplus/application-starter/commit/0deebf04ff234bb80fe2f8a3a3685914b9ffc383))
* properly checking keywords max items and length on product import ([389ffc4](https://github.com/ecomplus/application-starter/commit/389ffc4027652fadb8f6547520178f3584c2aeb5))

## [3.4.0](https://github.com/ecomplus/application-starter/compare/v3.3.0...v3.4.0) (2024-07-08)


### Features

* cron to check exported orders and enqueue if needed ([20f1344](https://github.com/ecomplus/application-starter/commit/20f134464290aa82ea35ca80f579a46fcff133c7))
* **ecom-config:** mapping status ([d8f66d5](https://github.com/ecomplus/application-starter/commit/d8f66d50e209eab5ad91274304269e24895b1fcd))
* **ecom-config:** option to enable update for only financial status ([23b3bbd](https://github.com/ecomplus/application-starter/commit/23b3bbd9203d80bbb9a4b8cdcf648554a7ee209c))
* **ecom-config:** set procedure to get shipping line to modification ([136e98b](https://github.com/ecomplus/application-starter/commit/136e98babe20a28c17227650bfdae29c31448185))
* **parse-status:** parse status with mapping ([9c29f3e](https://github.com/ecomplus/application-starter/commit/9c29f3eff8447833884cd7de336bee591569b008))


### Bug Fixes

* **deps:** update dependency @google-cloud/firestore to v6 ([#119](https://github.com/ecomplus/application-starter/issues/119)) ([01d59db](https://github.com/ecomplus/application-starter/commit/01d59db6cd383fc0eadc4fbb8453b652c938ba67))
* **deps:** update dependency @google-cloud/pubsub to v4 ([#145](https://github.com/ecomplus/application-starter/issues/145)) ([19c3303](https://github.com/ecomplus/application-starter/commit/19c3303d186bb29a9e5fa80d75e350c24dfde43a))
* **deps:** update dependency firebase-functions to v4 ([#134](https://github.com/ecomplus/application-starter/issues/134)) ([0c5ff45](https://github.com/ecomplus/application-starter/commit/0c5ff45987a6bf055ff8b0e9993d0fe36b45df2a))
* **import-categories:** add error debugging in requests ([349d4d9](https://github.com/ecomplus/application-starter/commit/349d4d928e6584d2dc14c744710cf28ee25e7254))
* **import-categories:** change configuration description and fix checks for importing categories ([ea84873](https://github.com/ecomplus/application-starter/commit/ea8487327df3e59e6f5c20add198fb9ff5885694))
* **import-categories:** change configuration description and run category import on product updates ([ab14772](https://github.com/ecomplus/application-starter/commit/ab14772d36d1bd9de9461c14176744b42a39ed49))
* **import-categories:** improves requests to search, create and add categories to the product ([2191f46](https://github.com/ecomplus/application-starter/commit/2191f46c25147134ef9bdee746a1a0db67bbb664))
* **import-products:** syntax error from importation ([0e0f3ed](https://github.com/ecomplus/application-starter/commit/0e0f3ed578f0076187b158d9b9171019fad2b34b))
* listing less orders on check exports cron filtering any _from-tiny_ fulfillment ([e79ab98](https://github.com/ecomplus/application-starter/commit/e79ab9853cfa0ae51201225454b9c460af96f26e))
* **product-to-ecomplus:** handle properly variation ([52acd39](https://github.com/ecomplus/application-starter/commit/52acd397e4e69084913de3aad16b240fa168541e))
* properly adding order ids (string) to queue on exported orders check ([9184150](https://github.com/ecomplus/application-starter/commit/9184150f8fed53c6a556debf512038085285fb61))
* properly checking already exported orders by id on cron check ([6d9535a](https://github.com/ecomplus/application-starter/commit/6d9535af17a3747f2801bc745a43b7e7bc292896))
* properly checking already exported orders by id on cron check ([04f8a19](https://github.com/ecomplus/application-starter/commit/04f8a1914def926dc6b3126cd13ab4d348095360))

## [3.3.0](https://github.com/ecomplus/application-starter/compare/v3.2.1...v3.3.0) (2023-07-27)


### Features

* add option to automatically export orders on ready for shipping only ([27301f6](https://github.com/ecomplus/application-starter/commit/27301f65a6acbdd1c437bb841e6e59db15a01a8f))

### [3.2.1](https://github.com/ecomplus/application-starter/compare/v3.2.0...v3.2.1) (2023-07-27)


### Bug Fixes

* check stores stock entries date up to 5min on product import ([316c4b3](https://github.com/ecomplus/application-starter/commit/316c4b3562cce741560bd8318aa34e35124d86e2))
* **export-order:** double check order id before exporting ([40464ee](https://github.com/ecomplus/application-starter/commit/40464ee4be015c776f2fdef3a2442b4a0bb4e863))
* **export-order:** send inscription number only when is state ([011b3ac](https://github.com/ecomplus/application-starter/commit/011b3ac8d37f8d410046ebc36fbc4e64c4db20a7))
* **export-order:** send inscription number when (optional) type is undefined ([2031786](https://github.com/ecomplus/application-starter/commit/2031786d382806bbfa9672f14a29dbfee7e2c430))
* **format-date:** set less 3 hours from zero utc server date ([6913d70](https://github.com/ecomplus/application-starter/commit/6913d7092f04a4d97ef25d833e2020b42b8330b3))
* **import-order:** find order by correct prop when use ecom: ([a874071](https://github.com/ecomplus/application-starter/commit/a8740712fb53d59575887924521e86764a267459))
* **product-to-ecomplus:** parse image from exactly order from tiny ([5591509](https://github.com/ecomplus/application-starter/commit/5591509f6054a2b1ef59c0ae9ec21617cea1df84))

## [3.2.0](https://github.com/ecomplus/application-starter/compare/v3.1.2...v3.2.0) (2023-03-10)


### Features

* **import-order:** search tiny order by `numeroEcommerce` with prefix 'ecom:' ([#141](https://github.com/ecomplus/application-starter/issues/141)) ([a061685](https://github.com/ecomplus/application-starter/commit/a061685aa2f5864cfd23f7720162d9cdcdf1880c))


### Bug Fixes

* **Base Uri:** fix base Uri bug ([01f79c9](https://github.com/ecomplus/application-starter/commit/01f79c96b92bb5636f5d539b8fef2044ff0058e6))
* **clear:** properly delete old stock entries by timestamp ([2204ac2](https://github.com/ecomplus/application-starter/commit/2204ac276ab60156072ad1cd26a992bbcfdb5c39))
* **export-order:** parse buyer name to avoid invalid chars ([#127](https://github.com/ecomplus/application-starter/issues/127)) ([475fd03](https://github.com/ecomplus/application-starter/commit/475fd038060e2ff9351b86765e27f5e1c2478ac5))
* **pub-sub:** fix pubsub not repeating and authentication error ([77c91e6](https://github.com/ecomplus/application-starter/commit/77c91e65334709f2021cab3432c60b20f66a4760))
* **tiny-webhooks:** using pub/sub to queue tiny webhook events ([#130](https://github.com/ecomplus/application-starter/issues/130)) ([a6587c5](https://github.com/ecomplus/application-starter/commit/a6587c5b2b020c5295d0992354edfbdfce4799a0))

### [3.1.2](https://github.com/ecomplus/application-starter/compare/v3.1.1...v3.1.2) (2022-09-05)


### Bug Fixes

* **deps:** update all non-major dependencies ([f25957f](https://github.com/ecomplus/application-starter/commit/f25957f8a6429d4642fb72b8df7b1e2502414c97))
* **export-order:** check if has updated by tiny before send ([#120](https://github.com/ecomplus/application-starter/issues/120)) ([3f2d6b3](https://github.com/ecomplus/application-starter/commit/3f2d6b354a03458e6480e6c86c2213ac82ace7f3))
* **export-orders:** properly checking last status and prevent integration loop ([b10c49d](https://github.com/ecomplus/application-starter/commit/b10c49da66d3593128fd0bf8bef33522f54a2252))
* path function ([#122](https://github.com/ecomplus/application-starter/issues/122)) ([ccff0b4](https://github.com/ecomplus/application-starter/commit/ccff0b4e477178612697934b4038d54091a2e7ad))

### [3.1.1](https://github.com/ecomplus/application-starter/compare/v3.1.0...v3.1.1) (2022-07-08)


### Bug Fixes

* **import-product:** subtracting `saldoReservado` from quantitiy ([#113](https://github.com/ecomplus/application-starter/issues/113)) ([290f01b](https://github.com/ecomplus/application-starter/commit/290f01b5ee5285456a2e285c1a89bfe138336ba8))

## [3.1.0](https://github.com/ecomplus/application-starter/compare/v3.0.1...v3.1.0) (2022-06-28)


### Features

* **import:** import new product from tiny ([#110](https://github.com/ecomplus/application-starter/issues/110)) ([584ca51](https://github.com/ecomplus/application-starter/commit/584ca51227428b035de8052986316e0959a64281))

### [3.0.1](https://github.com/ecomplus/application-starter/compare/v3.0.0...v3.0.1) (2022-06-24)


### Bug Fixes

* **export-order:** properly handle partially paid status ([3df9692](https://github.com/ecomplus/application-starter/commit/3df96923e0f23852bd67f66422d68a2348824ffe))
* financial status already have current ([#109](https://github.com/ecomplus/application-starter/issues/109)) ([06604e7](https://github.com/ecomplus/application-starter/commit/06604e72e89abe467f594ccccf9f1ea8fc393d77))
* **parse-status:** Do not send to tiny partially_paid as paid ([3fd5508](https://github.com/ecomplus/application-starter/commit/3fd5508c8a8f2ebbe71d0866047717e490152bc6))

## [3.0.0](https://github.com/ecomplus/application-starter/compare/v2.0.0...v3.0.0) (2022-06-23)


### Bug Fixes

* **Base Uri:** fix base uri bug ([d55681b](https://github.com/ecomplus/application-starter/commit/d55681b18ff138b1942681c7c93756c1de729f48))

## [2.0.0](https://github.com/ecomplus/application-starter/compare/v1.6.5...v2.0.0) (2022-06-23)


### Features

* **parse-order-status:** add returned status as cancel ([#81](https://github.com/ecomplus/application-starter/issues/81)) ([5f8d179](https://github.com/ecomplus/application-starter/commit/5f8d179a9960a35f2cdbfdf931dfea3d43742b98))


### Bug Fixes

* **deps:** install @google-cloud/firestore again :confused: ([7e34e5b](https://github.com/ecomplus/application-starter/commit/7e34e5b678171ccf0a287a40fc3ff9981d05c8ac))
* **deps:** remove @google-cloud/firestore from direct function dependencies ([ecc73c5](https://github.com/ecomplus/application-starter/commit/ecc73c55a964a71a968b21b0390c351767113fc9))
* **deps:** update all non-major dependencies ([#82](https://github.com/ecomplus/application-starter/issues/82)) ([beb1446](https://github.com/ecomplus/application-starter/commit/beb1446a4e13cebc46c2eab8946b69fb0edf7845))
* **deps:** update all non-major dependencies ([#89](https://github.com/ecomplus/application-starter/issues/89)) ([62ea56c](https://github.com/ecomplus/application-starter/commit/62ea56c18d60223d89b58c987a4e209b6896b5d0))
* **deps:** update dependency firebase-admin to v10 ([#85](https://github.com/ecomplus/application-starter/issues/85)) ([17eee22](https://github.com/ecomplus/application-starter/commit/17eee22000a5464faaa62ea02cb6a009fe6750b3))
* **import-product:** add id on picture when parsing tiny `imagem_externa` ([#86](https://github.com/ecomplus/application-starter/issues/86)) ([d4e9932](https://github.com/ecomplus/application-starter/commit/d4e99325cf31015367bbe5aea5e7861f7593159c))
* **import-product:** query by `skus` and prefer visible/available items ([819b231](https://github.com/ecomplus/application-starter/commit/819b2315082efe3695c1094e8c8b14d3159cd807))
* **parse-status:** js syntax fix ([5ba8556](https://github.com/ecomplus/application-starter/commit/5ba85564345080e92bbf978a5bdcc6ac18879fca))
* **webhook:** debug proxy to v2 error and continue as fallback ([8bc939a](https://github.com/ecomplus/application-starter/commit/8bc939a461166ae19c01cdc28bdf5406237790a4))
* **webhook:** proxy requests on function v1 to new v2 ([ca2ea01](https://github.com/ecomplus/application-starter/commit/ca2ea018713bda4066e3d554b18c87b3be7a9196))
* **webhook:** proxy to function v2 with x-store-id header ([b2d9b28](https://github.com/ecomplus/application-starter/commit/b2d9b28b6debd1d97eb43876879fe6c9811d9d1f))

### [1.6.5](https://github.com/ecomplus/application-starter/compare/v1.6.4...v1.6.5) (2021-10-29)


### Bug Fixes

* **ecom-webhook:** delay (but not skip) webhooks by orders/products ([965bb49](https://github.com/ecomplus/application-starter/commit/965bb49cf0bafdbbaee5c53f5c04318fc3e37efb))

### [1.6.4](https://github.com/ecomplus/application-starter/compare/v1.6.3...v1.6.4) (2021-10-29)


### Bug Fixes

* **ecom-webhook:** delay (but not skip) webhooks by orders/products resources ([b1db289](https://github.com/ecomplus/application-starter/commit/b1db28997f7175552b8c6a4b3bcc52f07c867008))

### [1.6.3](https://github.com/ecomplus/application-starter/compare/v1.6.2...v1.6.3) (2021-10-26)


### Bug Fixes

* **ecom-config:** remove procedure trigger by order create (keep order + status only) ([69ed8c3](https://github.com/ecomplus/application-starter/commit/69ed8c336c31f8162d18f5a06225e4fbde001978))

### [1.6.2](https://github.com/ecomplus/application-starter/compare/v1.6.1...v1.6.2) (2021-10-11)


### Bug Fixes

* **handle-job:** prevent trying `then` when null job, and debug it ([53663be](https://github.com/ecomplus/application-starter/commit/53663be8ee144d83e5d867d9d23ea1114fc6ef15))
* **tiny-webhook:** return 503 when sync order import is not successful ([fae1a02](https://github.com/ecomplus/application-starter/commit/fae1a02e913eeb3b0b5173857c8ae01823f3d3ea))

### [1.6.1](https://github.com/ecomplus/application-starter/compare/v1.6.0...v1.6.1) (2021-10-08)


### Bug Fixes

* **admin-settings:** `approved_orders_only` defaults to true ([702b627](https://github.com/ecomplus/application-starter/commit/702b62794dd1fa4dda7873d0097815519c08688f))
* **export-product:** tiny product `codigo` with up to 30 chars ([#70](https://github.com/ecomplus/application-starter/issues/70)) ([c017a7e](https://github.com/ecomplus/application-starter/commit/c017a7edc6cc209896eb00856c8502256329146d))
* **import-product:** end process when product should not be updated and `tinyProduct` not set ([addd669](https://github.com/ecomplus/application-starter/commit/addd6698cff26aadf7db309b101a9cbcb5d9d1f4))

## [1.6.0](https://github.com/ecomplus/application-starter/compare/v1.5.5...v1.6.0) (2021-09-09)


### Features

* **admin-settings:** support option to export approved orders only [[#49](https://github.com/ecomplus/application-starter/issues/49)] ([907644d](https://github.com/ecomplus/application-starter/commit/907644dce870e11f836cd0e015208354fc7431e7))
* **export-order:** write discount coupon to tiny order obs ([933eb7a](https://github.com/ecomplus/application-starter/commit/933eb7a22ad3ee561096eb2ec7706b94839d7df4))


### Bug Fixes

* **deps:** update all non-major dependencies ([#50](https://github.com/ecomplus/application-starter/issues/50)) ([77036c4](https://github.com/ecomplus/application-starter/commit/77036c4b5f68d05f056c7ec0a4087c8a95351ad8))
* **deps:** update all non-major dependencies ([#56](https://github.com/ecomplus/application-starter/issues/56)) ([b80fd3e](https://github.com/ecomplus/application-starter/commit/b80fd3edcb49cc916b0e0cab677625c8ef6c703d))
* **deps:** update dependency dotenv to v10 ([#51](https://github.com/ecomplus/application-starter/issues/51)) ([88dec6a](https://github.com/ecomplus/application-starter/commit/88dec6a435329d5eec04da1e4410c315ed248a6c))
* **product-to-ecomplus:** prevent null `warranty` while importing from tiny ([d0b90ea](https://github.com/ecomplus/application-starter/commit/d0b90ea0c7431d276e6cc35d6fbd30cad7106692))

### [1.5.5](https://github.com/ecomplus/application-starter/compare/v1.5.4...v1.5.5) (2021-05-19)


### Bug Fixes

* **export-order:** fix preventing new orders exports when option disabled ([#48](https://github.com/ecomplus/application-starter/issues/48)) ([b04e0ff](https://github.com/ecomplus/application-starter/commit/b04e0ff18206f1331994b2e7212fe84f71d0896e))

### [1.5.4](https://github.com/ecomplus/application-starter/compare/v1.5.3...v1.5.4) (2021-04-22)


### Bug Fixes

* **deps:** update all non-major dependencies ([#25](https://github.com/ecomplus/application-starter/issues/25)) ([4a78a2a](https://github.com/ecomplus/application-starter/commit/4a78a2a3e43a5edca9ea32e9a88b89480f20314a))
* **deps:** update all non-major dependencies ([#28](https://github.com/ecomplus/application-starter/issues/28)) ([63a4cda](https://github.com/ecomplus/application-starter/commit/63a4cda07d4bb9c3c34bf3ca82a97eec3873d4d5))
* **order-states:** clear documents older than 1 day ([f13ca0c](https://github.com/ecomplus/application-starter/commit/f13ca0c05a68ccf986e6ac3ec8a0c0fc8603d523))

### [1.5.3](https://github.com/ecomplus/application-starter/compare/v1.5.2...v1.5.3) (2021-02-04)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to 22.0.0-firestore.1.14.2 ([a3cb253](https://github.com/ecomplus/application-starter/commit/a3cb2530b17556d6ebee6c1e4637aaee85e82889))
* **tiny-webhook:** fix response for products mapping (tiny expected response schema) ([8148a28](https://github.com/ecomplus/application-starter/commit/8148a2828a0cfb0f9b179978802c881e931cfba1))
* **tiny-webhook:** fix response for products mapping (try following tiny sample instead of doc) ([6fc3433](https://github.com/ecomplus/application-starter/commit/6fc3433ba9b42081a6ad3f62ee3bd3aab3090986))

### [1.5.2](https://github.com/ecomplus/application-starter/compare/v1.5.1...v1.5.2) (2021-01-18)

### [1.5.1](https://github.com/ecomplus/application-starter/compare/v1.5.0...v1.5.1) (2021-01-18)


### Bug Fixes

* **deps:** update all non-major dependencies ([#23](https://github.com/ecomplus/application-starter/issues/23)) ([3e9200d](https://github.com/ecomplus/application-starter/commit/3e9200da404c6b9bbe4db8a9886a3658b5d88b6f))
* **sync-from-tiny:** fix checking promises to wait before saving skus ([e25a3cf](https://github.com/ecomplus/application-starter/commit/e25a3cff30ee2bdffdd821f2757468bd66078059))
* **sync-from-tiny:** try fix reading skus from 'tiny_stock_updates' to queue again ([c2bce15](https://github.com/ecomplus/application-starter/commit/c2bce156497351829938b5803869f26d3442c6cb))

## [1.5.0](https://github.com/ecomplus/application-starter/compare/v1.4.1...v1.5.0) (2021-01-18)


### Features

* **sync-from-tiny:** queue retry from 'tiny_stock_updates' coll saved skus ([a7e3bfb](https://github.com/ecomplus/application-starter/commit/a7e3bfb0b52d3a0154d24166300395a2f4d49474))

### [1.4.1](https://github.com/ecomplus/application-starter/compare/v1.4.0...v1.4.1) (2020-12-21)


### Bug Fixes

* **deps:** update all non-major dependencies ([#20](https://github.com/ecomplus/application-starter/issues/20)) ([c022c9a](https://github.com/ecomplus/application-starter/commit/c022c9ab1ae6b6a60edffdc8c2facc387c641481))
* **import-products:** check all stock updates, delete old ones ([8219a08](https://github.com/ecomplus/application-starter/commit/8219a08bf2b902abb244199843df3678ab2d30ee))

## [1.4.0](https://github.com/ecomplus/application-starter/compare/v1.3.0...v1.4.0) (2020-12-10)


### Features

* **tiny-webhook:** also handling products notifications ([#4](https://github.com/ecomplus/application-starter/issues/4)) ([ca71860](https://github.com/ecomplus/application-starter/commit/ca71860293a49042934b039ebb268e9f7bf811bc))

## [1.3.0](https://github.com/ecomplus/application-starter/compare/v1.2.17...v1.3.0) (2020-12-10)


### Features

* **tiny-webhooks:** handling order updates and stock webhooks from tiny erp ([#4](https://github.com/ecomplus/application-starter/issues/4)) ([1774433](https://github.com/ecomplus/application-starter/commit/17744330e637d2a7f901d63c8bb1b1e4f18c41ee))


### Bug Fixes

* **deps:** update all non-major dependencies ([#18](https://github.com/ecomplus/application-starter/issues/18)) ([7eac2b9](https://github.com/ecomplus/application-starter/commit/7eac2b94cb18dd08550acb02d0edcfc6778a48f9))
* **import-order:** fix endpoint to try matching order by metafield value ([90396d6](https://github.com/ecomplus/application-starter/commit/90396d673f4135f365479e5c2b99283e3d2746de))
* **import-order:** prevent error with undefined 'shippingLine.invoices' ([1c17c43](https://github.com/ecomplus/application-starter/commit/1c17c439d0b509b46cd687aa8ff6bfbfff5a07f7))

### [1.2.17](https://github.com/ecomplus/application-starter/compare/v1.2.16...v1.2.17) (2020-11-05)


### Bug Fixes

* **sync:** back with sync from tiny scheduled function ([8372578](https://github.com/ecomplus/application-starter/commit/83725780b32e88f1a651f287f8302dbe35873811))

### [1.2.16](https://github.com/ecomplus/application-starter/compare/v1.2.15...v1.2.16) (2020-11-05)


### Bug Fixes

* **refresh-tokens:** add scheduled cloud function to run update ([b6f85e0](https://github.com/ecomplus/application-starter/commit/b6f85e092f2656a4d980747b7f6d3505810e4965))

### [1.2.15](https://github.com/ecomplus/application-starter/compare/v1.2.14...v1.2.15) (2020-11-04)


### Bug Fixes

* **deps:** update all non-major dependencies ([#16](https://github.com/ecomplus/application-starter/issues/16)) ([6c941d2](https://github.com/ecomplus/application-starter/commit/6c941d26898030534cde7a65535222b39c982d2e))
* **import-order:** accept tracking url without tracking code ([4668199](https://github.com/ecomplus/application-starter/commit/46681996e0713c270142f7015d2c7dfe073c5eef))
* **import-order:** accept tracking url without tracking code (set from link) ([cd80d38](https://github.com/ecomplus/application-starter/commit/cd80d3845faceea45f02c3c1406e9c55ed5f6e78))
* **import-order:** normalize tiny order status (situacao) to parse ([6761ddd](https://github.com/ecomplus/application-starter/commit/6761ddd02184c846d272d9a44c1c26ac7e457c38))

### [1.2.14](https://github.com/ecomplus/application-starter/compare/v1.2.13...v1.2.14) (2020-11-01)


### Bug Fixes

* **export-order:** ignoring orders with no financial status ([#15](https://github.com/ecomplus/application-starter/issues/15)) ([78f3b9c](https://github.com/ecomplus/application-starter/commit/78f3b9cf63a277a110ad5bade134bf88b6f45610))
* **export-product:** handling error exporting not found product ([e1fb16e](https://github.com/ecomplus/application-starter/commit/e1fb16e8c97ed1a63337109390ac142a70c6859b))

### [1.2.13](https://github.com/ecomplus/application-starter/compare/v1.2.12...v1.2.13) (2020-10-28)


### Bug Fixes

* **post-job-handler:** update queue when retry is skiped only ([dbcc692](https://github.com/ecomplus/application-starter/commit/dbcc692bb06b54ad3529c21125d1d0e57edc4da0))

### [1.2.12](https://github.com/ecomplus/application-starter/compare/v1.2.11...v1.2.12) (2020-10-28)


### Bug Fixes

* **scheduled-sync:** syntax fix, documentSnapshot in place of document ([5b79020](https://github.com/ecomplus/application-starter/commit/5b79020722e9ad86be6e2f40efb9af2188dcb145))

### [1.2.11](https://github.com/ecomplus/application-starter/compare/v1.2.10...v1.2.11) (2020-10-28)


### Bug Fixes

* **scheduled-sync:** fix getting running proccess from firestore (doc .get) ([4029de6](https://github.com/ecomplus/application-starter/commit/4029de63629892447847b642c64cea9cbf34aa0d))

### [1.2.10](https://github.com/ecomplus/application-starter/compare/v1.2.9...v1.2.10) (2020-10-28)


### Bug Fixes

* **webhook:** handling queue fallback when has more ids ([b082756](https://github.com/ecomplus/application-starter/commit/b0827569a2859a08ba3944c9f440361845efd380))
* **webhook:** set final key with timestamp to further check by time diff ([6e605fa](https://github.com/ecomplus/application-starter/commit/6e605fa51e827d0e9751dcd87190b255ca23c229))

### [1.2.9](https://github.com/ecomplus/application-starter/compare/v1.2.8...v1.2.9) (2020-10-28)


### Bug Fixes

* **import-product:** dispatch null job is a function ([db1b622](https://github.com/ecomplus/application-starter/commit/db1b62248e72d06abe22d1d08f13938688c4a8e5))
* **import-products:** debug not founds and dispatch null job ([1462377](https://github.com/ecomplus/application-starter/commit/1462377f5c7d898902ac5b27f0c18bb28506aef5))
* **post-job-handler:** delay to clear running key ([ffdda4c](https://github.com/ecomplus/application-starter/commit/ffdda4c71749dbfcc1fb5b86906a7bbadac3118e))
* **post-job-handler:** delay to uncount running processes ([1f247b9](https://github.com/ecomplus/application-starter/commit/1f247b9788b9600928884149e238532e50446f32))
* **post-job-handler:** stop skipping update queue ([ba15f3e](https://github.com/ecomplus/application-starter/commit/ba15f3e8c7d34a7eae7ca273507cc5a592dc47dc))
* **queues:** also set init key with timestamp, clear doc reset (no more necessary) ([dfbb41b](https://github.com/ecomplus/application-starter/commit/dfbb41b44ea01c6e6d6c2bb0cb3365555687877d))
* **queues:** always delay and watch document snapshopt to check init key timestamp ([fc15ed6](https://github.com/ecomplus/application-starter/commit/fc15ed6cff811a73011e4f6e48e68f306ff0ba8b))
* **queues:** always delay and watch document snapshopt to check init key timestamp ([3301d33](https://github.com/ecomplus/application-starter/commit/3301d337c87f8064dff72629072e885c3718f6cf))
* **queues:** one more key by action name and next id (bool) ([1cfae7a](https://github.com/ecomplus/application-starter/commit/1cfae7ad8d63ab0fe4934f771b5a9734885f4d4e))
* **queues:** replace init key with single key ([89e178d](https://github.com/ecomplus/application-starter/commit/89e178dce41a42474b75b417654cd8e3f1b7bfdb))
* **queues:** set key with trigger datetime, back with init key ([e5dfa03](https://github.com/ecomplus/application-starter/commit/e5dfa038cf93465e037f76080c504bde351321d8))
* **queues:** uncount request on post job handler only ([bfd4484](https://github.com/ecomplus/application-starter/commit/bfd4484cb38f9bda2c2f2cd8a553027e57cc0f95))
* **queues:** use key as object property intead of keys array ([122157d](https://github.com/ecomplus/application-starter/commit/122157daf1eee5cf574d06d764843943254e576c))
* **webhook:** add init key to prevent same time requests ([85fff79](https://github.com/ecomplus/application-starter/commit/85fff791d59692f34d0b277af32afc9b84af4722))
* **webhook:** add reset queue fallback ([0e48fa5](https://github.com/ecomplus/application-starter/commit/0e48fa58cff0040e490747c4c321753ec51b3089))
* **webhook:** don't return 502 for applications triggers on too much requests ([e7ff399](https://github.com/ecomplus/application-starter/commit/e7ff39995c8ce4b9e4cf5e4c4cffae54f1d927b1))
* **webhook:** ensure uncount request on rejection ([0a6bdee](https://github.com/ecomplus/application-starter/commit/0a6bdeede82d10336b9ac8bacd06162a8a9f4a39))
* **webhook:** fix calling uncount request before handler ([8301eb5](https://github.com/ecomplus/application-starter/commit/8301eb55afa063c5fd9fb5b10e300bb58d4bd324))
* **webhook:** fix firesatore object keys to valid chars ([fb61c8a](https://github.com/ecomplus/application-starter/commit/fb61c8a77434e3d9658eb56c69cf2f1fc592916a))
* **webhook:** fix handling queue reset fallback (check snapshot) ([b7a4a47](https://github.com/ecomplus/application-starter/commit/b7a4a4723f196a10902a76927ea700635174b764))
* **webhook:** fix normalizing key with next id ([7553323](https://github.com/ecomplus/application-starter/commit/75533234d60c807f9e66d190fa5b84fb35569495))
* **webhook:** fix normalizing key with next id ([1edbc20](https://github.com/ecomplus/application-starter/commit/1edbc2010a6e7635bddac0f9d917c1bb2196704f))
* **webhook:** fix passing current running keys and count to promise chain ([5b291f7](https://github.com/ecomplus/application-starter/commit/5b291f703d43449d4972a9edfc05c4f23bd8f042))
* **webhook:** fix reseting running count and checking current keys ([321e122](https://github.com/ecomplus/application-starter/commit/321e122a9f597a01fcd97ccfc24a35565bff0b6a))
* **webhook:** fix reseting running count and checking current keys ([179bdaa](https://github.com/ecomplus/application-starter/commit/179bdaa8b65ec6cf5c5af13e403304b405417a9a))
* **webhook:** preset running count before keys ([f63fff6](https://github.com/ecomplus/application-starter/commit/f63fff65e1317d1779fa7edd73d762fb46e4519d))
* **webhook:** random delay when running key is set ([db1c475](https://github.com/ecomplus/application-starter/commit/db1c475921af85508a4203232f49a48f5e298646))
* **webhook:** respecting hard stop from running coll ([9bb7cd1](https://github.com/ecomplus/application-starter/commit/9bb7cd106c3689998c6ffe27a4138f2e97455e0e))
* **webhook:** still watching document and recheck process key before calling handler ([f418abb](https://github.com/ecomplus/application-starter/commit/f418abbf2b83871257e25095cca2736fcf0c3fdb))
* **webhook:** try controlling running on memory (object) ([d85efce](https://github.com/ecomplus/application-starter/commit/d85efce97ee905105878d56ca7d0121b69811398))
* **webhook:** try controlling running on memory (object) ([b0fd1ad](https://github.com/ecomplus/application-starter/commit/b0fd1ad12673548a4ac219ea7f7f3acebb113891))

### [1.2.8](https://github.com/ecomplus/application-starter/compare/v1.2.7...v1.2.8) (2020-10-27)


### Bug Fixes

* **import-product:** ignore process from hidden queue without identified product ([8d0b124](https://github.com/ecomplus/application-starter/commit/8d0b1241417bd0efc62ce8e79da998fb95823bc2))
* **parse-product:** prefer 'normal' for new external pictures ([23d9069](https://github.com/ecomplus/application-starter/commit/23d90690f2ad61d0ed940f5dbc9c47aa425df5c4))
* **post-job-handler:** ensure post job even for null promise results ([10a6d38](https://github.com/ecomplus/application-starter/commit/10a6d38dd83056d3495fbec6ab5aa2b95e1990c8))
* **post-job-handler:** indexOf in place of findIndex to get current id index on queue ([4b95f81](https://github.com/ecomplus/application-starter/commit/4b95f811021c870c1280a0ad140a03098931be04))
* **post-job-queue:** properlly handling retry and requeue ([a55e897](https://github.com/ecomplus/application-starter/commit/a55e897ba0b1bfd8f7720f57a51679b505d183a8))
* **queues:** removing queue entry on post job handler only ([a5cd21a](https://github.com/ecomplus/application-starter/commit/a5cd21a26b5b1df9732600e865c6cc1e59028800))
* **queues:** removing queue entry on post job handler only (don\'t skip importations) ([81fd7c7](https://github.com/ecomplus/application-starter/commit/81fd7c74e9ae4fc6450d9d3a182e5622bbce7c44))
* **webhook:** ensure running keys is array ([23811c1](https://github.com/ecomplus/application-starter/commit/23811c1703ce569e71e780e390d82b84ebfd8c68))
* **webhook:** fix checking for internal/hidden action names ([6d97120](https://github.com/ecomplus/application-starter/commit/6d97120153dcb4aa70943e9a6829ebbe54ed3a45))
* **webhook:** fix checking for internal/hidden action names ([8f8025c](https://github.com/ecomplus/application-starter/commit/8f8025cd42bae9a35b96053c88043f8f70f49eae))
* **webhook:** fix setting running document keys ([0320983](https://github.com/ecomplus/application-starter/commit/0320983793cb609ec30c0731d32df7db9fed003f))
* **webhook:** set resource id on running key ([a23ce49](https://github.com/ecomplus/application-starter/commit/a23ce497465f75164c9a62280183411209412e5f))
* **webhook:** set resource id on running key ([daae83b](https://github.com/ecomplus/application-starter/commit/daae83b234803390da1ebe5930dd8620ccfaae05))

### [1.2.7](https://github.com/ecomplus/application-starter/compare/v1.2.6...v1.2.7) (2020-10-26)


### Bug Fixes

* **action-queues:** prevent overwriting action object props on update ([b7d3ba8](https://github.com/ecomplus/application-starter/commit/b7d3ba887eb44a0f4f43df786cd4d7ee0cb3bd46))
* **import-product:** prevent saving negative item quantity ([bcae64c](https://github.com/ecomplus/application-starter/commit/bcae64c21e1ee4603089233c5c25ade1ddf17fa1))
* **webhook:** fix mocking integration config after order/product webhooks ([f32e1d9](https://github.com/ecomplus/application-starter/commit/f32e1d993dce5b1528b70b50bdb5d5f91e0e0ac5))
* **webhooks:** respond with 202 after update app data (queue) only ([32e86f7](https://github.com/ecomplus/application-starter/commit/32e86f724667ee84f0096c9a717410ffc0f85d32))

### [1.2.6](https://github.com/ecomplus/application-starter/compare/v1.2.5...v1.2.6) (2020-10-26)


### Bug Fixes

* **import-product:** fix validating slug first char ([9fff7c1](https://github.com/ecomplus/application-starter/commit/9fff7c12489ba3e454adfae42a9b0a35a5d2e9a9))

### [1.2.5](https://github.com/ecomplus/application-starter/compare/v1.2.4...v1.2.5) (2020-10-26)


### Bug Fixes

* **import-product:** prevent overwriting existent product slug ([80f93d3](https://github.com/ecomplus/application-starter/commit/80f93d31f20200528e7f8cf623364ebf0401d98f))

### [1.2.4](https://github.com/ecomplus/application-starter/compare/v1.2.3...v1.2.4) (2020-10-26)


### Bug Fixes

* **import-product:** fix handling variation id to update variation quantity ([c048684](https://github.com/ecomplus/application-starter/commit/c0486846216d3f305bd09bfb799b7be658b5bffa))
* **import-product:** fix setting find product promise before job proceed ([80a3394](https://github.com/ecomplus/application-starter/commit/80a3394371b3f7398e0333bec5ad73c6f14f31c5))

### [1.2.3](https://github.com/ecomplus/application-starter/compare/v1.2.2...v1.2.3) (2020-10-26)


### Bug Fixes

* **deps:** update all non-major dependencies ([#9](https://github.com/ecomplus/application-starter/issues/9)) ([1985e0b](https://github.com/ecomplus/application-starter/commit/1985e0bb68f7b5890dd7737d82c0cb73bc893062))

### [1.2.2](https://github.com/ecomplus/application-starter/compare/v1.2.1...v1.2.2) (2020-10-26)


### Bug Fixes

* **import-product:** must set storeId for requests with ecomClient ([48af81c](https://github.com/ecomplus/application-starter/commit/48af81cdf166edfccc9b199996490a1ecabe7e71))

### [1.2.1](https://github.com/ecomplus/application-starter/compare/v1.2.0...v1.2.1) (2020-10-25)


### Bug Fixes

* **import-product:** fix handling update info for products with variations ([0555177](https://github.com/ecomplus/application-starter/commit/0555177d5b6de45766376a1ed25606b7246bbe46))

## [1.2.0](https://github.com/ecomplus/application-starter/compare/v1.1.2...v1.2.0) (2020-10-25)


### Features

* **import-product:** optionally update products info (PATCH) ([012360b](https://github.com/ecomplus/application-starter/commit/012360b2ba2beffe40e50e6836050458bb1c306c))


### Bug Fixes

* **import-product:** fix adding variations to internal import queue ([b80af30](https://github.com/ecomplus/application-starter/commit/b80af306add9c192959f799e62855ed2ae6f3dc6))
* **import-product:** fix getting dimensions fields from tiny product ([#7](https://github.com/ecomplus/application-starter/issues/7)) ([62970de](https://github.com/ecomplus/application-starter/commit/62970de6193e6c4b81b566e7b4dee606f73c8812))
* **import-product:** fix importing/updating products with variations (find variation) ([c3f05b6](https://github.com/ecomplus/application-starter/commit/c3f05b6b7087fd70f606f878d92de6f231c67bab))
* **import-product:** queue variation stock import preseting product id ([9cb4f65](https://github.com/ecomplus/application-starter/commit/9cb4f65bae7dccda6b0628bb02907e5310ada5b3)), closes [#6](https://github.com/ecomplus/application-starter/issues/6)

### [1.1.2](https://github.com/ecomplus/application-starter/compare/v1.1.1...v1.1.2) (2020-10-21)


### Bug Fixes

* **import-product:** read variations from full tiny product (not from search result) ([969f3b9](https://github.com/ecomplus/application-starter/commit/969f3b9bb6ceb906b3d592aa807fad69498fc056))

### [1.1.1](https://github.com/ecomplus/application-starter/compare/v1.1.0...v1.1.1) (2020-10-21)


### Bug Fixes

* **export-order:** validate custom fields from tiny order data object ([f77df14](https://github.com/ecomplus/application-starter/commit/f77df1466413d8da36ffbdffbac1c3532da7db58))

## [1.1.0](https://github.com/ecomplus/application-starter/compare/v1.0.1...v1.1.0) (2020-10-21)


### Features

* **admin-settings:** mock some more tiny order config options ([758ba35](https://github.com/ecomplus/application-starter/commit/758ba35d5bbeddec81e33d77a489888e69e78fc9))


### Bug Fixes

* **import-product:** queue variation stock update after new product (with variations) import ([08c10be](https://github.com/ecomplus/application-starter/commit/08c10beb93f5df612a737318f36711536cb37838))
* **webhook:** parse queue name to lower case to check on handlers ([682ddc8](https://github.com/ecomplus/application-starter/commit/682ddc85b66b03b32ead237b6a5a1200032678db))

### [1.0.1](https://github.com/ecomplus/application-starter/compare/v1.0.0...v1.0.1) (2020-10-20)


### Bug Fixes

* **auth-scope:** request auth to PATCH orders and products ([b0bee9b](https://github.com/ecomplus/application-starter/commit/b0bee9b3b35f7664c5f63d217fcd46b7c7444dac))
* **export-product:** pass only 'short_description' to tiny product ([dbe8798](https://github.com/ecomplus/application-starter/commit/dbe879833317b836ca32e3a452e1c616fa01913d))
* **import-order:** catch invoice read request errror ([64b9024](https://github.com/ecomplus/application-starter/commit/64b90241cb65c3eae6e2d9a089eeea3bbae7f87e))
* **import-order:** must set partial order 'shipping_lines' when object changes ([9583040](https://github.com/ecomplus/application-starter/commit/958304032c71d0e4c9a07724cd1f6428c7a88f98))
* **import-order:** passing tiny instance to order parser (read invoice) ([b6d7521](https://github.com/ecomplus/application-starter/commit/b6d75214126ec1aeef4c07977b037b58394be9f5))
* **import-order:** skip getting invoice if id not gt 0 ([3308bba](https://github.com/ecomplus/application-starter/commit/3308bbaa74c3a73097c19f090dd1d1b632fb3f83))
* **import-orders:** fix integration handler return ([825e82e](https://github.com/ecomplus/application-starter/commit/825e82e6111f8822914ea83905905b67a32846c2))
* **import-product:** check hidden queue to skip new product import ([44b71fa](https://github.com/ecomplus/application-starter/commit/44b71fa9928ea737cb9dbd1aa1702ab5ac7e51eb))
* **import-product:** fix parsing tiny product variations ([5aafcce](https://github.com/ecomplus/application-starter/commit/5aafcce6f959f4837b59d50c340ce616db964785))
* **import-product:** fix setting variation price (parse float) ([105ac12](https://github.com/ecomplus/application-starter/commit/105ac12f22ba15f79a937dd019f2266a51be2c52))
* **import-product:** prevent erro with SKU not found ([ad52175](https://github.com/ecomplus/application-starter/commit/ad521750166905ee87a881a9210f4381415803b1))
* **import-product:** validate gtin from tiny product source ([de432fe](https://github.com/ecomplus/application-starter/commit/de432fee1d891329539aa0487ac2239d482ab7fb))
* **import-products:** continue with !payload.product (new product) ([177fe73](https://github.com/ecomplus/application-starter/commit/177fe738a2b09268841af16d62b0cabfe86fdd2c))
* **import-products:** select up to 10 stock update docs to delete old ones ([7db8703](https://github.com/ecomplus/application-starter/commit/7db87037ca11a0397e068f3c3ae2a37dfc65f990))

## 1.0.0 (2020-10-20)


### Features

* **auth-callback:** add application "self" data trigger ([814df87](https://github.com/ecomplus/application-starter/commit/814df87b23dd791e5884e220664025a07fc0afc8))
* **ecom-config:** set app title, auth scope, admin settings and procedures ([91ddc6a](https://github.com/ecomplus/application-starter/commit/91ddc6ac79e5be1e96e6e9a29223ddf8226d4f0b))
* **export-order:** parsing ecom financial/fulfillment status to tiny ([8647880](https://github.com/ecomplus/application-starter/commit/864788029e9ed7a5f27608970e3a09d7ab78b98a))
* **export-orders:** handling order status update ([de014a4](https://github.com/ecomplus/application-starter/commit/de014a46ecd15604e41e29a1860b00f196ed4059))
* **export-orders:** parsing and exporting new orders to tiny ([0d3e41c](https://github.com/ecomplus/application-starter/commit/0d3e41cceec6908a45eb0532a099b8202103d846))
* **export-product:** handling product parse and export to tiny ([5bddae7](https://github.com/ecomplus/application-starter/commit/5bddae7bd06694acc815ebfc357ac7613306da7a))
* **import-order:** handling import for order status, tracking and invoices ([0cd56b1](https://github.com/ecomplus/application-starter/commit/0cd56b1687463290e2f8cd07c134fc56434a93eb))
* **import-product:** handling product importation or stock quantity updates ([39ca05c](https://github.com/ecomplus/application-starter/commit/39ca05cca0debfd62057efa7294f99276fa27087))
* **sync-from-tiny:** active sync one product when stock queue is empty ([4f9b13f](https://github.com/ecomplus/application-starter/commit/4f9b13f1132972308be67217f37162773a9f8057))
* **sync-from-tiny:** scheduled function to update status reading tiny queue ([2720abe](https://github.com/ecomplus/application-starter/commit/2720abe37591172d6dc106701873f0afcaac1115))
* **tiny-client:** abstracting response data handling ([0945b2b](https://github.com/ecomplus/application-starter/commit/0945b2b05c415ac50e591afb0a40dde34a6cbd82))
* **tiny-client:** constructor with axios request abstraction ([176a54f](https://github.com/ecomplus/application-starter/commit/176a54f8d43c9b2ea197af7a3b25185f50b81bcc))
* **update-app-data:** lib abstraction to update app data on store api ([6501c76](https://github.com/ecomplus/application-starter/commit/6501c768609bb4556d71a1f976570b28530862f4))
* **webhook:** setup webhook endpoint and integration handlers ([e72af52](https://github.com/ecomplus/application-starter/commit/e72af52c47ffe9eea83a17188f1cc355ba21b555))


### Bug Fixes

* **deps:** add @google-cloud/firestore to direct deps ([4eedd81](https://github.com/ecomplus/application-starter/commit/4eedd81af864faa0586c3a1a0ac51ead8f8c3658))
* **deps:** add form-data to direct pkg dependencies ([51ed98f](https://github.com/ecomplus/application-starter/commit/51ed98f74873d5d90272d621ae9ba4d303406fb2))
* **deps:** dedupe ([541f0ce](https://github.com/ecomplus/application-starter/commit/541f0ce56bb76be72d3b61b832c305ad8af56b3a))
* **deps:** remove qs, add xml-js ([efbc084](https://github.com/ecomplus/application-starter/commit/efbc084d4ffa310df5733eaa723855df481c8bbc))
* **ecom-config:** fix admin settings queues and procedure triggers for erp flux ([0f9aca0](https://github.com/ecomplus/application-starter/commit/0f9aca09ed38d345aa6ee9897b5bd4bb62ea178c))
* **export:** fix setting up tiny request params ([4c82ed2](https://github.com/ecomplus/application-starter/commit/4c82ed2e0ce2b18f1f94506a7d046ec3e2a3d573))
* **export-order:** fix passing app data to order parser ([cbac364](https://github.com/ecomplus/application-starter/commit/cbac364685f7499c93c88b694bc038ec8fd5f659))
* **export-order:** fix rechecking order number match on tiny api response ([e8cf595](https://github.com/ecomplus/application-starter/commit/e8cf595ad4d922ed47b65ed3fb5c4708494ee2ef))
* **export-order:** fix setting order id to update status ([6c7df14](https://github.com/ecomplus/application-starter/commit/6c7df1434de34013f7039cb9fd6ed2a9fb6452f3))
* **export-order:** get order with authentication ([fee4cdd](https://github.com/ecomplus/application-starter/commit/fee4cdd602e1b944b8eabfdf9879af4abb9f65d6))
* **export-order:** setting tiny order status ([5809ada](https://github.com/ecomplus/application-starter/commit/5809ada393ea1817f859a3760b7f47b869b093c1))
* **export-product:** fix checking if product is already registered by sku (codigo) ([40d08cc](https://github.com/ecomplus/application-starter/commit/40d08ccbb901691a586960f57b40d6e4969a97d6))
* **exports:** fix handling empty search request to tiny api ([7e1640e](https://github.com/ecomplus/application-starter/commit/7e1640ed128b596b15c547eac41cd3dd1bbac54c))
* **exports:** fix handling search results from tiny api ([3286374](https://github.com/ecomplus/application-starter/commit/32863747a9221eaa351bf8ed60c72f016ec4ad0e))
* **import-product:** fix handling tiny api search result ([240ac98](https://github.com/ecomplus/application-starter/commit/240ac9803b3b09dc7174d0d92fbe460b5e2dc530))
* **import-product:** properly set product._id ([5abf9c0](https://github.com/ecomplus/application-starter/commit/5abf9c0c9a65d9724b65146864ccb3452f580bf3))
* **import-products:** delete tiny stock updates tmp docs ([3b7855f](https://github.com/ecomplus/application-starter/commit/3b7855f14e4cae4dc81c54899384470a907737c3))
* **import-products:** fix handling import variations ([9ee78a3](https://github.com/ecomplus/application-starter/commit/9ee78a317e5239fc49c1145e50113e9f8b976b18))
* **import-products:** fix handling import variations ([06907ba](https://github.com/ecomplus/application-starter/commit/06907bacff4e5a63d7e3fa7369674e60656f0fc6))
* **import-products:** fix handling import variations ([7a07da4](https://github.com/ecomplus/application-starter/commit/7a07da4c9dcdd157f0f69653ef1171726a5e9e9b))
* **parse-order:** prevent substring from number or undefined ([70093cb](https://github.com/ecomplus/application-starter/commit/70093cbbefad53bf02edde2a769871bac2bd1a0a))
* **parse-order:** stop using locale to parse date ([952ab67](https://github.com/ecomplus/application-starter/commit/952ab677696ab352fbd6561228861eb13549dc39))
* **product-parse:** fix parsing ecomplus <-> tiny description ([cd6b5cd](https://github.com/ecomplus/application-starter/commit/cd6b5cd3235054fec5f986f3518d1b2d0120244f))
* **sync-from-tiny:** fix handling search results from tiny api ([269bce4](https://github.com/ecomplus/application-starter/commit/269bce44b9058ab91f67df87d0c2766421c03ab7))
* **sync-from-tiny:** fix mocking tiny stock list after active sync ([fbcfa77](https://github.com/ecomplus/application-starter/commit/fbcfa7713599ad6f792b618e82e60563f8f9c9bf))
* **sync-from-tiny:** prevent destructing undefined on promise handler ([3dc01d6](https://github.com/ecomplus/application-starter/commit/3dc01d65d88aa6ff5e4955ddf940f7855eb50d26))
* **tiny-client:** fix mocking axios error after tiny error response ([5ab6321](https://github.com/ecomplus/application-starter/commit/5ab6321ca37eb668843971918eed946c17dd90b7))
* **tiny-client:** parse some error codes to http status code ([82d451b](https://github.com/ecomplus/application-starter/commit/82d451b17a050b7806bf061943d20ab0faf63cb1))
* **tiny-client:** parse tiny error code to integer ([d8b4d03](https://github.com/ecomplus/application-starter/commit/d8b4d03bbe2928b158da1f9abe373ac8dd33ed57))
* **tiny-client:** parsing data fields to xml ([661f221](https://github.com/ecomplus/application-starter/commit/661f22117f107d23fd3c4acc7527ff694b8fdb50))

## [1.0.0-starter.15](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.14...v1.0.0-starter.15) (2020-07-26)


### Bug Fixes

* **deps:** bump @ecomplus/application-sdk@firestore ([fe4fe46](https://github.com/ecomplus/application-starter/commit/fe4fe46c2c4e1dfd21790f8c03a84245cb8fc8f3))
* **deps:** update all non-major dependencies ([#36](https://github.com/ecomplus/application-starter/issues/36)) ([b14f2e9](https://github.com/ecomplus/application-starter/commit/b14f2e9cb56d5b18500b678b074dbdbe099b041a))
* **deps:** update dependency firebase-admin to v9 ([#37](https://github.com/ecomplus/application-starter/issues/37)) ([204df95](https://github.com/ecomplus/application-starter/commit/204df95c37d24c455951081f9186178222097778))

## [1.0.0-starter.14](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.13...v1.0.0-starter.14) (2020-06-30)


### Bug Fixes

* **auth-callback:** check `row.setted_up` in place of 'settep_up' ([e2a73ca](https://github.com/ecomplus/application-starter/commit/e2a73ca029868d9c899d4a1c0d982f1c1ed5829f))
* **deps:** update all non-major dependencies ([#31](https://github.com/ecomplus/application-starter/issues/31)) ([702bee9](https://github.com/ecomplus/application-starter/commit/702bee9a31370579dd7718b5722180e5bb8996e8))
* **deps:** update dependency firebase-functions to ^3.7.0 ([#30](https://github.com/ecomplus/application-starter/issues/30)) ([0f459a3](https://github.com/ecomplus/application-starter/commit/0f459a3ab9fe21f8dc9e9bdfce33c0b6d43e3622))
* **deps:** update dependency firebase-tools to ^8.4.2 ([#29](https://github.com/ecomplus/application-starter/issues/29)) ([cf7e61e](https://github.com/ecomplus/application-starter/commit/cf7e61ef50aa976f33725d855ba19d06a7522fd4))
* **pkg:** update deps, start using node 10 ([172ed7f](https://github.com/ecomplus/application-starter/commit/172ed7f223cd23b9874c5d6209928b7d620b0cf6))

## [1.0.0-starter.13](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.12...v1.0.0-starter.13) (2020-06-03)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.13.0 ([b424410](https://github.com/ecomplus/application-starter/commit/b42441089e7020774c9586ed176e691ef4c755be))
* **refresh-tokens:** force appSdk update tokens task ([139a350](https://github.com/ecomplus/application-starter/commit/139a350c230fa36c37ab83e2debfe979d831cb08))

## [1.0.0-starter.12](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.11...v1.0.0-starter.12) (2020-05-29)


### Bug Fixes

* **deps:** replace @ecomplus/application-sdk to firestore version ([3d2ee85](https://github.com/ecomplus/application-starter/commit/3d2ee85feb2edab77950e5c266514152fbc9674d))
* **deps:** update all non-major dependencies ([#21](https://github.com/ecomplus/application-starter/issues/21)) ([7a370da](https://github.com/ecomplus/application-starter/commit/7a370da11dfd098c0a90da05d39fc62f9264fd63))
* **deps:** update all non-major dependencies ([#26](https://github.com/ecomplus/application-starter/issues/26)) ([e37e0e8](https://github.com/ecomplus/application-starter/commit/e37e0e8151768d79e81f4184ab937ddf9d775a4f))
* **deps:** update dependency uglify-js to ^3.9.2 ([#20](https://github.com/ecomplus/application-starter/issues/20)) ([adccf0a](https://github.com/ecomplus/application-starter/commit/adccf0a2fed37f2ccce57ded20d25af85407ac8a))

## [1.0.0-starter.11](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.10...v1.0.0-starter.11) (2020-04-27)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.11.13 ([70584c2](https://github.com/ecomplus/application-starter/commit/70584c245e97a1b539a3df3f74109f20d9a1fa3c))
* **setup:** ensure enable token updates by default ([67aea0e](https://github.com/ecomplus/application-starter/commit/67aea0eb363be3cc535a0f0f4d1b5b682958f243))

## [1.0.0-starter.10](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.9...v1.0.0-starter.10) (2020-04-27)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.11.11 ([b8217d0](https://github.com/ecomplus/application-starter/commit/b8217d03fe92b5c233615a0b6b4c01d7bad676c2))
* **deps:** update all non-major dependencies ([#19](https://github.com/ecomplus/application-starter/issues/19)) ([a99797a](https://github.com/ecomplus/application-starter/commit/a99797a129d6e2383ef5ef69c06afacd13cccfb0))
* **setup:** do not disable updates on refresh-tokens route ([b983a45](https://github.com/ecomplus/application-starter/commit/b983a45ada5575ee6435f7b3016ef35c28355762))

## [1.0.0-starter.9](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.8...v1.0.0-starter.9) (2020-04-21)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.11.10 ([8da579c](https://github.com/ecomplus/application-starter/commit/8da579c19c6530e8cc9fd338a07aece1fccc64ff))

## [1.0.0-starter.8](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.7...v1.0.0-starter.8) (2020-04-18)


### Bug Fixes

* **deps:** update all non-major dependencies ([#17](https://github.com/ecomplus/application-starter/issues/17)) ([785064e](https://github.com/ecomplus/application-starter/commit/785064ef5bf06db7c084f9b17b37a6077645735b))

## [1.0.0-starter.7](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.6...v1.0.0-starter.7) (2020-04-07)

## [1.0.0-starter.6](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.5...v1.0.0-starter.6) (2020-04-06)


### Bug Fixes

* **deps:** update all non-major dependencies ([#10](https://github.com/ecomplus/application-starter/issues/10)) ([b3c65e5](https://github.com/ecomplus/application-starter/commit/b3c65e5c7eb89a4825eb47c852ce65293d172314))
* **deps:** update all non-major dependencies ([#13](https://github.com/ecomplus/application-starter/issues/13)) ([33ff19b](https://github.com/ecomplus/application-starter/commit/33ff19bbdad1f34b6d1c255089dc0a0e4092b955))
* **deps:** update all non-major dependencies ([#8](https://github.com/ecomplus/application-starter/issues/8)) ([feba5b9](https://github.com/ecomplus/application-starter/commit/feba5b9cdc54e8304beff2b12658a6343ef37569))
* **deps:** update dependency firebase-functions to ^3.6.0 ([#15](https://github.com/ecomplus/application-starter/issues/15)) ([5f7f0a2](https://github.com/ecomplus/application-starter/commit/5f7f0a2bf5c744000996e2a0b78690b363462ee7))
* **deps:** update dependency firebase-tools to ^7.16.1 ([#14](https://github.com/ecomplus/application-starter/issues/14)) ([b8e4798](https://github.com/ecomplus/application-starter/commit/b8e479851bd02bf5929a7df8a71a761f1c1c1654))
* **deps:** update dependency firebase-tools to v8 ([#16](https://github.com/ecomplus/application-starter/issues/16)) ([b72560e](https://github.com/ecomplus/application-starter/commit/b72560e4fc86496499d553e47094ace25436272b))
* **ecom-modules:** fix parsing mod names to filenames and vice versa ([99c185a](https://github.com/ecomplus/application-starter/commit/99c185afebeae77deb61537ed9de1c77132c16ce))

## [1.0.0-starter.5](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.4...v1.0.0-starter.5) (2020-03-05)


### Features

* **market-publication:** handle full featured app publication to Market ([28379dc](https://github.com/ecomplus/application-starter/commit/28379dc3c4784e757c8f25e5d737f6143682b0db))
* **static:** handle static with server app files from public folder ([827d000](https://github.com/ecomplus/application-starter/commit/827d00079b0dc169b2eef31b8e0ac73c596307a8))

## [1.0.0-starter.4](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.3...v1.0.0-starter.4) (2020-02-21)


### Features

* **calculate-shipping:** basic setup for calculate shipping module ([db77595](https://github.com/ecomplus/application-starter/commit/db7759514bb25d151dd4508fb96b84c52b3e94ba))


### Bug Fixes

* **home:** fix replace accets regex exps to generate slug from title ([198cc0b](https://github.com/ecomplus/application-starter/commit/198cc0b911d4874d96f3cd5254d30cab5fe89765))
* **home:** gen slug from pkg name or app title if not set or default ([25c20bf](https://github.com/ecomplus/application-starter/commit/25c20bfade65a86e4f4b1026ef59a5694a022a74))

## [1.0.0-starter.3](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.2...v1.0.0-starter.3) (2020-02-21)

## [1.0.0-starter.2](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.1...v1.0.0-starter.2) (2020-02-21)


### Bug Fixes

* **config:** stop reading app from functions config ([7b9aab7](https://github.com/ecomplus/application-starter/commit/7b9aab727fefe8a5b84695e90a0d68e02b8c3f62))

## [1.0.0-starter.1](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.0...v1.0.0-starter.1) (2020-02-20)


### Features

* **get-auth:** endpoint to return auth id and token for external usage ([40a8ae2](https://github.com/ecomplus/application-starter/commit/40a8ae2e895d6e32c7032ca500040ec82c80dc5d))
* **server:** also supporting passing Store Id from query ([111f3a7](https://github.com/ecomplus/application-starter/commit/111f3a716fbfd2e155e3fb24242bddcae7cb065c))


### Bug Fixes

* **server:** remove 'routes' path when setting filename for routes ([119524c](https://github.com/ecomplus/application-starter/commit/119524c523a11364ed912769637a6f8e479af5f1))

## [1.0.0-starter.0](https://github.com/ecomplus/application-starter/compare/v0.1.1...v1.0.0-starter.0) (2020-02-18)


### Features

* **router:** recursive read routes dir to auto setup server routes ([ff2b456](https://github.com/ecomplus/application-starter/commit/ff2b45604723a8146c9481ea36a9400da5ccc2bc))


### Bug Fixes

* **home:** fix semver on for app.version (remove version tag if any) ([ad36461](https://github.com/ecomplus/application-starter/commit/ad364614a7f5599850ad39e00a94d310742e8f80))
* **middlewares:** update route files exports (named exports by methods) ([6a22e67](https://github.com/ecomplus/application-starter/commit/6a22e67135bc6110e6da6b4ab25f67ad8d77f597))

### [0.1.1](https://github.com/ecomplus/application-starter/compare/v0.1.0...v0.1.1) (2020-02-18)


### Features

* **env:** get 'pkg' from functions config ([bf45ec3](https://github.com/ecomplus/application-starter/commit/bf45ec33a2147d5be91fdc4955bd6cfa1b0867e2))
* **home:** set version and slug from root package, fix with uris ([d4b61fa](https://github.com/ecomplus/application-starter/commit/d4b61fab427aefdb2ac485d90eb1abe15d6aafc6))


### Bug Fixes

* **env:** firebase doesnt uppercase config ([502185e](https://github.com/ecomplus/application-starter/commit/502185ed30f346d8db77b849d6ba0eb48cb777cb))
* **require:** update @ecomplus/application-sdk dependency name ([d4174ac](https://github.com/ecomplus/application-starter/commit/d4174ac5425b85590db0e92d4b1d69a8567a6c55))

## [0.1.0](https://github.com/ecomplus/application-starter/compare/v0.0.4...v0.1.0) (2020-02-17)

### [0.0.4](https://github.com/ecomclub/firebase-app-boilerplate/compare/v0.0.3...v0.0.4) (2020-02-16)


### Bug Fixes

* **server:** update routes names (refresh-tokens) ([79a2910](https://github.com/ecomclub/firebase-app-boilerplate/commit/79a2910817cf4193b40e02b2b1e6b920e7fefb2d))

### [0.0.3](https://github.com/ecomclub/express-app-boilerplate/compare/v0.0.2...v0.0.3) (2020-02-15)


### Features

* **server:** start reading env options, handle operator token ([ce107b7](https://github.com/ecomclub/express-app-boilerplate/commit/ce107b74cde375e875a85cc3ba0cc6a73740785d))
* **update-tokens:** adding route to start update tokens service (no content) ([20c62ec](https://github.com/ecomclub/express-app-boilerplate/commit/20c62ec6800fc326b89e8cf54b2916f56e5910e4))


### Bug Fixes

* **auth-callback:** fix handling docRef (desn't need to get by id again) ([629ca5a](https://github.com/ecomclub/express-app-boilerplate/commit/629ca5ab9849e3822cc190f423da5bf2e0c4daab))
* **auth-callback:** save procedures if not new, check and set 'settep_up' ([#3](https://github.com/ecomclub/express-app-boilerplate/issues/3)) ([4a01f86](https://github.com/ecomclub/express-app-boilerplate/commit/4a01f86c37e09cd7c0363f6fbc80de6eeef3ba20))
* **ECOM_AUTH_UPDATE_INTERVAL:** disable set interval (no daemons on cloud functions) ([2aa2442](https://github.com/ecomclub/express-app-boilerplate/commit/2aa2442061f0308be9eb9430552fa04ad148788c))
* **env:** fixed to get appInfor variable ([e9b1a3c](https://github.com/ecomclub/express-app-boilerplate/commit/e9b1a3ce0d17ee74a5eada70589340fd5a70e786))
* **env:** fixed to get appInfor variable ([22687e2](https://github.com/ecomclub/express-app-boilerplate/commit/22687e25f611d49f8c01494af114e0289cec251e))
* **middleware:** check standard http headers for client ip ([5045113](https://github.com/ecomclub/express-app-boilerplate/commit/504511329afe9277d540f0f542a316d04634ce9e))

### 0.0.2 (2020-02-11)


### Bug Fixes

* **lib:** remove unecessary/incorrect requires with new deps ([69f2b77](https://github.com/ecomclub/express-app-boilerplate/commit/69f2b77))
* **routes:** fix handling appSdk (param) ([0cf2dde](https://github.com/ecomclub/express-app-boilerplate/commit/0cf2dde))
* **setup:** added initializeApp() to firebase admin ([e941e59](https://github.com/ecomclub/express-app-boilerplate/commit/e941e59))
* **setup:** manually setup ecomplus-app-sdk with firestore ([64e49f8](https://github.com/ecomclub/express-app-boilerplate/commit/64e49f8))
* **setup:** manually setup ecomplus-app-sdk with firestore ([c718bd0](https://github.com/ecomclub/express-app-boilerplate/commit/c718bd0))
* **setup:** manually setup ecomplus-app-sdk with firestore ([33909bf](https://github.com/ecomclub/express-app-boilerplate/commit/33909bf)), closes [/github.com/ecomclub/ecomplus-app-sdk/blob/master/main.js#L45](https://github.com/ecomclub//github.com/ecomclub/ecomplus-app-sdk/blob/master/main.js/issues/L45)
* **startup:** setup routes after appSdk ready, add home route ([d182555](https://github.com/ecomclub/express-app-boilerplate/commit/d182555))


### Features

* **firestore-app-boilerplate:** Initial commit ([c9963f0](https://github.com/ecomclub/express-app-boilerplate/commit/c9963f0))
* **firestore-app-boilerplate:** Initial commit ([be493ea](https://github.com/ecomclub/express-app-boilerplate/commit/be493ea))
* **firestore-support:** minor changes ([3718cba](https://github.com/ecomclub/express-app-boilerplate/commit/3718cba))
* **firestore-support:** refactoring to  use saveProcedures function ([62971ef](https://github.com/ecomclub/express-app-boilerplate/commit/62971ef))
* **firestore-support:** removed sqlite error clausule ([2d47996](https://github.com/ecomclub/express-app-boilerplate/commit/2d47996))
* **routes:** add home route (app json) ([42a3f2b](https://github.com/ecomclub/express-app-boilerplate/commit/42a3f2b))

# [LEGACY] Express App Boilerplate

### [0.1.1](https://github.com/ecomclub/express-app-boilerplate/compare/v0.1.0...v0.1.1) (2019-07-31)


### Bug Fixes

* **procedures:** fix checking for procedures array to run configureSetup ([1371cdc](https://github.com/ecomclub/express-app-boilerplate/commit/1371cdc))

## [0.1.0](https://github.com/ecomclub/express-app-boilerplate/compare/v0.0.2...v0.1.0) (2019-07-31)

### 0.0.2 (2019-07-31)


### Bug Fixes

* chain promise catch on lib getConfig ([281abf9](https://github.com/ecomclub/express-app-boilerplate/commit/281abf9))
* fix mergin hidden data to config ([8b64d58](https://github.com/ecomclub/express-app-boilerplate/commit/8b64d58))
* fix path to require 'get-config' from lib ([11425b0](https://github.com/ecomclub/express-app-boilerplate/commit/11425b0))
* get storeId from header and set on req object ([a3bebaa](https://github.com/ecomclub/express-app-boilerplate/commit/a3bebaa))
* handle error on get config instead of directly debug ([f182589](https://github.com/ecomclub/express-app-boilerplate/commit/f182589))
* routes common fixes ([2758a57](https://github.com/ecomclub/express-app-boilerplate/commit/2758a57))
* using req.url (from http module) instead of req.baseUrl ([d9057ca](https://github.com/ecomclub/express-app-boilerplate/commit/d9057ca))


### Features

* authentication callback ([8f18892](https://github.com/ecomclub/express-app-boilerplate/commit/8f18892))
* conventional store api error handling ([bcde87e](https://github.com/ecomclub/express-app-boilerplate/commit/bcde87e))
* function to get app config from data and hidden data ([ba470f5](https://github.com/ecomclub/express-app-boilerplate/commit/ba470f5))
* getting store id from web.js ([72f18c6](https://github.com/ecomclub/express-app-boilerplate/commit/72f18c6))
* handling E-Com Plus webhooks ([63ba19f](https://github.com/ecomclub/express-app-boilerplate/commit/63ba19f))
* main js file including bin web and local ([6b8a71a](https://github.com/ecomclub/express-app-boilerplate/commit/6b8a71a))
* pre-validate body for ecom modules endpoints ([f06bdb0](https://github.com/ecomclub/express-app-boilerplate/commit/f06bdb0))
* setup app package dependencies and main.js ([b2826ed](https://github.com/ecomclub/express-app-boilerplate/commit/b2826ed))
* setup base app.json ([015599a](https://github.com/ecomclub/express-app-boilerplate/commit/015599a))
* setup daemon processes, configure store setup ([db3ca8c](https://github.com/ecomclub/express-app-boilerplate/commit/db3ca8c))
* setup procedures object ([c5e8627](https://github.com/ecomclub/express-app-boilerplate/commit/c5e8627))
* setup web app with express ([d128430](https://github.com/ecomclub/express-app-boilerplate/commit/d128430))
