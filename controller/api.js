const { Users, UserGameHistory, UserGameBiodata, UserGameRoom, User_History } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const errorHandler = require("../utils/error");

const register = async (req, res, next) => {
  try {
    if (!req.body) {
      return errorHandler(400, "No data sent", res);
    } else {
      const { username, password, confirmPassword } = req.body;
      const userMatch = await Users.findAll({
        where: {
          username: username,
        },
      });
      if (userMatch.length > 0) {
        return errorHandler(400, "Username already exist", res);
      } else {
        if (password != confirmPassword) {
          return errorHandler(400, "Password doesn't match", res);
        } else {
          const salt = bcrypt.genSaltSync(16);
          const passwordHash = bcrypt.hashSync(password, salt);
          const id = uuidv4();
          const newUserGame = await Users.create({
            uuid: id,
            username,
            password: passwordHash,
          });
          const newUserGameBiodata = await UserGameBiodata.create({
            user_game_id: id,
          });
          res.status(201).json({
            status: "SUCCESS",
            message: "User created successfully",
            data: newUserGame,
          });
        }
      }
    }
  } catch (error) {
    console.log("===============================");
    console.log(error);
    console.log("===============================");
    return errorHandler(500, error.message, res);
  }
};

const loginValidation = async (req, res) => {
  try {
    if (!req.body) {
      return errorHandler(400, "No data sent", res);
    } else {
      const { username, password } = req.body;
      const userMatch = await Users.findAll({
        where: {
          username: username,
        },
      });
      if (userMatch.length == 0) {
        return errorHandler(404, "Username not found", res);
      } else {
        const passwordVerify = bcrypt.compareSync(password, userMatch[0].password);
        if (passwordVerify == true) {
          const token = jwt.sign(
            {
              id: userMatch[0].uuid,
              username: userMatch[0].username,
              role_id: userMatch[0].role_id,
            },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 * 24 } //satuan detik, bawaan jsonwebtoken
          );
          res.cookie("jwt", token, { maxAge: 1000 * 60 * 60 * 24 }); //satuan milisekon, bawaan cookie-parser
          res.status(200).json({
            status: "SUCCESS",
            message: "Login successfully as " + userMatch[0].username,
            role: userMatch[0].role_id == 1 ? "Super Admin" : "Player User",
            token: token,
          });
        } else {
          return errorHandler(400, "Wrong password", res);
        }
      }
    }
  } catch (error) {
    console.log("===============================");
    console.log(error);
    console.log("===============================");
    return errorHandler(500, error.message, res);
  }
};

const createRoom = async (req, res, next) => {
  try {
    const { roomName } = req.body;
    const user = req.user; // Ngambil data decodedToken JWT dari middleware
    if (!roomName) {
      return errorHandler(400, "Please Input Room Name", res);
    }
    const newRoom = await UserGameRoom.create({
      room_name: roomName,
      owned_by: user.id,
    });
    res.status(200).json({
      status: "SUCCESS",
      message: "New room created successfully",
      data: newRoom,
    });
  } catch (error) {
    console.log("===============================");
    console.log(error);
    console.log("===============================");
    return errorHandler(500, error.message, res);
  }
};

