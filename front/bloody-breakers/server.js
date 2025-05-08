const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const DIST_FOLDER = path.join(__dirname, "dist/bloody-breakers"); // cambia esto si el nombre es diferente

app.use(express.static(DIST_FOLDER));
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_FOLDER, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
