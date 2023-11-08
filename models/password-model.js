const mongoose = require("mongoose");
// const { BOOLEAN } = require("sequelize");
const Schema = mongoose.Schema;
let passwordSchema = new Schema({
  isActive:{type:Boolean}

});
module.exports = mongoose.model("password", passwordSchema);
// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const password = sequelize.define("password", {
//   id: {
//     type: Sequelize.UUID,
//     allowNull:false,
//     primaryKey : true
//   },
//   // userId: { type: Sequelize.STRING },
//   isActive: { type: Sequelize.BOOLEAN ,
//   defaultValue: false },
// });
// module.exports = password;
