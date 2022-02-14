const Users = require("./user_game");
const UserGameHistory = require("./user_game_history");
const UserGameBiodata = require("./user_game_biodata");

Users.hasMany(UserGameHistory, {
  foreignKey: "user_game_id",
  as: "user_game_history",
});

UserGameHistory.belongsTo(Users, {
  foreignKey: "user_game_id",
  as: "user_game",
});

Users.hasOne(UserGameBiodata, {
  foreignKey: "user_game_id",
  as: "user_game_biodata",
});

UserGameBiodata.belongsTo(Users, {
  foreignKey: "user_game_id",
  as: "user_game",
});

module.exports = { Users, UserGameHistory, UserGameBiodata };
