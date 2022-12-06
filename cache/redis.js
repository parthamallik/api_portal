const redis = require('redis');
const logger = __configurations.getLogger(__filename);
const client = redis.createClient(__configurations.redis);

client.on('error', (err) => logger.error(`Redis Client Error ${err}`));

module.exports = client



