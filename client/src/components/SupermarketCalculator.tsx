import { useMemo, useState } from "react";
import {
  Calculator,
  Minus,
  Plus,
  RotateCcw,
  Search,
  ShoppingBasket,
  Trash2,
  Tag,
  Volume2,
  VolumeX,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  unit: string;
  price: number;
};

type CartLine = Product & { quantity: number };

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Arroz 5 kg",
    category: "Mercearia",
    unit: "pacote",
    price: 28.9,
  },
  {
    id: 2,
    name: "Feijão 1 kg",
    category: "Mercearia",
    unit: "pacote",
    price: 8.49,
  },
  {
    id: 3,
    name: "Leite integral 1 L",
    category: "Laticínios",
    unit: "caixa",
    price: 5.49,
  },
  {
    id: 4,
    name: "Ovos com 12 unidades",
    category: "Frescos",
    unit: "bandeja",
    price: 11.9,
  },
  {
    id: 5,
    name: "Café 500 g",
    category: "Mercearia",
    unit: "pacote",
    price: 18.9,
  },
  {
    id: 6,
    name: "Banana 1 kg",
    category: "Hortifruti",
    unit: "kg",
    price: 6.99,
  },
  { id: 7, name: "Frango 1 kg", category: "Carnes", unit: "kg", price: 12.9 },
  {
    id: 8,
    name: "Sabão em pó 1,6 kg",
    category: "Limpeza",
    unit: "pacote",
    price: 21.9,
  },
];

