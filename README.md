# Autoescola Advance

Projeto independente em **React + TypeScript**, com identidade azul, dez páginas e galeria com 25 fotografias. O build utiliza Rolldown e gera arquivos estáticos em `dist/`. Não depende do Codex, Sites, Next.js, Cloudflare ou de serviços privados para funcionar.

## Começar

Use Node.js 24 e npm. Na raiz desta pasta:

```sh
npm ci
npm run dev
```

Abra `http://localhost:3000`. `npm run dev` gera o build e inicia o servidor; nesta versão não há recarregamento automático. Depois de editar, encerre com Ctrl+C e execute novamente.

## Comandos

| Comando | Função |
| --- | --- |
| `npm ci` | Instala as versões fixadas no lockfile |
| `npm run typecheck` | Verifica os tipos TypeScript |
| `npm run build` | Gera o site completo em `dist/` |
| `npm start` | Serve o build existente, com suporte a `PORT` e `HOST` |

## Estrutura

- `src/page.tsx`: página inicial.
- `src/Site.tsx`: páginas internas, menu, rodapé, galeria e formulários.
- `src/content.ts`: conteúdo dos serviços e unidades.
- `src/navigation.ts`: navegação React e histórico do navegador.
- `src/globals.css`: estilos e responsividade.
- `src/gallery.json`: lista das fotografias.
- `public/`: imagens e ícone do site.
- `scripts/build.mjs`: empacotamento e geração dos HTMLs das rotas.
- `server.mjs`: servidor HTTP para execução independente.
- `docs/HOSTINGER.md`: configuração de publicação.
- `docs/STATUS.md`: estado do protótipo e integrações pendentes.

## Páginas

`/`, `/quem-somos/`, `/primeira-habilitacao/`, `/simulador-virtual/`, `/adicao-de-cnh/`, `/reciclagem-cnh/`, `/alunos/`, `/fotos/`, `/avalie-nos/`, `/contato/`.

O build cria um `index.html` para cada rota. Assim, abrir uma URL diretamente ou atualizar a página funciona também em hospedagens estáticas que servem índices de diretório. Por padrão, publique na raiz do domínio/subdomínio. Para uma subpasta, configure BASE_PATH no build; o workflow do GitHub Pages faz isso automaticamente.

## GitHub

Crie um repositório vazio no GitHub e execute os comandos abaixo **dentro desta pasta**, não na pasta-pai do projeto antigo. Substitua a URL pela URL real do seu repositório:

```sh
git init
git add .
git commit -m "Versão inicial do site Advance"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

O `.gitignore` exclui dependências, build, logs e arquivos de ambiente. O `package.json` deve ficar na raiz do repositório. Não é preciso enviar `node_modules` nem `dist` para o GitHub; a Hostinger gera o build.

## Hostinger

Siga [docs/HOSTINGER.md](docs/HOSTINGER.md). Resumo: Node.js **24**, instalação `npm ci`, build `npm run build`, saída `dist`. Este projeto usa um build próprio; se a detecção não oferecer React, selecione **Other**. Para execução Node, arquivo de entrada `server.mjs` e comando `npm start`.

## Conteúdo e dependências externas

As imagens e informações institucionais foram trazidas do site do cliente: https://autoescolaadvance.com.br/. As fontes são carregadas pelo Google Fonts. A área do aluno aponta para serviços externos do Detran-SP; contato, mapas e redes sociais abrem seus respectivos destinos.

A demonstração é publicada pelo workflow `.github/workflows/pages.yml` a cada push em `main`, com verificação de tipos antes do build. O deploy envia somente `dist/`, sem executar `server.mjs`. Veja as limitações funcionais em `docs/STATUS.md` antes de substituir o site atual.

## Demonstração no GitHub Pages

Endereço: https://ricardooliveira1397.github.io/site-autoescola-advance/

Em Settings → Pages, a origem deve ser GitHub Actions. O workflow obtém o caminho-base do Pages, permitindo abrir e atualizar todas as dez páginas diretamente. Localmente, `npm run dev` continua funcionando na raiz.
