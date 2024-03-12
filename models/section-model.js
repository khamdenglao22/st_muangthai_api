const sequelize = require("../config")
const { DataTypes } = require("sequelize")
const ServiceCountry = require("./service-country-model")

const ServiceSection = sequelize.define("ServiceSection", {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    section_name_la:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    section_name_en:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    section_position: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
  
},{
    tableName:"service_section",
    timestamps:false
})

module.exports = ServiceSection;
