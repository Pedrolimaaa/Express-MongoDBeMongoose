// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao banco Mongo!'))
    .catch((err) => console.log(err));

// Importar rotas
const personRoutes = require('./routes/person.js');
app.use('/person', personRoutes);

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`);
});
