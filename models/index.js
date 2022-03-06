const Users = require("./user_game");
const UserGameHistory = require("./user_game_history");
const UserGameBiodata = require("./user_game_biodata");
const UserGameRoom = require("./user_game_room");
const User_History = require("./user_history");

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

//______________________________________________

Users.hasMany(UserGameRoom, {
  foreignKey: "owned_by",
  as: "room",
});

UserGameRoom.belongsTo(Users, {
  foreignKey: "owned_by",
  as: "owner",
});

// hubungan antara user dan room sebagai player 1
UserGameRoom.belongsTo(Users, {
  foreignKey: "player_1_uuid",
  as: "player_1",
});
// hubungan antara user dan room sebagai player 2
UserGameRoom.belongsTo(Users, {
  foreignKey: "player_2_uuid",
  as: "player_2",
});
// hubungan antara user dan room sebagai pemenang di dalam room
UserGameRoom.belongsTo(Users, {
  foreignKey: "winner_uuid",
  as: "winner",
});
// hubungan antara user dan room sebagai yang kalah di dalam room
UserGameRoom.belongsTo(Users, {
  foreignKey: "loser_uuid",
  as: "loser",
});

Users.hasMany(UserGameRoom, {
  foreignKey: "player_1_uuid",
  as: "room_player_1_uuid",
});

Users.hasMany(UserGameRoom, {
  foreignKey: "player_2_uuid",
  as: "room_player_2_uuid",
});

Users.hasMany(UserGameRoom, {
  foreignKey: "winner_uuid",
  as: "winner_room",
});

Users.hasMany(UserGameRoom, {
  foreignKey: "loser_uuid",
  as: "loser_room",
});

Users.hasOne(User_History, {
  foreignKey: "user_uuid",
  as: "history",
});

User_History.belongsTo(Users, {
  foreignKey: "user_uuid",
  as: "user",
});

module.exports = { Users, UserGameHistory, UserGameBiodata, UserGameRoom, User_History };
