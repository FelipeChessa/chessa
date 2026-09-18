# Chessa | Negócios e Tecnologia

## Estado do projeto

Este repositório contém o início da estrutura do site. As cinco páginas HTML e o favicon foram criados, mas o CSS e o JavaScript ainda precisam ser implementados. **Não considerar o site pronto ou publicável nesta etapa.** O próximo agente deve continuar a construção neste mesmo diretório, sem reiniciar o briefing.

O usuário pediu um projeto versionado em Git e escolheu o GPT-6 Astra para continuar a implementação. O modelo pode ser trocado assim que este documento estiver salvo. A tarefa original permanece: construir e verificar o site completo.

## Objetivo

Criar o site institucional e portfólio de Felipe Chessa, com a marca **Chessa | Negócios e Tecnologia**. O público principal da página inicial são donos de negócios locais de qualquer setor e porte. A trajetória em grandes empresas deve servir como credencial profissional, sem misturar projetos dessas empresas com o portfólio próprio da Chessa.

O site deve mostrar soluções prontas e projetos sob demanda: presença digital, automações, CRM, organização de processos e, conforme o porte da empresa, aplicações com Power Apps e Dynamics 365. O objetivo de conversão é iniciar uma conversa por WhatsApp. Não mostrar preços.

## Direção visual aprovada

O usuário aprovou o terceiro protótipo: visual moderno e tecnológico, sóbrio e executivo, com fundo escuro, contrastes em verde elétrico e turquesa, e uma comparação visual entre operação dispersa e operação organizada. Evitar aparência genérica de consultoria tradicional, mesa com notebook, ornamentos sem função, excesso de texto no primeiro bloco e promessas de resultados não comprovados.

- Chamada inicial aprovada: **Menos trabalho manual. Mais tempo para crescer.**
- Apoio: **Sites, automações e CRM para organizar seu negócio e atender melhor.**
- CTA principal: **Quero organizar meu negócio** (abrir WhatsApp).
- CTA secundário: **Ver soluções**.
- Mostrar um trecho da seção seguinte ainda na primeira tela.
- Foto de Felipe somente na seção/página Sobre, não na abertura.
- Protótipo aprovado copiado para `assets/prototipo-aprovado.png`.
- Visual de hero sem texto copiado para `assets/hero-tech.png`. Foi gerado como conceito visual, não representa um sistema real nem métricas de clientes.
- Foto original do usuário copiada para `assets/felipe-chessa.jpeg`.

## Páginas e navegação

- `index.html`: abertura, soluções por estágio, projetos próprios em destaque, método de trabalho, chamada para contato.
- `solucoes.html`: presença digital, automação, CRM/processos, soluções Microsoft como possibilidades de aplicação. Deixar claro que projetos de maior porte são avaliados caso a caso.
- `projetos.html`: somente os quatro projetos próprios listados abaixo; links externos. O Lumina abre em login, portanto mostrar visual de demonstração antes do link.
- `sobre.html`: foto, apresentação de Felipe, método de trabalho, trajetória em Indra (Minsait), Avanade e Bizapp, e credenciais Microsoft pessoais. As empresas são empregadoras, não clientes da Chessa.
- `contato.html`: WhatsApp, telefone, base em São José dos Campos, atendimento remoto para Brasil, América Latina e Europa; formulário não é necessário.
- Idiomas completos: português, inglês e espanhol, com seletor acessível e persistência da escolha. O usuário consegue conduzir reuniões nos três idiomas.

## Projetos próprios

1. **E.L Barbero**: site e presença digital para consultoria imobiliária. https://elbarbero-two.vercel.app/
2. **MultiEnvio**: produto de envio de mensagens para WhatsApp, com aplicativo para Windows. https://multienvio.vercel.app/ . Evitar prometer que o uso elimina risco de bloqueio; a página do produto exibe preços, mas o site da Chessa não deve reproduzi-los.
3. **Lumina**: sistema/CRM de gestão para clínicas. https://luminacrm-77.vercel.app/ . A URL pública abre em login. O usuário forneceu `Lumina - Sistema de Gestão Médica Premium.html`, um arquivo salvo do painel, e confirmou que os dados exibidos são fictícios e podem ser usados como demonstração. Não publicar o HTML bruto nem seus scripts; usar capturas ou apresentação visual selecionada do painel.
4. **Imobly**: CRM e automações de processos para corretores e imobiliárias. https://imobly-sistema.lovable.app/

