/*
 * Version		: 0.0.1
 * Description	: Handler for all Subdomains
 *
 */


'use strict';

const logger = __configurations.getLogger(__filename);
const model = require('../database/models').Subdomain;
const redis = require('../cache/redis');

module.exports = {
    'read': async (req, res, next) => {
        let filter = {};
        if (req.params.subdomain_id) {
            // Use cache when retrive with id
            logger.debug(`Checking in cache subdomain#${req.params.subdomain_id}`);
            try {
                const data = await redis.get(`subdomain#${req.params.subdomain_id}`);
                if (data) {
                    // Found in cache
                    logger.debug(`Found in cache subdomain#${req.params.subdomain_id}`);
                    return res.status(200).json(JSON.parse(data));
                }
            } catch (err) {
                logger.error('Error while getting cache', err)
                // ignore cache failure
            }
            filter.where = {};
            filter.where.id = req.params.subdomain_id;
        }
        logger.debug(`Get Subdomain(s) from Database ${JSON.stringify(req.params)}`);
        const data = await model.findAll(filter);
        if (data.length === 0) res.status(404).json({message: 'Not found'});
        else res.status(200).json(data);
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