/*
 * Version		: 0.0.1
 * Description	: Handler for all Pet CRUD
 *
 */


'use strict';

const logger = __configurations.getLogger(__filename);
const model = require('../database/models').Gateway;
const Subdomain = require('../database/models').Subdomain;
const redis = require('../cache/redis');

module.exports = {
    'read': async (req, res, next) => {
        logger.debug(`Get Gateway(s) from Database for subdomain ${JSON.stringify(req.params)}`);
        let filter = {'where': {'subdomain_id': req.params.subdomain_id}};
        if (req.params.gateway_id) {

            // Use cache when retrive with id
            logger.debug(`Checking in cache gateway#${req.params.gateway_id}`);
            try {
                const data = await redis.get(`gateway#${req.params.gateway_id}`);
                if(data) {
                    // Found in cache
                    logger.debug(`Found in cache gateway#${req.params.gateway_id}`);
                    return res.status(200).json(JSON.parse(data));
                }
            } catch (err) {
                logger.error('Error while getting cache', err)
                // ignore cache failure
            }
            
            filter.where.id = req.params.gateway_id;
        }
        logger.debug(`Fetching gateway with id ${req.params.gateway_id} from database`);
        const data = await model.findAll(filter);
        res.status(200).json(data);
    },

    'create': async (req, res, next) => {
        logger.debug(`Create Gateway ${JSON.stringify(req.body)} for subdomain ${req.params.subdomain_id}`);
        try {
            const subdomain = await Subdomain.findAll({ 'where': { 'id': req.params.subdomain_id } });
            if(subdomain.length === 0) {
                logger.error(`Can not create Gateway. Subdomain with id ${req.params.subdomain_id} not found`);
                return res.status(404).json({message: `Subdomain with id ${req.params.subdomain_id} not found`});
            }
            const gateway = { ...req.body, subdomain_id: req.params.subdomain_id };
            delete gateway.id;
            const data = await model.create(gateway);
            //Send the response first
            res.status(200).json(data);
            // Then set the cache
            try {
                logger.debug(`Setting cache gateway#${data.id}`);
                await redis.setEx(`gateway#${data.id}`, 30, JSON.stringify(data));
            } catch(err) {
                logger.error('Error while setting cache', err)
                //ignore cache failure.
            }
        } catch(err) {
            logger.error('Error creating new gateway', err);
            res.status(500).json({message: 'Internal Server error'});
            //ignore cache failure.
        }
    }
}