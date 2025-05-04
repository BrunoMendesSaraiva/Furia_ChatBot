# Bot da FURIA – Telegram

## Sobre o projeto

Este bot foi desenvolvido como parte de um **desafio técnico opcional** proposto durante o **processo seletivo para a vaga de Assistente de Engenharia de Software na FURIA Esports**.

O objetivo era criar uma **experiência conversacional envolvente** para os fãs da equipe de CS2 da organização, integrando dados, interatividade e identidade visual do time em um bot funcional para Telegram.

---

## Autor

**Bruno Mendes Bauso Diniz Saraiva**  
Estudante de Ciência da Computação – Barão de Mauá  
Contato: [brunombdsaraiva@gmail.com](mailto:brunombdsaraiva@gmail.com)  
LinkedIn: [linkedin.com/in/bruno-s-69941920a](https://www.linkedin.com/in/bruno-s-69941920a/)

---

## Licença 

Este projeto tem fins **educacionais e demonstrativos**, exclusivo para avaliação técnica no processo seletivo da FURIA.

---

## Funcionalidades

| Comando           | Descrição                                                                 |
|-------------------|---------------------------------------------------------------------------|
| `📊 Estatísticas` | Exibe estatísticas reais dos jogadores da FURIA (rating, K/D, ADR, etc.)  |
| `📅 Calendário`   | Mostra os próximos jogos da FURIA *(dados fictícios para apresentação)*   |
| `📰 Notícias`     | Exibe as últimas notícias reais da equipe                                 |
| `❓ Quiz`         | Apresenta perguntas com múltiplas escolhas sobre o time e o cenário competitivo |
| `🎉 Torcida`      | Envia uma mensagem personalizada de incentivo à equipe                    |

---

## Como rodar

### Pré-requisitos
- Node.js 18 ou superior
- Conta no Telegram com um bot criado via @BotFather
- Clonar este repositório

### Instalação

```bash
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` com a seguinte estrutura:

```
BOT_TOKEN=seu_token_aqui
```

### Executar o bot

```bash
npm start
```

### Outros scripts úteis

```bash
npm run scraper     # Atualiza estatísticas manualmente com Puppeteer
npm run dev         # Inicia o bot com recarregamento automático (nodemon)
```

---

## Estrutura do projeto

```
furia-telegram-bot/
│
├── commands/               # Comandos individuais do bot
│   ├── calendario.js
│   ├── estatisticas.js
│   ├── noticias.js
│   ├── quiz.js
│   └── torcida.js
│
├── data/                   # Dados locais simulando fontes dinâmicas
│   ├── calendario.json
│   ├── estatisticas.json
│   ├── noticias.json
│   └── quiz.json
│
├── scrapers/               # Script opcional para scraping (estatísticas HLTV)
│   └── atualizaEstatisticas.js
│
├── .env
├── index.js                # Ponto de entrada do bot
├── package.json
└── README.md
```

---

## Decisões Técnicas

- Inicialmente, tentei utilizar a **API não oficial da HLTV**, mas a instabilidade constante dificultava a integração.
- Optei então por fazer scraping com Puppeteer, mas o site utiliza **proteções anti-bot (Cloudflare)**, resultando em falhas e CAPTCHAs.
- Para garantir um bot estável e funcional durante o desafio, substituí dados dinâmicos por **arquivos locais JSON**, atualizados com informações reais ou fictícias.
- A estrutura do projeto foi dividida em módulos (`commands/`, `data/`, `scrapers/`) para facilitar manutenção e possíveis futuras integrações com APIs mais confiáveis, como a Liquipedia.

---

## Demonstração

Vídeo: *[https://drive.google.com/file/d/1RFLGC-_C-aSLhpQ5NAOqoH_G66VXiAGH/view?usp=sharing]*  
*(Demonstração com todos os comandos funcionando)*

---
