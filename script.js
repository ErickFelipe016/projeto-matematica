(() => {
  const badge = document.getElementById('speakBadge');
  const widget = document.getElementById('a11yWidget');
  const toggle = document.getElementById('a11yToggle');
  const readButton = document.getElementById('btnReadPage');
  const contrastButton = document.getElementById('btnContrast');
  const fontButton = document.getElementById('btnFont');
  const supported = 'speechSynthesis' in window;
  let readingPage = false;
  let badgeTimer;

  function getPortugueseVoice() {
    if (!supported) return null;
    const voices = window.speechSynthesis.getVoices();
    return voices.find(v => v.lang === 'pt-BR') ||
      voices.find(v => v.lang && v.lang.toLowerCase().startsWith('pt')) || null;
  }

  function showBadge(message) {
    badge.textContent = message;
    badge.classList.add('show');
    clearTimeout(badgeTimer);
    badgeTimer = setTimeout(() => badge.classList.remove('show'), 3000);
  }

  function speak(text) {
    if (!supported || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    const voice = getPortugueseVoice();
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
    showBadge('🔊 ' + text);
  }

  function handleSelection() {
    const selection = window.getSelection();
    const text = selection ? selection.toString().trim() : '';
    if (text && text.length < 400) speak(text);
  }

  document.addEventListener('mouseup', handleSelection);
  document.addEventListener('touchend', handleSelection);
  document.addEventListener('keyup', event => {
    if (event.key === 'Shift' || event.shiftKey) handleSelection();
  });

  toggle.addEventListener('click', () => {
    const isOpen = widget.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Fechar opções de acessibilidade' : 'Abrir opções de acessibilidade');
    toggle.textContent = isOpen ? '›' : '‹';
  });

  readButton.addEventListener('click', () => {
    if (!supported) {
      showBadge('Seu navegador não oferece leitura em voz alta.');
      return;
    }
    if (readingPage) {
      window.speechSynthesis.cancel();
      readingPage = false;
      readButton.setAttribute('aria-pressed', 'false');
      badge.classList.remove('show');
      return;
    }
    const content = [...document.querySelectorAll('header.hero, main, footer')]
      .map(element => element.innerText || element.textContent)
      .join('. ')
      .replace(/\s+/g, ' ')
      .trim();
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = 'pt-BR';
    const voice = getPortugueseVoice();
    if (voice) utterance.voice = voice;
    utterance.onend = () => {
      readingPage = false;
      readButton.setAttribute('aria-pressed', 'false');
      badge.classList.remove('show');
    };
    window.speechSynthesis.speak(utterance);
    readingPage = true;
    readButton.setAttribute('aria-pressed', 'true');
    showBadge('🔊 Lendo a página inteira…');
  });

  contrastButton.addEventListener('click', () => {
    const active = document.body.classList.toggle('hc');
    contrastButton.setAttribute('aria-pressed', String(active));
  });

  fontButton.addEventListener('click', () => {
    const active = document.body.classList.toggle('large-text');
    fontButton.setAttribute('aria-pressed', String(active));
    fontButton.setAttribute('aria-label', active ? 'Restaurar o tamanho do texto' : 'Aumentar o tamanho do texto');
  });

  if (!supported) {
    const hint = document.querySelector('.listen-hint');
    if (hint) hint.textContent = 'Este navegador não oferece leitura em voz alta automática.';
    readButton.disabled = true;
  }
})();
