# Tiny ERP

Integração para gestão de estoque, pedidos e logística via [Tiny](https://tiny.com.br/):

- Exportação de produtos automática ou manual da E-Com Plus para o Tiny ERP;
- Importação de produtos do Tiny para a E-Com Plus;
- Atualização automática de estoque do Tiny para a E-Com Plus por SKU;
- Atualização automática de preços da E-Com Plus para o Tiny por SKU;
- Exportação de pedidos automática ou manual da E-Com Plus para o Tiny;
- Atualização automática de status de pedidos exportados;
- Importação de status de pedido pelo número, código de rastreamento e NF;

<div class="alert alert-info">
  Crie sua conta Tiny com o <a href="https://www.tiny.com.br/inscricao?parceiro=EcomClub">link</a> ou com <b>cupom <code>EcomClub</code></b> para ganhar <b>30 dias grátis + 3 meses com 50% OFF em qualquer plano Tiny</b>
</div>

___

## Tiny ERP, gestão para lojas virtuais e ecommerce

Com apoio do **Tiny Erp** melhoramos a integração deixando ela mais robusta para sua operação e otimizando ainda mais as rotinas da sua empresa.

## Instalação na loja de aplicativos

Realize o login em seu painel administrativo em https://app.e-com.plus. Você será direcionado para a página inicial:

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/instalar.png)

Na imagem acima, está destacado duas ações a primeira é salvar o **Store ID** da sua loja para configuração posterior no **Tiny**, no caso é **1011** e clicar no ícone conforme a figura abaixo:

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/aplicativo.png)

Desça até o aplicativo da **Tiny ERP**, conforme pode ser visualizado:

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/app_tiny.png)

Confirme e depois em clique em **Instalar**:

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/app_tiny2.png)

Após alguns segundos o seu app será instalado!

Feito isso, precisamos realizar algumas configurações no **Tiny**.

## Configuração no Tiny ERP

Acesse o site https://tiny.com.br/ acesse ou crie sua conta para realizar o primeiro acesso (use o cupom **EcomClub**30 dias grátis + 3 meses com 50% OFF em qualquer plano Tiny).

Em seguida, você será redirecionado para a página **Inicial** do painel no **Tiny**.

### Configurando Extensões 

Clique em **Extensões do Tiny**, conforme imagem:

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/extensoes.png)
 

Certifique-se que está instalado:

- **API para estoque em tempo real**
- **Controle de Estoques**

Conforme imagem:

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/confirmacao.png) 

Segundo passo é a criação da sua loja dentro do painel do Tiny para realizar demais configurações.

### Integrar Loja Virtual com Tiny ERP

Acesse o menu lateral e clique em Configurações:

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/configuracao.png) 

Depois em **e-commerce** > **Integrações**:

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/integracao.png) 

Clique em **Incluir integração**:

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/integracao2.png) 

Escolha **E-Com Plus** e clique em **Salvar**, conforme:

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/salvar.png) 

Feito isso, clique na **Integração criada**, de acordo com a imagem:

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/criada.png) 

Clique em **Ver credenciais de acesso**

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/credenciais_acesso.png) 

Abrirá uma modal com duas informações:

- **Identificador do integrador**
- **Token** 

Que deverão **ser copiadas e salvas em um bloco de notas**, pois elas serão importantíssimas para ativação da integração no painel administrativo da **E-Com Plus**

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/credencial.png) 

Feche a janela e clique na aba **Notificações**. Aparecerá alguns campos para serem preenchidos:

- **URL de notificações do estoque**
- **URL para envio de produtos**
- **URL para envio de alteração na situação de pedidos**

Em cada um dos campos, você deve preencher com a seguinte **URL**:

https://us-central1-ecom-tiny.cloudfunctions.net/app/tiny/webhook?token=**VALOR-EQUIVALENTE-AO-TOKEN**&store_id=**ID-DA-LOJA-NA-PLATAFORMA**, na loja em questão o token: **0000000000000000000000000000000000000000** e store_id: 1011, então a URL final é:

https://us-central1-ecom-tiny.cloudfunctions.net/app/tiny/webhook?token=**0000000000000000000000000000000000000000**&store_id=**1011**

O **store ID** foi o dado que salvou no início desse tutorial.

Finalizamos o processo no **Tiny** ! Vamos finalizá-lo na E-Com Plus.

## Configuração Tiny ERP no painel E-Com Plus

Acesse o aplicativo instalado pelo [link](https://app.e-com.plus/#/apps/edit/105922).

Clique na aba **Configuração**, conforme imagem abaixo:

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/config_ecom.png) 

Você lembra que salvou  **Identificador do integrador** e **Token**? Então, precisará deles aqui, primeiramente cole o token no espaço indicado na aba Geral, conforme imagem abaixo:

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/chave.png) 


Desça até a aba **Configuração de novos pedidos**:

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/novo_pedido.png) 


Insira o **Identificador do integrador**, conforme na imagem acima e clique em **Salvar**.
Pronto, finalizou a integração entre E-Com Plus e Tiny, vamos para o último passo que são configurações do app.

## Configurações do aplicativo

Na aba **Geral**, temos as seguintes opções:

**Exportar novos pedidos**: Se deixar selecionado, todos os novos pedidos entrarão no Tiny ERP automaticamente. 

**Exportar novos produtos**: Se selecionar, todos os novos produtos serão enviados ao Tiny automaticamente.

**Importar estoques**: Se selecionado, atualiza estoques na plataforma.

**Sobrescrever produtos**: Se selecionado, atualiza o cadastro (não apenas estoque) de produtos importados já existentes na plataforma.

**Exportar preços**: Se selecionado, atualiza preços no Tiny automaticamente

Na aba **Exportação manual**, pode ser enviado **produtos e pedidos manualmente** pelos seus respectivos IDs, conforme imagem:

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/exportar_manual.png) 


Na aba **Importação manual**, pode ser importado do Tiny **produtos** para serem criados na plataforma e **pedidos** para atualizar situação dos mesmos, de forma manual.

Para importar produtos, basta inserir o **Código(SKU)** configurado no Tiny e para pedido é o **número do pedido da plataforma**, conforme imagem:

![exemplo](https://us-central1-ecom-tiny.cloudfunctions.net/app/img/importar_manual.png) 


Em **Configuração para novos pedidos no Tiny**:

Além do ID do integrador, tem os seguintes campos:

**ID do vendedor cadastrado no Tiny**: Se quiser cadastrar a plataforma como um vendedor, basta colocar o ID criado no Tiny.

**Nome do vendedor**: E o respectivo responsável por essa venda.

**Fixar valor do frete**: Por padrão será enviado o frete original de cada pedido, mas existem lojas que não emitem nota fiscal sobre o valor do pedido total, apenas sobre o valor dos produtos, desconsiderando o frete, logo, coloca-se essa configuração como **0**.

**Frete por conta**: Por conta de quem será o frete "R"-Remetente, "D"-Destinatário

**Fixar valor do desconto**: Caso queira fixar um valor, se ficar vazio, por padrão será enviado o desconto original de cada pedido.

Caso precise enviar alguma configuração a mais dentro do pedido que seja única para todos os pedidos que entrar no Tiny, nos informe que fazemos como um **feixe de luz** para você.