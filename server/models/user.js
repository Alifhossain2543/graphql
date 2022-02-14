const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")
const validator = require("validator")

const userSchema = new Schema(
  {
      email: {
      type: String,
      unique: [true, "User already exists, Please login instead"],
      required: [true, "Email is required"],
      trim: true,
      lowerCase: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must contain at least 8 characters"],
    },
   
},
  { timestamps: true }
)

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.pre(/^find/, async function (next) {
  this.select("-__v -createdAt -updatedAt")
  next()
})

userSchema.methods.comparePassword = async function (
  plainText,
  bcryptPassword
) {
  return await bcrypt.compare(plainText, bcryptPassword)
}

module.exports = mongoose.model("User", userSchema)
