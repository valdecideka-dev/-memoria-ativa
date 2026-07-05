// API endpoint to summarize memories

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { memorias } = req.body;

    if (!memorias || !Array.isArray(memorias)) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Summarize memories logic
    const resumo = memorias.map(m => m.title).join(', ');

    res.status(200).json({
      sucesso: true,
      resumo: resumo,
      total: memorias.length
    });
  } catch (error) {
    console.error('Erro ao resumir:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
