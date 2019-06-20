/* eslint-disable no-console */

const http = require('http');
const fs = require('fs');
const url = require('url');

// PARA VISUALIZAR un archivo en el navegador, indicandolo como ruta: localhost:3000/archivo.html
const server = http
  .createServer(function(request, response) {
    const uri = url.parse(request.url, true);
    const filename = `.${uri.pathname}`;
    console.log(`Request url: ${request.url}`);
    fs.readFile(filename, function(err, data) {
      if (err) {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        return response.end('404 Not Found');
      }
      response.writeHead(200, { 'Content-type': 'text/html' });
      response.write(data);
      return response.end();
    });
  })
  .listen(8000);
