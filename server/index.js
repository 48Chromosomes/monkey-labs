const http = require('http');
const fs = require('fs');

require('./messanger');

fs.readFile('./server/dice.html', (error, html) => {
  http
    .createServer((req, res) => {
      res.writeHeader(200, { 'content-type': 'text/html' });
      res.write(html);
      res.end();
    })
    .listen(4444);
});
