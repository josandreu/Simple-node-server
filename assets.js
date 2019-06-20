const fs = require('fs');

module.exports = {
  // creamos una función que nos ayude a leer ficheros del sistema y además los muestre a través del navegador creando un servidor
  readAFile(response, filename, type) {
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
  },
  // OTRA FORMA, EN LUGAR DE UTILIZAR UNA ÚNICA FUNCIÓN, UTILIZAMOS readAFile2 + displayFile
  readAFile2(filename, callback) {
    fs.readFile(filename, function(err, data) {
      if (err) {
        return callback(err);
      }
      return callback(err, data);
    });
  },
  displayFile(response, err, data, type) {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/html' });
      return response.end('404 Not Found');
    }
    response.writeHead(200, { 'Content-type': type });
    return response.end(data);
  }
};
