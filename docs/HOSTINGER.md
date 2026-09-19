# Publicar na Hostinger

Documentação consultada em 17/09/2026:
- https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/
- https://www.hostinger.com/support/how-to-select-the-node-js-version-for-your-application/

## Pelo GitHub / Apps

1. Envie o conteúdo desta pasta para a raiz do repositório.
2. No hPanel, adicione uma aplicação web e escolha a importação do GitHub.
3. Selecione o repositório e a branch que deseja publicar.
4. Confira as configurações abaixo e inicie o deploy.

| Campo | Valor |
| --- | --- |
| Diretório raiz do projeto | `.` (ou vazio, conforme o painel) |
| Framework | React, se detectado; caso contrário, `Other` |
| Versão Node.js | `24.x` |
| Instalação | `npm ci` |
| Build | `npm run build` |
| Diretório de saída | `dist` |
| Arquivo de entrada, se solicitado para execução Node | `server.mjs` |
| Comando de início, se solicitado | `npm start` |

O frontend pode ser servido estaticamente a partir de `dist`. Se o fluxo escolhido executar um servidor Node, `server.mjs` escuta em `0.0.0.0` e respeita `process.env.PORT`; se não houver `PORT`, utiliza 3000. Não configure a porta local 5174 nem use `npm run dev` como comando de produção.

A instalação precisa incluir as dependências de desenvolvimento na etapa de build (Rolldown e TypeScript). Não use `npm ci --omit=dev` antes de compilar. Depois de gerado o build, o servidor usa somente APIs nativas do Node.

O aplicativo não exige banco de dados, chaves de API ou arquivo `.env`. O `.env.example` é apenas referência; o servidor lê as variáveis configuradas no ambiente da hospedagem e não carrega arquivos `.env` automaticamente.

## Alternativa: upload do ZIP de código

O ZIP entregue contém o código do projeto com `package.json` na raiz. Pode ser usado no fluxo de upload de aplicação da Hostinger, com as mesmas configurações de build.

## Alternativa: hospedagem estática

Execute `npm ci` e `npm run build`, depois publique o **conteúdo** de `dist/` na raiz pública do domínio. Não publique `src`, `package.json` ou `server.mjs` nesse diretório público. Preserve as pastas de cada página e seus arquivos `index.html`.

## Verificação após o deploy

- Abrir a página inicial e as nove páginas internas.
- Abrir diretamente `/contato/` e atualizar a aba.
- Navegar pelo menu e voltar pelo navegador.
- Conferir as imagens da galeria e os links externos.
- Confirmar que `app.js` recebe JavaScript, e não uma página de erro HTML.

Se o servidor não iniciar, confira os logs do deploy e se `dist/index.html` existe. Um erro 404 ao atualizar uma rota indica que a publicação não preservou os diretórios gerados ou que a raiz de saída foi configurada incorretamente.

A configuração foi preparada e testada localmente. A implantação na sua conta Hostinger ainda não foi executada ou validada.
