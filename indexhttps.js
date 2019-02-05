var express = require('express');
var https = require('https');
var http = require('http');
var app = express();
fs = require('fs');
const path = require('path')

const PORT_HTTP = process.env.PORT_HTTP || 3001
const PORT_HTTPS = process.env.PORT_HTTPS || 443

const options = {
  pfx: fs.readFileSync('cert.pfx'),
  passphrase: 'zeta@123'
};




app
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.render('index'.html))

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

httpServer.listen(PORT_HTTP, () => console.log(`Listening on ${ PORT_HTTP }`));
httpsServer.listen(PORT_HTTPS, () => console.log(`Listening on ${ PORT_HTTPS }`))

