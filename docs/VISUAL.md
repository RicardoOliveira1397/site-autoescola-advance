# Advance em movimento

Atualização visual em React e Motion, com fundos em azul suave (#496ba5), ciano e lavanda. Os brilhos dos fundos têm intensidade reduzida; o azul elétrico permanece nos pequenos detalhes da identidade.

As unidades ativas são 01 (Vila Industrial, João Jorge, 150) e 03 (Barão Geraldo). A Unidade 02 foi retirada do cadastro, dos cartões e da seleção no contato. A grade apresenta duas colunas no desktop e uma no celular.

- Títulos animados por palavras, fundos com gradientes e órbitas e faixas de texto em movimento.
- Cards de categoria com transição, novas formas e inclinação discreta com mouse.
- Quem somos com destaque para 1994 e fotografias sobrepostas.
- Caminho da formação desenhado conforme a rolagem; apresentação vertical no celular.
- Nossa estrutura substitui Fotos no menu, título e rodapé, mantendo a URL /fotos/.
- Animações ficam ativas automaticamente, respeitando prefers-reduced-motion do dispositivo. Não há controle manual de pausa.

Os links e imagens usam siteUrl para funcionar na subpasta do GitHub Pages e na raiz de um domínio próprio. BASE_PATH é definido no build. O roteador mantém suporte à navegação interna e ao histórico do navegador. O workflow existente verifica tipos, gera o build e publica main.

As limitações dos formulários continuam descritas em STATUS.md.
