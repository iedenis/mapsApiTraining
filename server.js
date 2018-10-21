import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from './core/logger/app-logger'
import morgan from 'morgan'
import config from './core/config/config.dev'
import router from './routes/supermarkets.route'
import connectToDb from './db/connect'
import path from 'path'
import request from 'request'


const port = config.serverPort;
logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};

connectToDb();

const app = express();
app.engine('html', require('ejs').renderFile);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, './views')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev", { "stream": logger.stream }));

/*request(request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
}))
*/

app.use('/', router);


app.listen(port, () => {
    logger.info('server started - ', port);
});