const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ordersSchema = new Schema({
  paymentid: { type: String },
  orderid: { type: String },
  status: { type: String },
  userID: { type: Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("Order", ordersSchema);
// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

// const Order = sequelize.define("orders", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   paymentid: Sequelize.STRING,
//   orderid: Sequelize.STRING,
//   status: Sequelize.STRING,
// });

// module.exports = Order;
