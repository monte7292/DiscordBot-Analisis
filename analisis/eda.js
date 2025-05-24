require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');
const Message = require('../models/Message');

const stopwords = ['de', 'la', 'el', 'y', 'a', 'en', 'que', 'es', 'un', 'una', 'por', 'con', 'para', 'no', 'los', 'las', 'lo', 'al', 'del'];

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('📦 Conectado a MongoDB');

  const mensajes = await Message.find();

  const totalMensajes = mensajes.length;
  const longitudes = mensajes.map(m => m.content.length);
  const promedioLongitud = longitudes.reduce((a, b) => a + b, 0) / totalMensajes;
  const mensajeMasLargo = mensajes.reduce((a, b) => a.content.length > b.content.length ? a : b);
  const mensajeMasCorto = mensajes.reduce((a, b) => a.content.length < b.content.length ? a : b);

  console.log('\n📊 Estadísticas de mensajes:');
  console.log(`- Total de mensajes: ${totalMensajes}`);
  console.log(`- Promedio de longitud: ${promedioLongitud.toFixed(2)} caracteres`);
  console.log(`- Mensaje más largo: "${mensajeMasLargo.content}" (${mensajeMasLargo.content.length} caracteres)`);
  console.log(`- Mensaje más corto: "${mensajeMasCorto.content}" (${mensajeMasCorto.content.length} caracteres)`);

  let palabras = [];

  for (const m of mensajes) {
    const textoLimpio = m.content
      .toLowerCase()
      .replace(/[^\w\sáéíóúñ]/gi, '')
      .split(/\s+/)
      .filter(p => p.length > 2 && !stopwords.includes(p));

    palabras = palabras.concat(textoLimpio);
  }

  const conteoPalabras = {};
  for (const palabra of palabras) {
    conteoPalabras[palabra] = (conteoPalabras[palabra] || 0) + 1;
  }

  const topPalabras = Object.entries(conteoPalabras)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  console.log('\n📌 Palabras más frecuentes:');
  topPalabras.forEach(([palabra, conteo], i) => {
    console.log(`${i + 1}. ${palabra} (${conteo} veces)`);
  });

  // 📁 Generar CSV
  const csvWriter = createObjectCsvWriter({
    path: 'resultados_eda.csv',
    header: [
      { id: 'clave', title: 'Clave' },
      { id: 'valor', title: 'Valor' }
    ]
  });

  const data = [
    { clave: 'Total de mensajes', valor: totalMensajes },
    { clave: 'Promedio de longitud', valor: promedioLongitud.toFixed(2) },
    { clave: 'Mensaje más largo', valor: mensajeMasLargo.content },
    { clave: 'Longitud mensaje más largo', valor: mensajeMasLargo.content.length },
    { clave: 'Mensaje más corto', valor: mensajeMasCorto.content },
    { clave: 'Longitud mensaje más corto', valor: mensajeMasCorto.content.length },
    ...topPalabras.map(([palabra, conteo], i) => ({
      clave: `Palabra frecuente #${i + 1}`,
      valor: `${palabra} (${conteo} veces)`
    }))
  ];

  await csvWriter.writeRecords(data);
  console.log('\n✅ Archivo "resultados_eda.csv" generado con éxito.');

  await mongoose.disconnect();
}

main();