const playGame = async (req, res, next) => {
  try {
    const playerChoices = req.body.choices;
    const room = req.body.roomName;

    // if (!playerChoices) {
    //   return errorHandler(400, "Please Input Your Choice", res);
    // }
    // // check choices dari user bentuk datanya array atau bukan
    // if (!Array.isArray(playerChoices)) {
    //   return errorHandler(400, "Please Input Your Choice In Array", res);
    // }
    // // user harus milih 3 rock paper scissor dalam satu array
    // if (playerChoices.length != 3) {
    //   return errorHandler(400, "Please Input 3 Choice", res);
    // }
    // // kalau room nya gak di input error
    // if (!room) {
    //   return errorHandler(400, "Please Insert Room Name", res);
    // }

    const foundRoom = await UserGameRoom.findOne({
      where: {
        room_name: room.toLowerCase(),
      },
    });

    // if (!foundRoom) {
    //   return errorHandler(404, "ROOM NOT FOUND", res);
    // } else {
    //   // kalau player 1 slot nya masih kosong
    //   // maka player yang posting rps duluan jadi player 1
    //   if (!foundRoom.player_1_uuid) {
    //     await foundRoom.update({
    //       player_1_choices: playerChoices,
    //       player_1_uuid: req.user.id,
    //     });
    //   } else if (!foundRoom.player_2_uuid) {
    //     // karena player 1 udah diisi jadi player sekarang jadi player
    await foundRoom.update({
      player_2_choices: playerChoices,
      player_2_uuid: req.user.id,
    });
    //   } else {
    //     return errorHandler(400, "Room is already full", res);
    //   }
    // }
    // check apakah seluruh player sudah milih rps
    if (foundRoom.player_1_choices && foundRoom.player_2_choices) {
      // user history
      const user1History = await User_History.create({
        user_uuid: foundRoom.player_1_uuid,
      });
      const user2History = await User_History.create({
        user_uuid: foundRoom.player_2_uuid,
      });

      console.log(foundRoom.player_1_uuid);
      console.log(foundRoom.player_2_uuid);
      // score awal player
      let player1Score = 0;
      let player2Score = 0;

      for (const index in foundRoom.player_1_choices) {
        // pilihan player 1 pada saat looping ke n
        const player1Choice = foundRoom.player_1_choices[index];
        const player2Choice = foundRoom.player_2_choices[index];

        // concat / gabungkan string dari pilihan kedua player contoh ROCKROCK, PAPERSCISSOR
        const playersChoice = `${player1Choice}${player2Choice}`;

        switch (playersChoice) {
          case "ROCKROCK":
            player1Score += 1;
            player2Score += 1;
            break;
          case "ROCKPAPER":
            player2Score += 1;
            break;
          case "ROCKSCISSOR":
            player1Score += 1;
            break;
          case "PAPERROCK":
            player1Score += 1;
            break;
          case "PAPERPAPER":
            player1Score += 1;
            player2Score += 1;
            break;
          case "PAPERSCISSOR":
            player2Score += 1;
            break;
          case "SCISSORROCK":
            player2Score += 1;
            break;
          case "SCISSORPAPER":
            player1Score += 1;
            break;
          case "SCISSORSCISSOR":
            player1Score += 1;
            player2Score += 1;
            break;
          default:
            break;
        }
      }

      // check kondisi kemenangan berdasarkan score
      if (player1Score > player2Score) {
        // player 1 win
        // update history player satu tambah nilai win nya 1
        await user1History.update({
          win: Number(user1History.win) + 1,
        });
        // update history player 2 tambah nilai lose nya 1
        await user2History.update({
          lose: Number(user2History.lose) + 1,
        });
        // update hasil pertandingan ke room
        await foundRoom.update({
          winner_uuid: foundRoom.player_1_uuid,
          loser_uuid: foundRoom.player_2_uuid,
          draw: false,
        });
        res.status(200).json({
          message: "PLAYER 1 WIN",
        });
      } else if (player2Score > player1Score) {
        await user1History.update({
          lose: Number(user1History.lose) + 1,
        });
        await user2History.update({
          win: Number(user2History.win) + 1,
        });
        await foundRoom.update({
          winner_uuid: foundRoom.player_2_uuid,
          loser_uuid: foundRoom.player_1_uuid,
          draw: false,
        });
        res.status(200).json({
          message: "PLAYER 2 WIN",
        });
      } else {
        await user1History.update({
          draw: Number(user1History.draw) + 1,
        });
        await user2History.update({
          draw: Number(user2History.draw) + 1,
        });
        await foundRoom.update({
          draw: true,
        });
        res.status(200).json({
          message: "DRAW",
        });
      }
      // jika hanya baru satu player yang milih
    } else {
      res.status(200).json({
        message: "Your Choices Recorded, Wait For Player 2 To Choose",
      });
    }
  } catch (error) {
    console.log("===============================");
    console.log(error);
    console.log("===============================");
    return errorHandler(500, error.message, res);
  }
};

module.exports = { register, loginValidation, createRoom, playGame };
