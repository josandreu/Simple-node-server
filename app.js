/* eslint-disable no-console */
// ejecutar: node app.js
// node --inspect app.js
const http = require('http');
const fs = require('fs');
const url = require('url');

// creamos una función que nos ayude a leer ficheros del sistema y además los muestre a través del navegador creando un servidor
const readAFile = function(response, filename, type) {
  // leemos el fichero que nos pasen como parametro
  fs.readFile(filename, function(err, data) {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/html' });
      return response.end('404 Not Found'); // return necesario para que no siga ejecutando el resto del código
    }
    // indicamos el tipo de dato que vamos a devolver
    response.writeHead(200, { 'Content-type': type });
    // escribimos la respuesta
    response.write(data);
    // finalizamos la escucha por parte del servidor, para que la página no quede constantemente cargando a la espera
    return response.end();
  });
};

// OTRA FORMA, EN LUGAR DE UTILIZAR UNA ÚNICA FUNCIÓN, UTILIZAMOS readAFile2 + displayFile
const readAFile2 = function(filename, callback) {
  fs.readFile(filename, function(err, data) {
    if (err) {
      return callback(err);
    }
    return callback(err, data);
  });
};

const displayFile = function(response, err, data, type) {
  if (err) {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    return response.end('404 Not Found');
  }
  response.writeHead(200, { 'Content-type': type });
  return response.end(data);
};

// creamos el server
const server = http.createServer(function(request, response) {
  console.log(request.url);
  // hacemos un switch para, dependiendo de lo escrito en la url del browser cargue un determinado archivo html o css si se requiere
  switch (request.url) {
    // localhost:3000
    case '/':
      readAFile2('./index.html', function(err, data) {
        displayFile(response, err, data, 'text/html');
      });
      break;
    // cargará el archivo css, a petición de la página que lo necesite
    case '/main.css': // para que cargue el css
      readAFile(response, './main.css', 'text/css');
      break;
    // localhost:3000/winter.html
    case '/winter.html':
      readAFile(response, './winter.html', 'text/html');
      break;
    // localhost:3000/summer.html
    case '/summer.html':
      readAFile(response, './summer.html', 'text/html');
      break;
    default:
      response.statusCode = 404;
      response.end('404 Not Found');
      break;
  }
});

server.listen(3000, function() {
  console.log('Servidor iniciado');
});

console.log('Ejecutando server');
