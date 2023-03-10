// Initialise les variables d'environnement
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const http = require('http');
const https = require('https');
const fs = require('fs');
const app = require('./app');

// Traite le port et vérifie sa conformité s'il vient d'une variable d'environnement
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// Si une variable d'environnement n'est pas spécifiée, c'est le port 3000 qui sera utilisé
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * capture les erreurs du serveur
 * @param {any} error
 */
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind =
        typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// démarrage du serveur

// Traite la configuration https et vérifie sa conformité si elle vient d'une variable d'environnement
const checkHttpsConfig = val => {
    switch (val.toUpperCase()) {
        case 'HTTPS':
            return true;
        case 'HTTP':
            return false;
        default:
            return false;
    }
};

// récupère la variable d'environnement
const isHttps = checkHttpsConfig(process.env.PROTOCOL || 'HTTP');

const options = isHttps
    ? {
          key: fs.readFileSync('selfsigned.key'),
          cert: fs.readFileSync('selfsigned.crt'),
      }
    : undefined;

const server = isHttps
    ? https.createServer(options, app)
    : http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind =
        typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);
