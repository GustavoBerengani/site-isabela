# Pra você, Isabela ♥

Site interativo feito com HTML, CSS e JavaScript, com uma foto de fundo e a pergunta **“Isabela, você me ama?”**. O layout se adapta ao computador e ao celular, sem dependências externas.

## Como funciona

- **Sim, muito!** abre o [vídeo escolhido no YouTube](https://youtu.be/ybpRjw6XJsY?si=pVf-VvuXkmxDcOpw) na mesma aba.
- **Não** muda de posição quando alguém aproxima o mouse, tenta tocar ou ativa o botão pelo teclado. Ele permanece dentro da área visível e evita cobrir o botão “Sim”.
- Se o link do vídeo estiver vazio ou inválido, o “Sim” exibe uma mensagem de carinho.

## Abrir localmente

Abra `dist/index.html` no navegador. Não é necessário instalar dependências.

Para usar uma prévia HTTP, tenha o Node.js instalado e execute na pasta do projeto:

```sh
node preview.mjs
```

Abra o endereço `http://127.0.0.1:...` exibido no terminal. A porta é escolhida automaticamente. Use `Ctrl+C` para encerrar a prévia.

## Alterar o vídeo

Edite o campo `youtubeUrl` em `dist/config.js`. O vídeo atual já está configurado:

```js
window.ISABELA_CONFIG = Object.freeze({
  youtubeUrl: "https://youtu.be/ybpRjw6XJsY?si=pVf-VvuXkmxDcOpw",
});
```

Use um link HTTPS do YouTube ou de `youtu.be`.

## Arquivos

| Arquivo | Função |
| --- | --- |
| `dist/index.html` | Conteúdo e estrutura da página. |
| `dist/styles.css` | Aparência, layout responsivo e movimento reduzido. |
| `dist/script.js` | Fuga do botão “Não” e ação do botão “Sim”. |
| `dist/config.js` | Configuração do link do vídeo. |
| `dist/assets/foto.png` | Foto usada como fundo. |
| `preview.mjs` | Servidor HTTP para prévia local. |

O conteúdo da pasta `dist` pode ser hospedado em um serviço de páginas estáticas. O próprio site não armazena nem envia as respostas; ao clicar em “Sim”, a navegação segue para o YouTube.
