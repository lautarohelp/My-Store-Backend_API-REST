const express = require('express');
const cors = require("cors");
const routerApi = require('./rutes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlerware/error.handler');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'httpa://myapp.com'];
const options = { //asi funciona la libreria de cors
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options)); //de esta maner podemos dejar que se conencten de cualquier dominio que aga peticiones a mi api si es que qieres que sea publica



app.get('/', (req, res) => {
  res.send('hola mi server')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('hola nueva ruta')
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('mi port' + port);
} )

