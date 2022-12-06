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
    }
}