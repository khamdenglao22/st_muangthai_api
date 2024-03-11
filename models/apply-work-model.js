const sequelize = require("../config/index");
const { DataTypes } = require("sequelize");
const Work = require("./work-model");

const Apply_Work = sequelize.define(
  "Apply_Work",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    full_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    file_name: {
      type: DataTypes.STRING(150),
    },

    phone: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },

    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    work_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Work,
        key: "id",
      },
    },
  },
  {
    tableName: "apply-work",
    timestamps: false,
  }
);

Apply_Work.belongsTo(Work, { foreignKey: 'work_id', as: 'Work' });


module.exports = Apply_Work;
