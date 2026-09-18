# Chessa | Negócios e Tecnologia

Site institucional e portfólio de Felipe Chessa, com cinco páginas em português, inglês e espanhol. O resultado é HTML estático: navegação, conteúdo e idiomas funcionam sem um framework no navegador. JavaScript complementa menu móvel, filtros, ampliação de imagens e contato contextual.

## Começar

Requer Node.js 22 ou superior.

```sh
npm ci
npm run build
```

Abra `dist/index.html` no navegador. Todas as páginas, imagens, fontes e scripts usam caminhos relativos e podem ser visualizados localmente. Também é possível usar o servidor de prévia:

```sh
npm run preview
```

A prévia usa `http://127.0.0.1:4173`. Se a porta estiver ocupada, usa a próxima disponível. O servidor expõe somente `dist`, e apenas na máquina local.

## Estrutura

```text
src/
  content.mjs       # Conteúdo completo por idioma
  templates.mjs     # Layout compartilhado e cinco páginas
assets/
  styles.css       # Design responsivo
  app.js           # Interações progressivas
  projects/        # Capturas dos quatro projetos
  hero-tech.png    # Imagem conceitual aprovada
  felipe-chessa.jpeg
scripts/
  build.mjs        # Gera 15 páginas e otimiza imagens
  preview.mjs      # Prévia HTTP local opcional
  capture-projects.mjs  # Atualização opcional das capturas
tests/
  site.test.mjs    # Links, idiomas, renderização e interações
dist/              # Saída gerada, não versionada
```

As páginas `index.html`, `solucoes.html`, `projetos.html`, `sobre.html` e `contato.html` são geradas na raiz de `dist` (português), em `dist/en` e em `dist/es`. Os arquivos HTML vazios do primeiro esqueleto foram substituídos por essa estrutura de geração.

## Editar

- Textos, projetos, mensagens de WhatsApp e traduções: `src/content.mjs`.
- Estrutura das páginas: `src/templates.mjs`.
- Cores, dimensões, tipografia e regras para celular: `assets/styles.css`.
- Imagens: `assets/`; execute o build após alterações.
- Não editar diretamente `dist`, pois os arquivos são regenerados.

As fontes Manrope e DM Sans e os ícones Lucide são incorporados ao site localmente, a partir dos pacotes instalados. Nenhuma chamada a CDN é necessária para navegar.

## Verificar

```sh
npm run build
npm test
```

Os testes utilizam Chrome ou Edge instalado no Windows. Em outro ambiente, defina `BROWSER_PATH` com o executável do navegador Chromium ou instale o Chromium do Playwright. Os testes verificam as 15 páginas em 1440, 390 e 320 pixels, navegação de idiomas, recursos, filtros, diálogos, menu móvel e links de contato. Capturas de revisão são gravadas em `artifacts/`, fora do Git.

## Atualizar capturas dos produtos

```sh
node scripts/capture-projects.mjs
npm run build
```

Essa etapa é opcional. As capturas atuais estão versionadas. O script visita as páginas públicas e precisa do HTML do Lumina fornecido pelo usuário na raiz do projeto. Ele remove scripts antes de renderizar a cópia do Lumina; apenas uma imagem resultante vai para o site. Os arquivos originais salvos pelo usuário não são publicados nem incluídos no histórico Git.

## Conteúdo e publicação

Consulte `ORIENTACOES_DO_PROJETO.md` para o briefing e os limites de atribuição profissional. Não mostrar preços, cases da Bizapp ou apresentar a Chessa como parceira Microsoft. Os empregadores aparecem somente na trajetória de Felipe. A imagem do hero é conceitual; a captura do Lumina contém dados fictícios autorizados.

Nenhum serviço de analytics ou coleta de formulário foi incluído. WhatsApp, LinkedIn e produtos são links externos. O seletor de idiomas grava somente a preferência local do navegador.

Para publicar, envie apenas o conteúdo de `dist` a uma hospedagem estática. Domínio e publicação ainda dependem da revisão do usuário. Ao definir o domínio real, acrescentar URLs canônicas, imagem social absoluta e sitemap. Não há domínio de exemplo embutido no conteúdo.