Todos são produtos/sistemas próprios apresentados pelo usuário. Ele disse que os sistemas podem atender novos clientes e que também deseja priorizar soluções sob demanda. Evitar afirmar que todos usam a mesma arquitetura multiempresa sem verificar caso a caso, especialmente o MultiEnvio, que é um aplicativo local para Windows.

## Trajetória e limites de atribuição

- Mencionar Indra (Minsait), Avanade (ligada à Accenture) e Bizapp como parte da trajetória corporativa de Felipe.
- Não usar cases, clientes, logotipos de clientes, capturas ou resultados de projetos feitos no emprego na Bizapp. O caso industrial de Dynamics/omnichannel discutido na entrevista **não pode entrar como case da Chessa**.
- Não dizer que a Chessa é Microsoft Partner. A parceria Microsoft é da Bizapp, empregadora atual.
- Pode apresentar experiência profissional pessoal em Dynamics 365, Power Platform, Customer Service, omnichannel, diagnóstico, mapeamento de processos, Customer Success e transformação digital, sem atribuir a Chessa os projetos das empregadoras.
- No LinkedIn público aparecem MB-230, MB-910 e PL-900, além de badges sobre Microsoft 365 Copilot/Agents, business case de agentes e Purview. Conferir texto e vigência antes de publicar títulos detalhados. Perfil: https://br.linkedin.com/in/felipe-chessa
- Referências oficiais da Microsoft podem aparecer em uma seção **Possibilidades de aplicação**, sempre identificadas como exemplos de solução, não como projetos de Felipe: https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/model-driven-app-components ; https://learn.microsoft.com/en-us/dynamics365/sales/overview ; https://learn.microsoft.com/en-us/dynamics365/customer-service/implement/overview
- Para oportunidades de grande porte ou que concorram com a Bizapp, Felipe encaminha o prospect à empresa. Em negócios menores, atua diretamente pela Chessa. Não é necessário expor publicamente a regra comercial interna; descrever a oferta com precisão, sem prometer que Chessa executa sozinha toda implantação corporativa.

## Contato e conversão

- WhatsApp: +55 11 99287-6042. Link: https://wa.me/5511992876042
- Telefone: tel:+5511992876042
- Não há e-mail profissional a exibir.
- Ainda não há link de agenda. O botão para agendar reunião deve abrir o WhatsApp com uma mensagem pronta para combinar horário.
- Base: São José dos Campos, SP. Atendimento remoto para Brasil, América Latina e Europa.
- Não exibir preços em nenhuma página da Chessa.

## Implementação e verificação

- Manter a estrutura de múltiplas páginas já iniciada. Pode usar HTML/CSS/JavaScript sem dependências se isso entregar o resultado com qualidade, ou adotar uma ferramenta de build se houver justificativa clara. O resultado deve ser versionável e documentado.
- Criar CSS responsivo, menu móvel, foco visível, contraste adequado, textos sem sobreposição, estados de hover e suporte a `prefers-reduced-motion`.
- Verificar links, seletor de idiomas e navegação em desktop e celular. Conferir que a imagem do hero e a foto carregam corretamente.
- A versão em inglês e espanhol deve ser completa e natural, não somente tradução do menu.
- Incluir README com instruções para visualizar/editar o projeto.
- Não usar dados fictícios do protótipo como prova de resultados. O endereço `chessa.com.br` visto na imagem é ilustrativo; domínio não foi contratado/confirmado.
- O usuário pediu primeiro o site como projeto Git. Publicação pública não foi autorizada nesta etapa; entregar preview local e pedir aprovação da versão final antes de publicar.

## Próximos passos

1. Implementar `assets/styles.css` e `assets/app.js` e preencher todas as páginas.
2. Preparar visual dos projetos usando somente material permitido e identificando demonstrações fictícias.
3. Testar desktop/mobile, navegação e três idiomas; corrigir problemas.
4. Finalizar README e fazer um commit quando o site estiver funcional.
5. Entregar ao usuário um link de preview local e um resumo do que foi implementado.
