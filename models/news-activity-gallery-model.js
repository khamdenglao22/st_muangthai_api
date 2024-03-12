const sequelize = require("../config/index");
const { DataTypes } = require("sequelize");
const News_Activity = require("./news-activity-model");

const News_Activity_Gallery = sequelize.define(
  "News_Activity_Gallery",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING(100),
    },
    news_id: {
      type: DataTypes.INTEGER(10),
      references: {
        model: News_Activity,
        key: "id",
      },
    },
  },
  {
    tableName: "news_activity_gallery",
    timestamps: false,
  }
);

News_Activity.hasMany(News_Activity_Gallery, { foreignKey: 'news_id', as: 'gallery' });


module.exports = News_Activity_Gallery;
