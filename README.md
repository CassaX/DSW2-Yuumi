* **Matheus Henrique Cassatti** - 771050
* **Nathalia Brasilino Gimenes** - 812076
  
#  Yuumi - Site de Receitas


- Yuumi é um protótipo de um site de receitas, desenvolvido como projeto final para a disciplina de **Desenvolvimento Web 2**. O projeto foi desenhado no Figma e implementado utilizando HTML, Tailwind CSS e JavaScript, com foco na criação de uma interface limpa, moderna e responsiva.
- Nessa etapa, a aplicação utiliza a **Inteligência Artificial (IA)** do **Google Gemini** para gerar receitas detalhadas sob demanda.


## Arquitetura e Tecnologias
Inteligência Artificial (IA):
- Modelo: Google Gemini 
- Função: Geração de receitas sob demanda

Back-End (API):
- Tecnologia: Node.js
- Framework: Express.js
- Função: Servidor API que orquestra a comunicação com o Gemini

Front-End:
- Tecnologia: React 
- Roteamento: React Router DOM.

Estilização e Design:
- Framework: Tailwind CSS.
- Função: Criação de um design responsivo e moderno.

## Funcionalidades Principais

1.  **Geração de Receita por Busca Livre:** O usuário insere qualquer termo (ex: "Bolo de Chocolate Vegano") e a IA gera uma receita completa
2.  **Busca por Ingredientes:** O usuário lista os ingredientes que possui (ex: "Frango, batata, creme de leite") e a IA cria uma receita que utiliza **apenas** esses itens
3.  **Saída Estruturada (JSON):** Utiliza o recurso de *Structured Output* do Gemini, garantindo que a receita gerada pela IA retorne em um formato JSON previsível, facilitando a exibição no Front-End
4.  **Histórico Local:** As receitas geradas e os termos de busca recentes são armazenados no `LocalStorage` do navegador, permitindo ao usuário revisitar suas criações


## Detalhes da Implementação

* **Rotas de API:**
    * `POST /api/search`: Recebe um `query` para busca geral de receitas
    * `POST /api/ingredients`: Recebe uma lista de `ingredients` para gerar uma receita focada nesses insumos
* **Serviços Gemini:** A comunicação com o modelo é centralizada no `geminiService.js`, utilizando a biblioteca oficial do Google e configurando o `responseSchema` (schema de JSON) para garantir o formato correto das receitas

### Front-End (React/Tailwind)

* **Gerenciamento de Estado:** Utiliza o `useState` e *hooks* personalizados (`useLocalStorage`) para gerenciar a entrada de dados, o histórico de buscas e o armazenamento das receitas geradas
* **Componentização:** A interface é modularizada (`Header.jsx`, `Footer.jsx`, `Home.jsx`, `HistoricoReceitas.jsx`, etc.) para facilitar a manutenção e reutilização
* **Persistência:** O *hook* `useLocalStorage` é usado para salvar o histórico de buscas (`recentSearches`) e o histórico de receitas geradas (`generatedRecipesHistory`)



## Como Executar o Projeto

Para rodar o Yuumi, você precisará de um arquivo `.env` configurado e iniciar separadamente o Back-End e o Front-End.

### Pré-requisitos

1.  **Node.js** e **npm** instalados.
2.  Uma chave da API do **Google Gemini**.

### 1. Configuração do Back-End

1.  Navegue até a pasta **`BackEnd`**.
2.  Crie um arquivo chamado `.env` e insira sua chave da API:
    ```env
    GEMINI_API_KEY=SUA_CHAVE_AQUI
    ```
3.  Instale as dependências e inicie o servidor:
    ```bash
    npm install
    npm start 
    ```

### 2. Iniciando o Front-End

1.  Navegue até a pasta **`FrontEnd`**.
2.  Instale as dependências e inicie a aplicação React:
    ```bash
    npm install
    npm run dev 
    ```

