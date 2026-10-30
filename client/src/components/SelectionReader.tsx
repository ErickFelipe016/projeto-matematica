import { useEffect } from "react";

function getSelectedText() {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) return "";

  const text = selection.toString().replace(/\s+/g, " ").trim();
  if (!text || text.length < 2) return "";

  const anchor = selection.anchorNode;
  const element = anchor instanceof Element ? anchor : anchor?.parentElement;
  if (
    element?.closest(
      'button, a, input, textarea, select, [contenteditable="true"]'
    )
  )
    return "";

  return text;
}

function readSelection() {
  if (!("speechSynthesis" in window)) return;

  const text = getSelectedText();
  if (!text) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  utterance.rate = 0.95;
  utterance.pitch = 1;

  const voices = window.speechSynthesis.getVoices();
  const portugueseVoice =
    voices.find(voice => voice.lang.toLowerCase().startsWith("pt-br")) ??
    voices.find(voice => voice.lang.toLowerCase().startsWith("pt"));
  if (portugueseVoice) utterance.voice = portugueseVoice;

  window.speechSynthesis.speak(utterance);
}

export default function SelectionReader() {
  useEffect(() => {
    const handleSelection = () => {
      window.setTimeout(readSelection, 80);
    };
    const handleKeyboardSelection = (event: KeyboardEvent) => {
      if (event.shiftKey || event.key === "Shift") handleSelection();
    };
    const stopReading = () => window.speechSynthesis?.cancel();

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("touchend", handleSelection);
    document.addEventListener("keyup", handleKeyboardSelection);
    window.addEventListener("blur", stopReading);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("touchend", handleSelection);
      document.removeEventListener("keyup", handleKeyboardSelection);
      window.removeEventListener("blur", stopReading);
      window.speechSynthesis?.cancel();
    };
  }, []);

  return null;
}
