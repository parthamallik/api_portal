
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Subdomain = sequelize.define('Subdomain', {
        'id': {
            'type': DataTypes.INTEGER,
            'primaryKey': true,
            'autoIncrement': true
        },
        'name': DataTypes.TEXT,
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
        'tableName': 'subdomains'
    })
    return Subdomain;
};