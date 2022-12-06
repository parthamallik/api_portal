/*
 * Version		: 0.0.1
 * Description	: Middleware used for setting RBAC related stuffs in the request context
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