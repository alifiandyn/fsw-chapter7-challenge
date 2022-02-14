const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("fsw_chapter6_challenge", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
});

module.exports = sequelize;

// Untuk cek koneksi database
// const connect = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// module.exports = connect;
