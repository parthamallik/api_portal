/*
 * Version		: 0.0.1
 * Description	: Handler for all Pet CRUD
 *
 */


'use strict';

const logger = __configurations.getLogger(__filename);
const model = require('../database/models').Subdomain;
module.exports = {
    'read': async (req, res, next) => {
        logger.debug(`Get Subdomain(s) from Database ${JSON.stringify(req.params)}`);
        const filter = req.params.subdomain_id ? { 'where': { 'id': req.params.subdomain_id } } : {};
        const data = await model.findAll(filter);
        res.status(200).json(data);
    },
    'create': async (req, res, next) => {
        logger.debug(`Create Subdomain ${JSON.stringify(req.body)}`);
        try {
            const subdomain = { ...req.body};
            delete subdomain.id;
            const data = await model.create(subdomain);
            //Send the response first
            res.status(200).json(data);
            // Then set the cache
            try {
                logger.debug(`Setting cache subdomain#${data.id}`);
                await redis.setEx(`subdomain#${data.id}`, 30, JSON.stringify(data));
            } catch(err) {
                logger.error(`Error while setting cache ${err}`)
                //ignore cache failure.
            }
        } catch(err) {
            logger.error('Error creating new subdomain', err);
            res.status(500).json({message: 'Internal Server error'});
            //ignore cache failure.
        }
    }
}