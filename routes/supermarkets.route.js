import express from "express";
import supermarketsController from "../controllers/supermarkets.controller";
import logger from "../core/logger/app-logger";
const router = express.Router();


router.get('/', (req, res) => {
    res.render('default');
})

router.get('/supermarkets', supermarketsController.getSupermarketsByLocation);
export default router;