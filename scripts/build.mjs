import {build} from 'rolldown';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
if (!/^([/][a-zA-Z0-9._-]+)*$/.test(base)) throw new Error('BASE_PATH inválido');
fs.mkdirSync('dist',{recursive:true});
await build({input:'src/entry.tsx',output:{file:'dist/app.js',format:'esm',minify:true},transform:{jsx:{runtime:'automatic'},define:{__BASE_PATH__:JSON.stringify(base),'process.env.NODE_ENV':JSON.stringify('production')}}});
fs.writeFileSync('dist/style.css',['globals','movement','navy'].map(name=>fs.readFileSync('src/'+name+'.css','utf8')).join('\n'));
fs.cpSync('public','dist',{recursive:true});
const assetVersion = name => createHash('sha256').update(fs.readFileSync('dist/'+name)).digest('hex').slice(0,12);
fs.writeFileSync('dist/index.html',`<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#071426"><title>Advance — Sua próxima direção</title><meta name="description" content="Protótipo de redesign da Autoescola Advance"><link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="/style.css?v=${assetVersion('style.css')}"></head><body><div id="root"></div><script type="module" src="/app.js?v=${assetVersion('app.js')}"></script></body></html>`.replace(/(href|src)="\//g, '$1="' + base + '/'));
const routeTitles={'quem-somos':'Quem somos','primeira-habilitacao':'Primeira habilitação','simulador-virtual':'Simulador virtual','adicao-de-cnh':'Adição de CNH','reciclagem-cnh':'Reciclagem de CNH',alunos:'Área do aluno',fotos:'Nossa estrutura','avalie-nos':'Avalie-nos',contato:'Contato'};
for(const [route,title] of Object.entries(routeTitles)){fs.mkdirSync('dist/'+route,{recursive:true});fs.writeFileSync('dist/'+route+'/index.html',fs.readFileSync('dist/index.html','utf8').replace('<title>Advance — Sua próxima direção</title>','<title>'+title+' — Advance</title>'));}
console.log('Build concluído em dist/ — 10 páginas.');
