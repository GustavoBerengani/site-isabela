# Pra você, Isabela ♥

Site estático com a foto de fundo, a pergunta “Isabela, você me ama?” e um botão “Não” que foge do mouse, do toque e da tentativa de ativação pelo teclado.

## Abrir

Abra `dist/index.html` no navegador. Não precisa instalar dependências.

Para uma prévia HTTP, use `node preview.mjs` e abra o endereço mostrado no terminal.

## Colocar o vídeo

Em `dist/config.js`, preencha `youtubeUrl` com o link HTTPS do vídeo do YouTube. O botão “Sim, muito!” abrirá esse link na mesma aba. Enquanto o link estiver vazio ou inválido, aparece uma mensagem de carinho. Nenhum vídeo aleatório é usado.

## Arquivos

- `dist/index.html`: conteúdo da página.
- `dist/styles.css`: aparência e adaptação para celular.
- `dist/script.js`: botão que foge e resposta ao Sim.
- `dist/config.js`: link do YouTube.
- `dist/assets/foto.png`: foto fornecida para o fundo.

Pode ser hospedado em qualquer serviço de páginas estáticas usando a pasta `dist`. A página não envia respostas, não usa rastreamento e não coleta dados.
