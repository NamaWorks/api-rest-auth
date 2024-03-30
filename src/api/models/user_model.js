const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({

  email: { type: String, trim: true, required: true, unique: true },
  username: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true },
  bornYear: { type: Number, trim: true, required: true },
  role: { type: String, trim: true, required: true, default: "user", enum: ["user", "admin"] },
  profileImage: { type: String, trim: true, required: true }

}, {

  timestamps: true,
  collection: "users",

})

userSchema.pre("save", function() {
  this.password = bcrypt.hashSync(this.password, 10)
})

const User = mongoose.model("users", userSchema, "users")

module.exports = User