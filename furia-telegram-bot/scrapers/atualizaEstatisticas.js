/*
Explicação:

Inicialmente, a minha ideia era utilizar a API não oficial da HLTV para alimentar o bot com dados dinâmicos de jogos e estatísticas.
No entanto, durante os testes, percebi que essa API era bastante instável — muitas vezes não retornava os dados corretamente ou ficava fora do ar.

Diante disso, decidi tentar uma abordagem diferente: usar um scraper com Puppeteer para coletar diretamente as informações do site HLTV.org.
Essa solução permitiria acessar os dados mais atualizados possível, sem depender da API.

Porém, no processo de desenvolvimento, enfrentei novos desafios:
o HLTV.org utiliza proteções de segurança (como Cloudflare) que detectam automações, bloqueando o acesso e exibindo CAPTCHAs.
Isso tornava o scraping instável e inviável para o objetivo do projeto.

Para garantir estabilidade e uma boa experiência de uso, optei por substituir o scraping por arquivos locais (JSON),
preenchidos com dados reais e atualizados manualmente. 
Dessa forma, o bot continua funcionando de forma fluida e confiável, sem depender de fontes externas que possam comprometer a apresentação.
*/

/*
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

 console.log("Iniciando coleta de estatísticas da HLTV...");

 const jogadores = [
  { nome: 'FalleN', url: 'https://www.hltv.org/stats/players/2023/fallen' },
  { nome: 'yuurih', url: 'https://www.hltv.org/stats/players/12553/yuurih' },
  { nome: 'KSCERATO', url: 'https://www.hltv.org/stats/players/15631/kscerato' },
  { nome: 'molodoy', url: 'https://www.hltv.org/stats/players/24144/molodoy' },
  { nome: 'YEKINDAR', url: 'https://www.hltv.org/stats/players/13915/yekindar' }
 ];

(async () => {
const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();
const estatisticas = [];

for (const jogador of jogadores) {
 console.log(`Coletando dados de ${jogador.nome}...`);
  await page.goto(jogador.url, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.summaryStatBreakdown', { timeout: 10000 });

     const dados = await page.evaluate(() => {
       const getValue = (label) => {
         const row = Array.from(document.querySelectorAll('.summaryStatBreakdown .summaryStat'))
           .find(el => el.innerText.includes(label));
         return row ? row.querySelector('.summaryStat__value')?.innerText.trim() : 'N/A';
       };

       const rating = getValue("Rating 2.0");
       const dpr = parseFloat(getValue("Deaths / round")) || null;
       const kpr = parseFloat(getValue("Kills / round")) || null;
       const kast = getValue("KAST");
       const impact = getValue("Impact");
       const adr = getValue("ADR");
       const kd = (kpr && dpr) ? (kpr / dpr).toFixed(2) : 'N/A';

       return { rating, dpr, kpr, kast, impact, adr, kd };
     });

     estatisticas.push({
       nome: jogador.nome,
       rating: dados.rating,
       kd: dados.kd,
       dpr: dados.dpr,
       kpr: dados.kpr,
       kast: dados.kast,
       impact: dados.impact,
       adr: dados.adr
     });
     console.log(`${jogador.nome} coletado com sucesso.`);
   }

   await browser.close();

   const outputPath = path.join(__dirname, '..', 'data', 'estatisticas.json');
   fs.mkdirSync(path.dirname(outputPath), { recursive: true });
   fs.writeFileSync(outputPath, JSON.stringify(estatisticas, null, 2));
   console.log(`Dados salvos em: ${outputPath}`);
 })();
*/
