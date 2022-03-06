const { Router } = require("express");
const express = require("express");
const router = express.Router();
const { home, signin, signup, signout, game, dashboard, signinValidation, createUser, viewProfileUser, updateProfileUser, deleteDataDashboard, viewStatisticUser, deleteStatisticUser, createUserGameHistory } = require("../controller");
const { register, loginValidation, createRoom, playGame } = require("../controller/api");
const { isLoggedIn, isLoggedInAsAdmin } = require("../middleware/authMiddleware");

// For Model View Control (MVC) Only
router.get("/", home);
router.get("/signin", signin);
router.post("/signin", signinValidation);
router.get("/signout", signout);
router.get("/signup", signup);
router.post("/signup", createUser);
router.get("/profile/:id", isLoggedIn, viewProfileUser);
router.post("/profile/:id", isLoggedIn, updateProfileUser);
router.get("/game", isLoggedIn, game);
router.get("/dashboard", isLoggedInAsAdmin, dashboard);
router.get("/dashboardDelete/:id", isLoggedInAsAdmin, deleteDataDashboard);
router.get("/statistic/:id", isLoggedInAsAdmin, viewStatisticUser);
router.get("/statisticDelete/:id", isLoggedInAsAdmin, deleteStatisticUser);
router.post("/api/user_game_history", createUserGameHistory);
// End For Model View Control (MVC)

// For Model Control Router Only
router.post("/register", register); //API to create user
router.post("/login", loginValidation); //API to process login
router.post("/create-room", isLoggedIn, createRoom); //API to create room
router.post("/fight", isLoggedIn, playGame); //API to play game
// End For Model Control Router Only

module.exports = router;
