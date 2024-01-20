const mongoose = require("mongoose");
const { createHashedPassword } = require("../utils/hashing");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
  refreshToken: {
    type: String,
  },
});

// presave for hashing password
userSchema.pre("save", async function (next) {
  const user = this;
  try {
    const hashedPassword = await createHashedPassword(user);
    user.password = hashedPassword;
    next();
  } catch (error) {
    console.log("error in hashing password", error);
  }
});

module.exports = mongoose.model("User", userSchema);
