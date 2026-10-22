# ⚡ FlowSync — Landing Page SaaS

Landing page responsiva de um produto SaaS **fictício** de gestão e automação, criada como **projeto de aprendizagem em Front-End** com HTML, CSS e JavaScript puro.

> ℹ️ O FlowSync, os planos, os preços e as métricas são ilustrativos. O formulário de contato é apenas demonstrativo (não envia dados).

🔗 **Demonstração ao vivo:** [https://demboone-sudo.github.io/flowsync-saas/](https://demboone-sudo.github.io/flowsync-saas/)

![Pré-visualização do FlowSync](assets/preview.png)

---

## 🎯 Proposta

Simular a página de um produto voltado a dois públicos, **clientes finais (B2C)** e **empresas (B2B)**, para praticar:

- layout responsivo com Flexbox e Grid;
- interatividade com JavaScript (DOM, eventos e `localStorage`);
- organização de código e separação de responsabilidades;
- tema claro/escuro com variáveis CSS.

---

## ✨ Funcionalidades

| Recurso | Descrição |
|---|---|
| 🧮 **Calculadora de ROI** | Estima horas e economia anual a partir de horas manuais, tamanho da equipe e custo por hora, com formatação em R$ |
| 🌓 **Tema claro/escuro** | Alternância com a escolha salva no `localStorage` |
| 🏷️ **Filtro de soluções** | Filtra os cards por categoria (Todos, Clientes Finais, Empresas) sem recarregar a página |
| 💳 **Planos mensal/anual** | Alterna os preços exibidos, com 20% de desconto no plano anual |
| 🔔 **Notificações (toasts)** | Avisos temporizados para ações do usuário e envio do formulário |
| 📱 **Responsivo** | Layout adaptado a celular, tablet e desktop, com menu mobile |
| 💎 **Visual glassmorphism** | Transparência com `backdrop-filter`, brilhos em ciano/roxo e microinterações de hover |

### Sobre a fórmula do ROI

```
horas economizadas/ano = horas semanais × pessoas × 70% × 52 semanas
economia/ano           = horas economizadas × custo por hora
```

O fator de **70%** é uma **premissa fixa de simulação**, e não um resultado medido.

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura semântica da página |
| **CSS3** | Flexbox, Grid, variáveis CSS, transições e media queries |
| **JavaScript (ES6+)** | Manipulação do DOM, eventos, cálculos e persistência local |
| **[Phosphor Icons](https://phosphoricons.com/)** | Ícones vetoriais |

---

## 📁 Estrutura do projeto

```
flowsync-saas/
├── index.html        # Estrutura da página
├── style.css         # Estilos, temas (variáveis) e responsividade
├── calculator.js     # Lógica da calculadora de ROI
├── main.js           # Tema, menu mobile, filtros, preços, formulário e toasts
├── assets/
│   └── preview.png   # Captura de tela usada neste README
└── README.md
```

---

## 🚀 Como executar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/demboone-sudo/flowsync-saas.git

# 2. Entre na pasta
cd flowsync-saas
```

Depois, abra o `index.html` no navegador ou use a extensão **Live Server** do VS Code.

> Não há dependências para instalar. Os ícones são carregados por CDN, então é preciso conexão com a internet.

---

## 🧠 Aprendizados e desafios

- **Compatibilidade entre navegadores:** uso de `-webkit-background-clip` junto com `background-clip`, e de `appearance` junto com `-webkit-appearance`. Os sliders customizados exigiram seletores separados para WebKit (`::-webkit-slider-thumb`) e Firefox (`::-moz-range-thumb`).
- **Separação de responsabilidades:** a calculadora ficou em `calculator.js` e o comportamento geral em `main.js`, evitando código duplicado entre os dois.
- **Depuração de DOM:** correção de divergências entre `id` e `class` (como no container dos toasts) usando o Console do navegador.
- **Refatoração com teste:** ao remover código duplicado, a calculadora parou de funcionar por falta do `<script>` no HTML. Depois dessa experiência, passei a **testar cada funcionalidade no navegador** a cada refatoração.
- **Tema com variáveis CSS:** definição de cores em `:root` e sobrescrita em `body.light-theme`.

---

## 🚧 Limitações e próximos passos

- [ ] Formulário apenas demonstrativo (integrar a um serviço de envio, como Formspree)
- [ ] Melhorar a acessibilidade: `<main>`, `aria-expanded` no menu, `role="switch"` no seletor de preços, `aria-live` nos toasts e foco visível
- [ ] Revisar o contraste dos botões e do texto em ciano
- [ ] Completar o tema claro (rodapé, sliders e switch)
- [ ] Carregar a fonte Inter e fixar a versão dos ícones
- [ ] Migrar os scripts para ES Modules (`type="module"`)
- [ ] Rodar uma auditoria **Lighthouse** e registrar as notas aqui

---

## 👩‍💻 Autoria

Projeto desenvolvido por **Débora Maestrini** como prática dos fundamentos de Front-End.

- GitHub: [@demboone-sudo](https://github.com/demboone-sudo)