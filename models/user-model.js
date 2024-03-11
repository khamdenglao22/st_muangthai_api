const sequelize = require("../config/index")
const { DataTypes } = require('sequelize');
const Role = require("./role-model");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },  
    fullname_en: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fullname_la: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: "id"
        }
    },
}, {
    tableName: "user",
    timestamps: false
});

User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

module.exports = User