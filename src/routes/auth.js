const router = require("express").Router();

/* Controllers */
const signup = require("../controllers/auth/signup");
const login = require("../controllers/auth/login");
const logout = require("../controllers/auth/logout");
const changePassword = require("../controllers/auth/changePassword");

/* Middlewares */
const {
  userValidation,
  loginValidation,
} = require("../middlewares/authValidation");
const isAuthenticated = require("../middlewares/isAuthenticated");

/* Routes */
router.post("/signup", userValidation, signup);
router.get("/login", loginValidation, login);
router.get("/logout", isAuthenticated, logout);
router.put("/change_password", isAuthenticated, changePassword);

module.exports = router;
