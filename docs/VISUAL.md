# Advance em movimento

Atualização visual em React e Motion, com uma base contínua em azul-marinho (#071426), superfícies em azul profundo (#0e223a e #15314f), ações em azul claro (#a9d5ff) e títulos claros (#f1f6fc). O tema completo está em src/navy.css, aplicado depois dos estilos de estrutura e movimento. Não há roxo ou lilás.

O fundo escuro acompanha todas as páginas, menus, cartões e formulários. Bordas discretas e diferenças de luminosidade distinguem as seções. Gradientes azuis suaves criam profundidade, enquanto botões claros destacam as ações. O build versiona CSS e JavaScript pelo conteúdo para que novas publicações não reutilizem a paleta antiga do cache.

As unidades ativas são 01 (Vila Industrial, João Jorge, 150) e 03 (Barão Geraldo). A Unidade 02 foi retirada do cadastro, dos cartões e da seleção no contato. A grade apresenta duas colunas no desktop e uma no celular.

- Títulos animados por palavras, fundos com gradientes e órbitas e faixas de texto em movimento.
- Cards de categoria com transição, novas formas e inclinação discreta com mouse.
- Quem somos com destaque para 1994 e fotografias sobrepostas.
- Caminho da formação desenhado conforme a rolagem; apresentação vertical no celular.
- Nossa estrutura substitui Fotos no menu, título e rodapé, mantendo a URL /fotos/.
- Animações ficam ativas automaticamente, respeitando prefers-reduced-motion do dispositivo. Não há controle manual de pausa.

Os links e imagens usam siteUrl para funcionar na subpasta do GitHub Pages e na raiz de um domínio próprio. BASE_PATH é definido no build. O roteador mantém suporte à navegação interna e ao histórico do navegador. O workflow existente verifica tipos, gera o build e publica main.

As limitações dos formulários continuam descritas em STATUS.md.
