import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';
import personRoutes from './routes/Rpeople';


const NAMESPACE = 'SERVER';
const router = express();

//Connect to MongoDB
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then(result => {
        logging.info(NAMESPACE, "Connected to MongoDB")

    })
    .catch(err => {
        logging.error(NAMESPACE, err.message, err)
    });

//Log request
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});

//Parse Request
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Define API rules
router.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*');//Allows request from any origin for testing, production API must have predefined IPs and routes
    res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method == 'OPTIONS'){
        res.header('Acess-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});

//Routes
router.use('/api', personRoutes);
//Error Handling
router.use((req, res, next) => {
    const err = new Error('not found');

    return res.status(404).json({
        message: err.message
    });
});

//Server Creation
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}: ${config.server.port}`));

