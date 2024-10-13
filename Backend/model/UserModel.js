const { model }= require("mongoose");
const bcrypt = require("bcryptjs");


const UserSchemas = require("../schemas/UserSchemas");
const UserModel = new model("user", UserSchemas);

module.exports = { UserModel};