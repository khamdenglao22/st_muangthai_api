const sequelize = require("../config/index")
const { DataTypes } = require('sequelize')

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },  
    role_name_la: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role_name_en: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
}, {
    tableName: "role",
    timestamps: false
});


module.exports = Role