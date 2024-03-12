module.exports = {
  HOST: "localhost",
  //   HOST: "19.168.1.22",
  USER: "root",
  PASSWORD: "cc47f135-1d92-45fb-9fc3-09d5afb2b0d7",
  DB: "st_insurance",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
