// const express = require("express");
// const passport = require("passport");    

// const { registerUser, loginUser } = require("../controllers/authController");

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// router.get("/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get("/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     res.redirect("http://localhost:5173/dashboard");
//   }
// );

// module.exports = router;

const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });
  res.json({ message: "User registered successfully" });
});

// Current user
router.get("/me", (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not logged in" });
  res.json(req.user);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});

// Google Auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
  }
);

module.exports = router;