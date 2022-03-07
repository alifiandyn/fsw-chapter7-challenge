const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.locals.id = null;
        res.locals.user = null;
        res.locals.role_id = null;
        res.redirect("/signin?status=tokenexpied");
      } else {
        req.user = decodedToken; //Supaya decoded token  bisa dipake di controller
        // res.locals; buat variable jadi global
        res.locals.id = decodedToken.id;
        res.locals.user = decodedToken.username;
        res.locals.role_id = decodedToken.role_id;
        next();
      }
    });
  } else {
    res.locals.id = null;
    res.locals.user = null;
    res.locals.role_id = null;
    res.redirect("/signin?status=tokennotexist");
  }
};

const isLoggedInAsAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secret", (err, decodedToken) => {
      if (err) {
        res.redirect("/signin?status=tokenexpied");
      } else {
        if (decodedToken.role_id != 1) {
          res.redirect("/");
        } else {
          req.user = decodedToken; //Supaya decoded token  bisa dipake di controller
          res.locals.user = decodedToken.username;
          next();
        }
      }
    });
  } else {
    res.redirect("/signin?status=tokennotexist");
  }
};

module.exports = { isLoggedIn, isLoggedInAsAdmin };
