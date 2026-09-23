const fs = require('fs');
const path = require('path');

const CONFIG = {
  host: 'misharev.com',
  key: '9d9b310cf4fb47128617740b2840fb03',
  sitemapPath: path.join(__dirname, '../public/sitemap-0.xml'),
  apiEndpoint: 'https://api.indexnow.org/indexnow',
};

async function run() {
  if (!fs.existsSync(CONFIG.sitemapPath)) {
    console.error('Sitemap not found!');
    return;
  }

  const xml = fs.readFileSync(CONFIG.sitemapPath, 'utf8');
  const urls = [...xml.matchAll(/(https?:\/\/[^\s<]+)<\/loc>/g)].map(m => m[1]);

  if (urls.length === 0) return;

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);

  const res = await fetch(CONFIG.apiEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: CONFIG.host,
      key: CONFIG.key,
      keyLocation: `https://\({CONFIG.host}/\){CONFIG.key}.txt`,
      urlList: urls,
    }),
  });

  if (res.ok || res.status === 202) {
    console.log('✅ IndexNow submission successful!');
  } else {
    console.error(`❌ Error ${res.status}:`, await res.text());
  }
}

run();