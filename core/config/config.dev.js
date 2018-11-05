import path from "path";

let config = {};

config.logFileDir = path.join(__dirname, '../../log');
config.logFileName = 'app.log';
config.dbHost = process.env.dbHost || 'admin:admin@ds111258.mlab.com';
config.dbPort = process.env.dbPort || '11258';
config.dbName = process.env.dbName || 'cars';
config.serverPort = process.env.serverPort || 3000;

export default config;