const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let expenseSchema = new Schema({
  amount: { type: Number, required: true },
  category: { type: String },
  description: { type: String },
  dateOfExpense: { type: Date, default:new Date().toISOString().split("T")[0]},
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});


module.exports = mongoose.model("Expenses", expenseSchema);
// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

// const Expense = sequelize.define("Expenses", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   amount: Sequelize.STRING,
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   category: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   }
// });

// module.exports = Expense;
