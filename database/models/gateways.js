
const { Sequelize, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const Gateway = sequelize.define('Gateway', {
        'id': {
            'type': DataTypes.INTEGER,
            'primaryKey': true,
            'autoIncrement': true
        },
        'name': DataTypes.TEXT,
        'url': DataTypes.TEXT,
        'subdomain_id': DataTypes.INTEGER,
        'createdby': {
            'type': DataTypes.TEXT,
            'defaultValue': 'admin'
        },
        'modifiedby': {
            'type': DataTypes.TEXT,
            'defaultValue': 'admin'
        },
        'createdat': {
            'type': DataTypes.DATE,
            'defaultValue': Sequelize.literal('current_timestamp')
        },
        'modifiedat': {
            'type': DataTypes.DATE,
            'defaultValue': Sequelize.literal('current_timestamp')
        }
    }, {
        'tableName': 'gateways'
    })
    return Gateway;
};