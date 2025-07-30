// خادم بسيط للفرونت اند باستخدام Express
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.FRONT_PORT || 5500;

app.use(express.static(path.join(__dirname)));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend server running at http://localhost:${PORT}`);
});
