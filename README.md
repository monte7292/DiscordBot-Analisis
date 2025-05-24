# 📊 Análisis de Sentimiento en Discord con Node.js

Este proyecto permite recopilar y analizar mensajes de un servidor de Discord usando un bot programado en Node.js. El bot guarda los mensajes en una base de datos MongoDB y luego ejecuta un análisis de sentimiento para identificar si los mensajes son positivos, negativos o neutrales.

> Proyecto desarrollado como actividad educativa para análisis de datos en redes sociales.

---

## 🧠 Objetivo del Proyecto

Analizar la actividad de un servidor Discord para detectar patrones y clasificar el sentimiento en los mensajes.

---

## ⚙️ Requisitos Previos

Antes de empezar, asegúrate de tener:

- **Node.js** instalado (versión 16 o superior recomendada). Descárgalo en https://nodejs.org/
- **MongoDB** (puede ser local o en la nube, por ejemplo, [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Un **bot de Discord** creado con su token. Guía rápida: https://discord.com/developers/applications
- Un servidor de Discord donde puedas invitar el bot para probarlo.

---

## 🚀 Instalación paso a paso

### 1. Clonar el repositorio

Abre una terminal o consola y ejecuta:

```bash
git clone https://github.com/monte7292/DiscordBot-Analisis
cd discord-analisis
npm install
Crea un fichero .evn con el token de tu bot y la url de tu base de datos.
# Por ultimo ejecuta el bot
node index.js

```

### 2. Como ejecutar el bot
