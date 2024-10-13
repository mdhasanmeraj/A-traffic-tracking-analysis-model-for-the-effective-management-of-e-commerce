const { Schema } = require("mongoose")
const bcrypt = require("bcryptjs");

const UserSchemas = new Schema({
    email: {
      type: String,
      required: [true, "Your email address is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Your username is required"],
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
    createdAt: {
      type: String,
      default: new Date(),
    },
  });
  
  UserSchemas.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });
  
module.exports = { UserSchemas};