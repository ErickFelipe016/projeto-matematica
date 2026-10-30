import React, { useEffect, useRef, useState } from "react";
import {
  Accessibility,
  ArrowUpRight,
  Check,
  Contrast,
  Menu,
  Moon,
  Minus,
  Plus,
  RotateCcw,
  Sun,
  X,
} from "lucide-react";

const navigation = [
  ["O projeto", "#projeto"],
  ["Aprendizagem", "#aprendizagem"],
  ["Calculadora", "#calculadora"],
  ["A proposta", "#proposta"],
  ["Impacto social", "#impacto"],
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fontLevel, setFontLevel] = useState(0);
  const [contrast, setContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const settingsButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.style.fontSize = `${100 + fontLevel * 12.5}%`;
    document.documentElement.dataset.contrast = contrast ? "high" : "normal";
  }, [fontLevel, contrast]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(
      "matematica-inclusiva-theme"
    );
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(savedTheme === "dark" || (!savedTheme && prefersDark));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    window.localStorage.setItem(
      "matematica-inclusiva-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  useEffect(() => {
    if (!settingsOpen) return;
    function onPointer(event: PointerEvent) {
      if (!settingsRef.current?.contains(event.target as Node))
        setSettingsOpen(false);
    }
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSettingsOpen(false);
        settingsButton.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onEscape);
    };
  }, [settingsOpen]);

  return (
    <header className="site-header">
      <div className="page-width header-inner">
        <a
          className="brand"
          href="#inicio"
          aria-label="Matemática Inclusiva — início"
        >
          <img
            src="/images/senac-logo.svg"
            alt="Senac"
            width="98"
            height="58"
          />
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-caption">
            Conhecimento que
            <br />
            <strong>transforma caminhos.</strong>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <div className="accessibility-wrapper" ref={settingsRef}>
            <button
              ref={settingsButton}
              className="accessibility-toggle"
              aria-label="Abrir opções de acessibilidade"
              aria-expanded={settingsOpen}
              aria-controls="accessibility-panel"
              onClick={() => {
                setSettingsOpen(!settingsOpen);
                setMenuOpen(false);
              }}
            >
              <Accessibility size={20} aria-hidden="true" />
              <span>Acessibilidade</span>
            </button>
            {settingsOpen && (
              <div
                id="accessibility-panel"
                className="accessibility-panel"
                role="region"
                aria-label="Opções de acessibilidade"
              >
                <div className="panel-heading">
                  <strong>Uma leitura do seu jeito</strong>
                  <button
                    className="icon-button"
                    aria-label="Fechar opções de acessibilidade"
                    onClick={() => {
                      setSettingsOpen(false);
                      settingsButton.current?.focus();
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
                <p>
                  Ajuste a apresentação sem mudar o conteúdo. Para ouvir,
                  selecione qualquer trecho de texto.
                </p>
                <div className="font-controls">
                  <span>Tamanho do texto</span>
                  <div>
                    <button
                      className="icon-button"
                      aria-label="Diminuir tamanho do texto"
                      disabled={fontLevel === 0}
                      onClick={() => setFontLevel(fontLevel - 1)}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="font-size-status" aria-live="polite">
                      {100 + fontLevel * 12.5}%
                    </span>
                    <button
                      className="icon-button"
                      aria-label="Aumentar tamanho do texto"
                      disabled={fontLevel === 2}
                      onClick={() => setFontLevel(fontLevel + 1)}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
                <button
                  className="settings-option"
                  aria-pressed={contrast}
                  onClick={() => setContrast(!contrast)}
                >
                  <Contrast size={18} />
                  <span>Alto contraste</span>
                  {contrast && <Check size={18} />}
                </button>
                <button
                  className="settings-option"
                  aria-pressed={darkMode}
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                  <span>{darkMode ? "Modo claro" : "Modo escuro"}</span>
                  {darkMode && <Check size={18} />}
                </button>
                <button
                  className="settings-option reset-option"
                  onClick={() => {
                    setFontLevel(0);
                    setContrast(false);
                  }}
                >
                  <RotateCcw size={17} />
                  <span>Restaurar padrão</span>
                </button>
              </div>
            )}
          </div>
          <button
            className="mobile-menu-toggle icon-button"
            aria-label={menuOpen ? "Fechar navegação" : "Abrir navegação"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setSettingsOpen(false);
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="mobile-nav page-width"
          aria-label="Navegação para dispositivos móveis"
        >
          {navigation.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
