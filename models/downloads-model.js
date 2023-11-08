const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let downloadsSchema = new Schema({
  date: { type: String },
  fileUrl: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("downloads", downloadsSchema);
// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const downloads = sequelize.define("downloads", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },

//   date: { type: Sequelize.STRING },
//   fileUrl: { type: Sequelize.STRING },
// });
// module.exports = downloads;
