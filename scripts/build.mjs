import {build} from 'rolldown';
import fs from 'node:fs';
fs.mkdirSync('dist',{recursive:true});
await build({input:'src/entry.tsx',output:{file:'dist/app.js',format:'esm'},transform:{jsx:{runtime:'automatic'},define:{'process.env.NODE_ENV':JSON.stringify('production')}}});
fs.writeFileSync('dist/style.css',fs.readFileSync('src/globals.css','utf8'));
fs.cpSync('public','dist',{recursive:true});
fs.writeFileSync('dist/index.html','<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Advance — Sua próxima direção</title><meta name="description" content="Protótipo de redesign da Autoescola Advance"><link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="/style.css"></head><body><div id="root"></div><script type="module" src="/app.js"></script></body></html>');
const routeTitles={'quem-somos':'Quem somos','primeira-habilitacao':'Primeira habilitação','simulador-virtual':'Simulador virtual','adicao-de-cnh':'Adição de CNH','reciclagem-cnh':'Reciclagem de CNH',alunos:'Área do aluno',fotos:'Galeria de fotos','avalie-nos':'Avalie-nos',contato:'Contato'};
for(const [route,title] of Object.entries(routeTitles)){fs.mkdirSync('dist/'+route,{recursive:true});fs.writeFileSync('dist/'+route+'/index.html',fs.readFileSync('dist/index.html','utf8').replace('<title>Advance — Sua próxima direção</title>','<title>'+title+' — Advance</title>'));}
console.log('Build concluído em dist/ — 10 páginas.');
