import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Página não encontrada — Matemática Inclusiva";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    if (window.location.pathname.replace(/\/$/, "") !== "/404")
      window.location.replace("/404");
    return () => robots.remove();
  }, []);

  return (
    <main className="error-page">
      <img src="/images/senac-logo.svg" alt="Senac" width="98" height="58" />
      <h1>404</h1>
      <h2>Este caminho não foi encontrado.</h2>
      <p>
        A página que você procurou não existe. Volte ao início para conhecer o
        projeto.
      </p>
      <a className="button-primary" href="/">
        <ArrowLeft size={18} aria-hidden="true" />
        Voltar ao projeto
      </a>
    </main>
  );
}
