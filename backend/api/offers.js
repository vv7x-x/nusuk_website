const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../offers.json');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    if (!fs.existsSync(file)) return res.json({});
    return res.json(JSON.parse(fs.readFileSync(file, 'utf-8')));
  }
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      fs.writeFileSync(file, body);
      res.json({ success: true });
    });
    return;
  }
  res.status(405).end();
};
