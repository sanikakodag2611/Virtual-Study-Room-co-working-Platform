const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,   // ✅ ADD THIS
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
});

module.exports = mongoose.model("User", userSchema);