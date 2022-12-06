const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Policy = sequelize.define('Policy', {
        'id': {
            'type': DataTypes.INTEGER,
            'primaryKey': true,
            'autoIncrement': true
        },
        'name': DataTypes.TEXT,
        'description': DataTypes.TEXT,
        'gateway_id': DataTypes.INTEGER,
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
        'tableName': 'policies'
    })
    return Policy;
};