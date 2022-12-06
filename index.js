/*
 * Name			: index.js
 * Author		: Partha Mallik (mallik.partha@gmail.com)
 * Version		: 0.0.1
 * Description	: The http server to handle incoming requests
 *
 */

"use strict";

global.__configurations = require('./config.js');
global.ROUTE_DIR = __dirname + "/routes/api";
global.CONTROLLER_DIR = __dirname + "/controllers";

/*
 * Load the configurations and other
 * modules needed for setting up the express server
 */

const express = require ('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const debounce = require('debounce');
const timeout = require('connect-timeout');
const fs = require('fs');
const logger = __configurations.getLogger(__filename);
const server = express()
const BASE_PATH = '/apis/v1';
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api-spec.yaml');

server
    .use(cors()) // Enable CORS
    .use(timeout(10000)) // Do't want server to take more than 10 seconds to respond
    .use(bodyParser.json()) // Accepts json body max to 100 kb default
    .use(bodyParser.text()) // Accepts text body max to 100 kb default
    .use(bodyParser.urlencoded({
        'extended': true
    })); // Parse urlencoded body with qs library

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use(function (req, res, next) {
    if (req.originalUrl == "/echo") {
        res.status(200).send();
    } else if (req.originalUrl.includes("/api")) {
        logger.debug(`
--------------- Incoming API request ---------------
    Request method: ${req.method}
    Request path: ${req.originalUrl}
    Request body: ${JSON.stringify(req.body)}
----------------------------------------------------`);
        next();
    } else {
        next();
    }
});

const start = async () => {
    /*
    * Load all api routes
    * Keeping it sync to ensure all routes are loaded before the server starts listening.
    */
    fs.readdirSync(ROUTE_DIR).forEach(file => {
        const routeName = `${BASE_PATH}/${file.substring(0, file.length - 3)}`;
        const router = require(`${ROUTE_DIR}/${file}`);

        logger.debug(`Loading router ${ROUTE_DIR}/${file} for route ${routeName}`);
        server.use(routeName, router);
    });
    // Synchronise the DB tables
    require('./database/models').sequelize.sync({ alter: true });

    logger.info(`Connecting Redis... ${JSON.stringify(__configurations.redis)}`)
    await require('./cache/redis').connect();
    server.listen(__configurations.port, () => {
        logger.info(`Http server started in ${__configurations['env']} mode.`);
        logger.info(`Listening on ${__configurations.port}`);
    });
}

start();


