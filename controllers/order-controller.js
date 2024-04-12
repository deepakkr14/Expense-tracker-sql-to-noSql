const Order = require("../models/order-model");
const User = require("../models/user-model");
// const mongoose=require('mongoose');
const Razorpay = require("razorpay");


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const amount = 2500;

const createOrder = async (req, res) => {
  // const session = await mongoose.startSession();
  try {
  // session.startTransaction();
  const options = {
    amount: amount,
    currency: "INR",
    receipt: "order_receipt",
  };
    const order = await razorpay.orders.create(options);
    // await req.user.createOrder({ orderid: order.id });
    // await session.withTransaction(async () => {
      const orderDoc = await Order.create({
        userId: req.user,
        orderid: order.id,
      });
    // });
    // await session.commitTransaction();
    // session.endSession();
    res.json({ order: order, key_id: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

const updateTransactionStatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;

    const order = await Order.findOne({ orderid: order_id });

    order.status = "SUCCESSFUL";
    order.paymentid = payment_id;
    const promise1 = await order.save();

    const promise2 = User.updateOne(
      { _id: req.user._id },
      { $set: { ispremiumuser: true } }
    );
    // console.log(order, "payment it");
    Promise.all([promise1, promise2])
      .then(() => {
        return res
          .status(202)
          .json({ sucess: true, message: "Transaction Successful" });
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: err, message: "Sometghing went wrong" });
  }
};

module.exports = { createOrder, updateTransactionStatus };
