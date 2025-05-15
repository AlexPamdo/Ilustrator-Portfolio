// build.js
const fs   = require('fs');
const path = require('path');

// Ajusta esta ruta a la carpeta donde guardas tus dibujos
const imgFolder = path.join(__dirname, 'Assets/img/portfolio');

const files = fs.readdirSync(imgFolder)
  .filter(f => /\.(jpe?g|png|gif|webp)$/i.test(f))
  .map(f => `Assets/img/portfolio/${f}`);

// Escribe images.json en la raíz
fs.writeFileSync(
  path.join(__dirname, 'images.json'),
  JSON.stringify(files, null, 2)
);

console.log(`✅ images.json creado con ${files.length} imágenes`);
