const mongoose = require("mongoose");
const { INTEGER } = require("sequelize");
const Schema = mongoose.Schema;
let userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  password: { type: String, required: true },
  totalExpense: { type: Number,allowNull:false,default: 0 },
  ispremiumuser: { type: Boolean, default: false },
});

userSchema.methods.isPremiumUser = async function () {
  return this.isPremium;
};


module.exports = mongoose.model("User", userSchema);
// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

// const User = sequelize.define("users", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   name: {
//     type:Sequelize.STRING,
//   allowNull:false},
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     primaryKey: true,
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   totalExpense: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   ispremiumuser:{
//     type : Sequelize.BOOLEAN ,
//     defaultValue :false
//   }
// });

// module.exports = User;
