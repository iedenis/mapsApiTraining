import Mongoose from 'mongoose';
import logger from '../core/logger/app-logger'
import config from '../core/config/config.dev'

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
    let dbHost = config.dbHost;
    let dbPort = config.dbPort;
    let dbName = config.dbName;
    try {
        await Mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, { useMongoClient: true });
        logger.info(`MONGO: Connected to ${dbName}`);
    }
    catch (err) {
        logger.error('Could not connect to MongoDB');
        logger.info(err);
    }
}

export default connectToDb;