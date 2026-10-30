import React from "react";
import {
  Accessibility,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronDown,
  Compass,
  Eye,
  HeartHandshake,
  Info,
  Lightbulb,
  MapPin,
  MessageCircle,
  Monitor,
  MoveRight,
  Navigation,
  Route,
  ShoppingCart,
  Sparkles,
  Target,
  Volume2,
} from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import ConceptMap from "../components/ConceptMap";
import SupermarketCalculator from "../components/SupermarketCalculator";
import {
  competence,
  formativeMarks,
  impact,
  overview,
  steps,
} from "../data/project";

const markIcons = [BrainCircuit, Eye, Monitor, MessageCircle, Lightbulb];
const phaseIcons = [Compass, Eye, Lightbulb];

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo" tabIndex={-1}>
        <section id="inicio" className="hero" aria-labelledby="hero-heading">
          <div className="page-width hero-inner">
            <div className="hero-copy">
              <p className="eyebrow hero-topic" aria-hidden="true">
                MATEMÁTICA INCLUSIVA
              </p>
              <h1 id="hero-heading">
                <span className="sr-only">Matemática Inclusiva: </span>
                Caminhos para a <em>autonomia</em> no supermercado
              </h1>
              <p className="hero-description">
                Uma proposta de carrinho inteligente que conecta a Matemática à
                tecnologia para tornar as compras mais acessíveis a pessoas com
                deficiência visual.
              </p>
              <div className="hero-buttons">
                <a className="button-primary" href="#projeto">
                  Conheça o projeto <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a className="button-text" href="#proposta">
                  Explore a proposta <ArrowDown size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
            <figure className="hero-art">
              <div className="hero-art-frame">
                <img
                  src="/manus-storage/async-images/aN4qhUeWtTttGSVGmMTMDm/image-1.webp"
                  alt="Ilustração conceitual de uma pessoa com deficiência visual usando um carrinho inteligente em corredores de supermercado."
                  width="960"
                  height="794"
                  fetchPriority="high"
                />
              </div>
              <span className="hero-art-badge" aria-hidden="true">
                <Accessibility size={30} strokeWidth={1.6} />
              </span>
              <div className="hero-art-note">
                <ShoppingCart size={27} strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <strong>Mais autonomia. Mais inclusão.</strong>
                  <span>Conhecimento aplicado à vida real.</span>
                </div>
              </div>
              <figcaption>
                Ilustração conceitual · não representa um produto existente
              </figcaption>
            </figure>
          </div>
        </section>

        <div
          className="curriculum-strip"
          aria-label="Componente curricular e articulações"
        >
          <div className="page-width curriculum-inner">
            <div className="curriculum-title">
              <BookOpen
                className="curriculum-icon"
                size={32}
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div>
                <span>Componente curricular</span>
                <strong>Matemática</strong>
              </div>
            </div>
            <span className="curriculum-divider" aria-hidden="true" />
            <div className="curriculum-links">
              <span>
                <Monitor size={22} strokeWidth={1.5} aria-hidden="true" />{" "}
                Tecnologia
              </span>
              <span>
                <Accessibility size={23} strokeWidth={1.5} aria-hidden="true" />{" "}
                Acessibilidade
              </span>
              <span>
                <HeartHandshake
                  size={24}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />{" "}
                Inclusão social
              </span>
            </div>
          </div>
        </div>

        <section
          id="projeto"
          className="section page-width"
          aria-labelledby="project-heading"
        >
          <div className="project-layout">
            <div className="project-heading">
              <p className="eyebrow">
                <span className="section-number">01 /</span> O PROJETO
              </p>
              <h2 id="project-heading">
                Aprender Matemática.
                <br />
                Transformar o cotidiano.
              </h2>
            </div>
            <div className="project-copy">
              {overview.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <blockquote className="project-quote">
                Como o conhecimento matemático pode ajudar a tornar as compras
                mais acessíveis?
              </blockquote>
            </div>
          </div>
          <div className="competence-block">
            <span className="competence-icon" aria-hidden="true">
              <Target size={31} strokeWidth={1.6} />
            </span>
            <div>
              <h3>Conhecimentos que se tornam competências</h3>
              <p>{competence}</p>
            </div>
          </div>
          <div className="formative-heading">
            <h3>Marcas formativas</h3>
            <p>Aprendizagens que vão além da sala de aula.</p>
          </div>
          <div className="formative-marks">
            {formativeMarks.map((mark, index) => {
              const Icon = markIcons[index];
              return (
                <article className="formative-mark" key={mark.title}>
                  <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                  <h4>{mark.title}</h4>
                  <p>{mark.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="aprendizagem"
          className="section learning-section"
          aria-labelledby="learning-heading"
        >
          <div className="page-width">
            <div className="section-heading heading-row">
              <div>
                <p className="eyebrow">
                  <span className="section-number">02 /</span> PERCURSO DE
                  APRENDIZAGEM
                </p>
                <h2 id="learning-heading">
                  Investigar. Refletir.
                  <br />
                  Criar novos caminhos.
                </h2>
                <div
                  className="learning-cycle"
                  aria-label="Ciclo de ação, reflexão e nova ação"
                >
                  <span>Ação</span>
                  <MoveRight size={15} aria-hidden="true" />
                  <span>Reflexão</span>
                  <MoveRight size={15} aria-hidden="true" />
                  <span>Nova ação</span>
                </div>
              </div>
              <p className="heading-description">
                Três etapas conectam os conhecimentos matemáticos à construção
                colaborativa de uma solução inclusiva.
              </p>
            </div>
            <div className="steps">
              {steps.map((step, index) => {
                const Icon = phaseIcons[index];
                return (
                  <article className="step" key={step.number}>
                    <span
                      className="step-index"
                      aria-label={`Etapa ${index + 1}`}
                    >
                      {step.number}
                    </span>
                    <div className="step-title">
                      <p className="step-phase">
                        <Icon size={16} aria-hidden="true" />
                        {step.phase}
                      </p>
                      <h3>{step.title}</h3>
                    </div>
                    <div className="step-body">
                      <p>{step.text}</p>
                      <div className="step-tags">
                        {step.tags.map(tag => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <SupermarketCalculator />

        <section
          id="proposta"
          className="section page-width"
          aria-labelledby="proposal-heading"
        >
          <div className="proposal-layout">
            <div className="proposal-copy">
              <p className="eyebrow">
                <span className="section-number">04 /</span> A PROPOSTA
              </p>
              <h2 id="proposal-heading">
                Um carrinho inteligente.
                <br />
                Uma ideia de inclusão.
              </h2>
              <p className="proposal-description">
                A proposta foi organizada em torno de um modelo ou protótipo de
                carrinho de compras inteligente. Localização, distância, direção
                e organização espacial orientam o planejamento dos corredores,
                setores e possíveis trajetos.
              </p>
              <div className="proposal-details">
                <details open>
                  <summary>
                    <span>
                      <Volume2 size={18} aria-hidden="true" /> Orientações
                      acessíveis
                    </span>
                    <ChevronDown size={17} aria-hidden="true" />
                  </summary>
                  <p>
                    A reflexão considera recursos tecnológicos capazes de
                    oferecer orientações claras para a circulação e a
                    localização de produtos. A informação precisa ser
                    compreensível e acessível ao usuário.
                  </p>
                </details>
                <details>
                  <summary>
                    <span>
                      <Accessibility size={18} aria-hidden="true" /> Facilidade
                      de uso e autonomia
                    </span>
                    <ChevronDown size={17} aria-hidden="true" />
                  </summary>
                  <p>
                    A facilidade de uso e a clareza das informações são aspectos
                    centrais da proposta. O objetivo é apoiar a independência
                    durante as compras, respeitando as necessidades das pessoas
                    com deficiência visual.
                  </p>
                </details>
                <details>
                  <summary>
                    <span>
                      <Info size={18} aria-hidden="true" /> Possibilidades e
                      limitações
                    </span>
                    <ChevronDown size={17} aria-hidden="true" />
                  </summary>
                  <p>
                    O projeto apresenta uma contribuição potencial, não uma
                    solução já validada. O funcionamento em um supermercado real
                    dependeria de desenvolvimento, avaliação de acessibilidade e
                    participação dos usuários.
                  </p>
                </details>
              </div>
              <p className="proposal-disclaimer">
                <Info size={15} aria-hidden="true" />
                Esta é uma proposta educacional. O mapa ao lado exemplifica
                conceitos matemáticos; não simula um carrinho real.
              </p>
            </div>
            <ConceptMap />
          </div>
        </section>

        <section
          id="impacto"
          className="section impact-section"
          aria-labelledby="impact-heading"
        >
          <div className="page-width impact-layout">
            <div className="impact-heading">
              <p className="eyebrow">
                <span className="section-number">05 /</span> CONTRIBUIÇÃO SOCIAL
              </p>
              <h2 id="impact-heading">
                Acessibilidade é um caminho para participar.
              </h2>
              <HeartHandshake size={45} strokeWidth={1.4} aria-hidden="true" />
            </div>
            <div className="impact-copy">
              {impact.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="impact-outcomes">
                <span>
                  <Check size={18} aria-hidden="true" /> Menos dependência
                </span>
                <span>
                  <Check size={18} aria-hidden="true" /> Mais autonomia
                </span>
                <span>
                  <Check size={18} aria-hidden="true" /> Espaços mais inclusivos
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="closing" aria-labelledby="closing-heading">
          <div className="page-width closing-inner">
            <div>
              <h2 id="closing-heading">
                O próximo caminho começa
                <br />
                com <span>um olhar mais inclusivo.</span>
              </h2>
              <p>
                Matemática, criatividade e colaboração a serviço da participação
                social.
              </p>
            </div>
            <a className="button-text" href="#aprendizagem">
              Revisite o percurso <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="page-width">
          <div className="footer-main">
            <a
              href="#inicio"
              className="footer-brand"
              aria-label="Matemática Inclusiva — voltar ao início"
            >
              <img
                src="/images/senac-logo.svg"
                alt="Senac"
                width="78"
                height="46"
              />
              <div>
                <strong>Matemática Inclusiva</strong>
                <span>Educação que conecta conhecimento e inclusão.</span>
              </div>
            </a>
            <nav aria-label="Navegação do rodapé">
              <a href="#projeto">O projeto</a>
              <a href="#aprendizagem">Aprendizagem</a>
              <a href="#calculadora">Calculadora</a>
              <a href="#proposta">A proposta</a>
              <a href="#impacto">Impacto social</a>
            </nav>
          </div>
          <div className="footer-bottom">
            <p>
              Projeto educacional · Matemática, tecnologia e inclusão social.
              Proposta conceitual, sem validação de produto.
            </p>
            <a href="#inicio" className="back-to-top">
              Voltar ao topo <ArrowUp size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
