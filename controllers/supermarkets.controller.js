import Supermarket from '../models/supermarkets.model'
import logger from '../core/logger/app-logger'

const controller = {};


controller.getSupermarketsByLocation = async (req, res) => {
    const location = req.query;
    const supermarkets = await Supermarket.getSupermarketsByDistance(location.lat, location.lng, 50);
    res.render('supermarkets', { supermarkets });
}

controller.getAll = async (req, res) => {
    try {
        const Supermarkets = await Supermarket.getAll();
        logger.info('sending all Supermarkets...');
        res.send(Supermarkets);
    }
    catch (err) {
        logger.error('Error in getting Supermarkets- ' + err);
        res.send('Got error in getAll');
    }
}

controller.addSupermarket = async (req, res) => {
    let SupermarketToAdd = Supermarket({
        name: req.body.name
    });
    try {
        const savedSupermarket = await Supermarket.addSupermarket(SupermarketToAdd);
        logger.info('Adding Supermarket...');
        res.send('added: ' + savedSupermarket);
    }
    catch (err) {
        logger.error('Error in getting Supermarkets- ' + err);
        res.send('Got error in getAll');
    }
}

controller.deleteSupermarket = async (req, res) => {
    let SupermarketName = req.body.name;
    try {
        const removedSupermarket = await Supermarket.removeSupermarket(SupermarketName);
        logger.info('Deleted Supermarket- ' + removedSupermarket);
        res.send('Supermarket successfully deleted');
    }
    catch (err) {
        logger.error('Failed to delete Supermarket- ' + err);
        res.send('Delete failed..!');
    }
}

export default controller;