# TODO

## 1. Apresentação do projeto e contexto de aprendizagem
- [x] A página inicial apresenta o projeto pelo título “Matemática Inclusiva: caminhos para a autonomia no supermercado”.
- [x] O site informa que o componente curricular é Matemática, articulada à tecnologia e à inclusão social.
- [x] A situação de aprendizagem explica que o projeto teve como objetivo elaborar uma proposta de carrinho de compras inteligente para auxiliar pessoas com deficiência visual na circulação e na localização de produtos em supermercados.
- [x] A apresentação relaciona conhecimentos matemáticos a uma necessidade cotidiana e evidencia sua contribuição para acessibilidade e inclusão social.

## 2. Competências matemáticas e marcas formativas
- [x] O site apresenta os elementos de competência: aplicação de conhecimentos de localização, distância e direção na elaboração de soluções acessíveis, com investigação de problemas e comunicação colaborativa.
- [x] O site apresenta todas as marcas formativas: domínio técnico-científico; visão crítica; autonomia digital; comunicação e colaboração; atitude criativa e empreendedora.
- [x] A explicação da proposta relaciona localização, distância, direção e organização espacial à análise de corredores, setores e possíveis trajetos do supermercado.

## 3. Percurso pedagógico em três etapas
- [x] A Etapa 1 — “Ação: investigação e planejamento” explica que os estudantes investigaram as dificuldades enfrentadas por pessoas com deficiência visual durante as compras e planejaram a proposta do carrinho. Registra que aplicaram localização, distância, direção e organização espacial à análise dos corredores, dos setores e dos possíveis trajetos.
- [x] A Etapa 2 — “Reflexão: acessibilidade e autonomia” aborda barreiras que poderiam limitar a independência dos usuários e recursos tecnológicos capazes de oferecer orientações acessíveis. Registra que foram consideradas a clareza das informações, a facilidade de uso e as possibilidades e limitações da solução.
- [x] A Etapa 3 — “Nova ação: estruturação da proposta e contribuição social” apresenta a organização da proposta em torno de um modelo ou protótipo de carrinho inteligente. Registra o valor do raciocínio matemático, da criatividade e da colaboração na construção de soluções para problemas reais.

## 4. Proposta do carrinho e contribuição social potencial
- [x] O site apresenta o carrinho como proposta, modelo ou protótipo conceitual, sem afirmar que se trata de produto já implementado ou validado.
- [x] A explicação destaca orientações acessíveis, clareza da informação, facilidade de uso e as possibilidades e limitações consideradas no projeto.
- [x] A seção de impacto reconhece a acessibilidade como condição para a participação social.
- [x] O site explica que, no âmbito educativo, a experiência estimulou atenção às necessidades das pessoas com deficiência visual e ao papel dos estudantes na proposição de mudanças.
- [x] O site descreve como contribuição potencial a redução da dependência de terceiros e a ampliação da autonomia durante as compras, apontando caminhos para tornar espaços comerciais mais inclusivos.

## 5. Identidade visual, navegação e acessibilidade
- [x] O cabeçalho e o rodapé apresentam a logo do Senac e usam cores inspiradas em sua identidade visual, especialmente azul e laranja.
- [x] A navegação é responsiva e semântica, oferece contraste adequado, foco visível, textos alternativos e compatibilidade com teclado e leitores de tela.
- [x] O conteúdo usa hierarquia clara, linguagem em português brasileiro e leitura confortável em celular e desktop.

## Evidências de entrega

`pnpm check`, `pnpm build:static` e `python3 scripts/check-html.py` passaram. O Preview responde HTTP 200 na porta 3000; a logo e o manifesto de rotas também estão disponíveis. Conteúdo pedagógico e três etapas preservados em `client/src/data/project.ts`; interface implementada em `Home.tsx`, `SiteHeader.tsx` e `ConceptMap.tsx`. A ilustração hero foi solicitada e seu endereço gerenciado está integrado; sua geração é assíncrona.
