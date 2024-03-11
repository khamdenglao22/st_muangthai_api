const sequelize = require("../config/index")
const { DataTypes } = require('sequelize')


const News_Activity = sequelize.define('News_Activity', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    title_la: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    title_en: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description_la: {
        type:DataTypes.TEXT
    },
    description_en: {
        type:DataTypes.TEXT
    },
    to_date: {
        type: DataTypes.DATEONLY
    },
    end_date: {
        type: DataTypes.DATEONLY
    },
    image: {
        type: DataTypes.STRING(100)
    },
    news_video:{
        type: DataTypes.STRING(150)
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    tableName: "news-activity",
    timestamps: false
});


module.exports = News_Activity