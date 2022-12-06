/*
 * Version		: 0.0.1
 * Description	: Handler for all Pet CRUD
 *
 */

'use strict';

const logger = __configurations.getLogger(__filename);
module.exports = {
    'setContext': async (req, res, next) => {
        // tenant_id , user_id will be set for all further uses.
        next();
    }
}