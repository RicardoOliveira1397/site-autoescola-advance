# Estado da entrega

## Implementado

- React + TypeScript, identidade azul e estilos responsivos.
- Página inicial e nove páginas internas com URLs próprias.
- Navegação interna e histórico do navegador.
- Galeria de 25 fotografias, ampliação e navegação entre fotos.
- Seleção de categoria na página inicial.
- Telefones, WhatsApp, mapas, redes sociais e atalhos de aluno.
- Formulário de contato que prepara uma mensagem para revisão e abertura no WhatsApp.
- Formulário de avaliação com notas e revisão local, identificado como protótipo.
- Build independente e servidor configurável para hospedagem.

## Antes de substituir o site atual

- Integrar o envio e armazenamento das avaliações: atualmente a revisão acontece somente no navegador, e o link de envio leva ao formulário original.
- Integrar e-mail/backend de contato caso o cliente queira substituir o encaminhamento por WhatsApp.
- Revisar informações de cursos, disponibilidade, condições, textos legais e política de privacidade com o cliente.
- Confirmar os links externos do Detran-SP, que vieram do site original.
- Após aprovar a versão final, remover os rótulos de protótipo e revisar os links que ainda apontam para o site antigo. Quando o domínio for substituído, esses links não devem se tornar retornos circulares para o próprio protótipo.
- Configurar domínio, indexação e metadados finais de produção. O conteúdo é renderizado em React no navegador; HTML estático das rotas contém a estrutura de carregamento, não pré-renderização do conteúdo.

Nenhum formulário envia dados automaticamente. Não há banco de dados nem autenticação. Não foram incluídas credenciais, histórico Git, configurações privadas do Sites ou arquivos temporários da sessão.