const money = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function speakCartMessage(message: string, enabled = true) {
  if (!enabled || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "pt-BR";
  utterance.rate = 0.95;
  const voices = window.speechSynthesis.getVoices();
  const portugueseVoice =
    voices.find(voice => voice.lang.toLowerCase().startsWith("pt-br")) ??
    voices.find(voice => voice.lang.toLowerCase().startsWith("pt"));
  if (portugueseVoice) utterance.voice = portugueseVoice;
  window.speechSynthesis.speak(utterance);
}

function speakCartUpdate(
  productName: string,
  quantity: number,
  itemTotal: number,
  enabled = true
) {
  speakCartMessage(
    `${productName} adicionado. Quantidade: ${quantity}. Valor do item: ${money(itemTotal)}.`,
    enabled
  );
}

export default function SupermarketCalculator() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [query, setQuery] = useState("");
  const [discount, setDiscount] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const filteredProducts = useMemo(() => {
    const normalized = query.toLocaleLowerCase("pt-BR").trim();
    if (!normalized) return products;
    return products.filter(product =>
      `${product.name} ${product.category}`
        .toLocaleLowerCase("pt-BR")
        .includes(normalized)
    );
  }, [products, query]);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discountValue = subtotal * (discount / 100);
  const total = subtotal - discountValue;
  const itemCount = cart.reduce(
    (totalItems, item) => totalItems + item.quantity,
    0
  );

  const addToCart = (product: Product) => {
    const currentQuantity =
      cart.find(item => item.id === product.id)?.quantity ?? 0;
    const nextQuantity = currentQuantity + 1;
    setCart(current => {
      const found = current.find(item => item.id === product.id);
      if (found) {
        return current.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    speakCartUpdate(
      product.name,
      nextQuantity,
      product.price * nextQuantity,
      voiceEnabled
    );
  };

  const updateQuantity = (id: number, change: number) => {
    const currentItem = cart.find(item => item.id === id);
    if (currentItem && change < 0) {
      const nextQuantity = currentItem.quantity + change;
      if (nextQuantity <= 0) {
        speakCartMessage(
          `${currentItem.name} removido do carrinho.`,
          voiceEnabled
        );
      } else {
        speakCartMessage(
          `${currentItem.name}. Quantidade reduzida para ${nextQuantity}.`,
          voiceEnabled
        );
      }
    }
    setCart(current =>
      current
        .map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const updatePrice = (id: number, value: string) => {
    const price = Number(value.replace(",", "."));
    if (Number.isNaN(price) || price < 0) return;
    setProducts(current =>
      current.map(product =>
        product.id === id ? { ...product, price } : product
      )
    );
    setCart(current =>
      current.map(item => (item.id === id ? { ...item, price } : item))
    );
  };

  const reset = () => {
    setCart([]);
    setDiscount(0);
    setQuery("");
    setProducts(initialProducts);
  };

  return (
    <section
      id="calculadora"
      className="calculator-section"
      aria-labelledby="calculator-heading"
    >
      <div className="page-width">
        <div className="calculator-heading">
          <div>
            <p className="eyebrow">
              <span className="section-number">03 /</span> FERRAMENTA DE
              AUTONOMIA
            </p>
            <h2 id="calculator-heading">
              Calcule sua compra
              <br />
              <span>antes de chegar ao caixa.</span>
            </h2>
          </div>
          <p>
            Monte uma lista, ajuste os preços da sua loja e descubra o total com
            desconto em poucos passos.
          </p>
        </div>

        <div className="calculator-notice">
          <Tag size={18} aria-hidden="true" />
          <span>
            <strong>Preços de referência editáveis.</strong> Atualize o valor de
            cada item conforme o supermercado, a cidade ou a promoção do dia.
          </span>
        </div>

        <div className="calculator-layout">
          <div className="product-catalog">
            <div className="calculator-panel-heading">
              <div>
                <span className="panel-kicker">CATÁLOGO</span>
                <h3>Escolha os produtos</h3>
              </div>
              <span className="catalog-count">{products.length} itens</span>
            </div>
            <label className="search-field">
              <Search size={18} aria-hidden="true" />
              <span className="sr-only">Buscar produto</span>
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Buscar arroz, leite, limpeza..."
              />
            </label>
            <div className="product-list">
              {filteredProducts.map(product => (
                <article className="product-card" key={product.id}>
                  <div className="product-icon" aria-hidden="true">
                    <ShoppingBasket size={19} />
                  </div>
                  <div className="product-info">
                    <strong>{product.name}</strong>
                    <span>
                      {product.category} · {product.unit}
                    </span>
                  </div>
                  <label className="price-editor">
                    <span>R$</span>
                    <input
                      aria-label={`Preço de ${product.name}`}
                      inputMode="decimal"
                      value={product.price.toFixed(2).replace(".", ",")}
                      onChange={event =>
                        updatePrice(product.id, event.target.value)
                      }
                    />
                  </label>
                  <button
                    className="add-product"
                    onClick={() => addToCart(product)}
                    aria-label={`Adicionar ${product.name} ao carrinho`}
                  >
                    <Plus size={18} />
                  </button>
                </article>
              ))}
              {filteredProducts.length === 0 && (
                <p className="empty-state">
                  Nenhum produto encontrado. Tente outro termo.
                </p>
              )}
            </div>
          </div>

          <aside className="cart-panel" aria-labelledby="cart-heading">
            <div className="calculator-panel-heading">
              <div>
                <span className="panel-kicker">SEU CARRINHO</span>
                <h3 id="cart-heading">Lista de compras</h3>
              </div>
              <div className="cart-heading-actions">
                <span className="cart-count">
                  {itemCount} {itemCount === 1 ? "item" : "itens"}
                </span>
                <button
                  className="voice-toggle"
                  aria-pressed={voiceEnabled}
                  aria-label={
                    voiceEnabled
                      ? "Silenciar avisos de voz"
                      : "Ativar avisos de voz"
                  }
                  onClick={() => {
                    setVoiceEnabled(!voiceEnabled);
                    if (voiceEnabled) window.speechSynthesis?.cancel();
                  }}
                >
                  {voiceEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                  <span>{voiceEnabled ? "Voz ativa" : "Voz desligada"}</span>
                </button>
              </div>
            </div>
            <div className="cart-lines">
              {cart.length === 0 && (
                <div className="cart-empty">
                  <ShoppingBasket
                    size={34}
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                  <p>Seu carrinho está vazio.</p>
                  <span>Adicione produtos ao lado para começar.</span>
                </div>
              )}
              {cart.map(item => (
                <div className="cart-line" key={item.id}>
                  <div className="cart-line-name">
                    <strong>{item.name}</strong>
                    <span>
                      {money(item.price)} / {item.unit}
                    </span>
                  </div>
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label={`Diminuir quantidade de ${item.name}`}
                    >
                      <Minus size={14} />
                    </button>
                    <span aria-label={`Quantidade: ${item.quantity}`}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Aumentar quantidade de ${item.name}`}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <strong className="line-total">
                    {money(item.price * item.quantity)}
                  </strong>
                  <button
                    className="remove-item"
                    onClick={() => updateQuantity(item.id, -item.quantity)}
                    aria-label={`Remover ${item.name}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
            <div className="discount-field">
              <label htmlFor="discount">Desconto aplicado</label>
              <div>
                <input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={discount}
                  onChange={event =>
                    setDiscount(
                      Math.min(100, Math.max(0, Number(event.target.value)))
                    )
                  }
                />
                <span>%</span>
              </div>
            </div>
            <div className="totals">
              <div>
                <span>Subtotal</span>
                <strong>{money(subtotal)}</strong>
              </div>
              <div className="discount-total">
                <span>Economia ({discount}%)</span>
                <strong>- {money(discountValue)}</strong>
              </div>
              <div className="grand-total">
                <span>Total estimado</span>
                <strong>{money(total)}</strong>
              </div>
            </div>
            <button className="reset-calculator" onClick={reset}>
              <RotateCcw size={15} /> Limpar calculadora
            </button>
          </aside>
        </div>
        <p className="calculator-footnote">
          <Calculator size={14} aria-hidden="true" /> Cálculo estimado para
          planejamento. Confira peso, unidade, promoções e preço final no caixa.
        </p>
      </div>
    </section>
  );
}
