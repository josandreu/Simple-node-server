/* eslint-disable no-console */
// ejecutar: node app.js
// node --inspect app.js
const http = require('http');
const url = require('url');
const assets = require('./assets'); // importamos el archivo con las funciones

// creamos el server
const server = http.createServer((request, response) => {
  console.log(request.url);
  // hacemos un switch para, dependiendo de lo escrito en la url del browser cargue un determinado archivo html o css si se requiere
  switch (request.url) {
    // localhost:3000
    case '/':
      assets.readAFile2('./index.html', (err, data) => {
        assets.displayFile(response, err, data, 'text/html');
      });
      break;
    // cargará el archivo css, a petición de la página que lo necesite
    case '/main.css': // para que cargue el css
      assets.readAFile(response, './main.css', 'text/css');
      break;
    // localhost:3000/winter.html
    case '/winter.html':
      assets.readAFile(response, './winter.html', 'text/html');
      break;
    // localhost:3000/summer.html
    case '/summer.html':
      assets.readAFile(response, './summer.html', 'text/html');
      break;
    default:
      response.statusCode = 404;
      response.end('404 Not Found');
      break;
  }
});

server.listen(3000, () => {
  console.log('Servidor iniciado');
});

console.log('Ejecutando server');
