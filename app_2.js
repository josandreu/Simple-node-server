/* eslint-disable no-console */

const http = require('http');
const fs = require('fs');
const url = require('url');

// PARA VISUALIZAR en pantalla lo que escribamos dcomo parte de la ruta de la url: localhost:3000/escribeAlgo
const server = http
  .createServer(function(peticion, respuesta) {
    respuesta.writeHead(200, { 'Content-type': 'text/html' });
    respuesta.write(`Respuesta para la direccion: ${peticion.url}`);
    respuesta.end();
    console.log('Petición web');
  })
  .listen(8000);
