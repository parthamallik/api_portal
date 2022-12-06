/*
 * Version		: 0.0.1
 * Description	: Load all configurations from environment variables
 *
 */

'use strict';
module.exports = {
    'env': process.env.ENV_TYPE || 'development',
    'port': 9001,
    'database': {
        'user': process.env.DB_USER || 'admin',
        'dbname': process.env.DB_SCHEMA || 'portal_db',
        'password': process.env.DB_PASSWORD || 'adminpass',
        'options': {
            'host': process.env.DB_HOST || 'localhost',
            'port': process.env.DB_PORT || '5432',
            'dialect': 'postgres',
            'define': {
                'timestamps': false
            },

            'pool': {
                'max': process.env.DB_POOL_MAX || 20,
                'min': process.env.DB_POOL_MIN || 1
            },
            'logging': false
        }
    },
    'redis': {
        'socket': {
            'host': process.env.REDIS_HOST || 'localhost',
            'port': process.env.REDIS_PORT || '6379'
        }
    },

    'getLogger': function (module) {
        var moduleName = module.replace(__dirname + '/', '');
        var pino = require('pino');
        return pino({
            'name': moduleName,
            'base': null,
            'level': process.env.LOG_LEVEL || 'debug',
            'transport': {
                target: 'pino-pretty',
                options: {
                    colorize: true
                }
            }
        });
    }
};