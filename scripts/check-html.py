from html.parser import HTMLParser
from pathlib import Path


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.anchors = []
        self.headings = 0
        self.images = []
        self.text = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if "id" in attributes:
            self.ids.append(attributes["id"])
        if tag == "a" and attributes.get("href", "").startswith("#"):
            self.anchors.append(attributes["href"][1:])
        if tag == "h1":
            self.headings += 1
        if tag == "img":
            self.images.append(attributes)

    def handle_data(self, data):
        self.text.append(data)


html = Path("dist/public/index.html").read_text()
page = Page()
page.feed(html)
text = "".join(page.text)
assert page.headings == 1, "O site precisa de um único H1."
assert len(page.ids) == len(set(page.ids)), "IDs duplicados."
assert all(anchor in page.ids for anchor in page.anchors), "Âncora inválida."
assert all("alt" in image for image in page.images), "Imagem sem texto alternativo."

required = [
    "Matemática Inclusiva:",
    "Investigação e planejamento",
    "Acessibilidade e autonomia",
    "Estruturação da proposta e contribuição social",
    "Domínio técnico-científico",
    "Visão crítica",
    "Autonomia digital",
    "Comunicação e colaboração",
    "Atitude criativa e empreendedora",
    "Aplicação de conhecimentos de localização, distância e direção",
    "Como contribuição potencial",
    "Ilustração conceitual",
    "Mapa sem escala",
]
for phrase in required:
    assert phrase in text, f"Conteúdo ausente: {phrase}"
assert "maximum-scale" not in html and "user-scalable=no" not in html
assert Path("dist/public/manus-routes.json").exists()
assert Path("dist/public/images/senac-logo.svg").exists()
print("HTML validado: conteúdo completo, um H1, âncoras válidas, imagens com alt e zoom permitido.")
