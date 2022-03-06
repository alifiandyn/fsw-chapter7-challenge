const express = require("express");
const router = express.Router();
const { home, login, signup, logout, game, dashboard, loginValidation, createUser, viewProfileUser, updateProfileUser, deleteDataDashboard, viewStatisticUser, deleteStatisticUser, createUserGameHistory } = require("../controller");
const { isLoggedIn, isLoggedInAsAdmin } = require("../middleware/authMiddleware");

router.get("/", home);

router.get("/login", login);

router.post("/login", loginValidation);

router.get("/logout", logout);

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

module.exports = router;
