const express = require('express')
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const dotenv = require('dotenv').config();
const routes = require('./routes/router')
const config = require('./config/config')
const db = require('./config/db');
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc');
const ejs = require('ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

console.log(config.server.swaggerHostname,"rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrra")

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('../templates/index')
})

const swaggerDefinition = {
  info: {
    title: 'Test Development',
    version: '1.0.0',
    description: 'Backend APIs based on Node/Express',
  },
  host: config.server.swaggerHostname,
  basePath: '/',
};

const options = {
  swaggerDefinition: swaggerDefinition,
  explorer: true,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

var whitelist = config.whitelist.whitelist_url;

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/', routes)

db.on('connected', () => { console.log('successfully connected to db!'); })

app.listen(config.server.port, () =>{ console.log('port is running successfully');})



module.exports = app;