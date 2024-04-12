const User = require("../models/user-model");
const Download = require("../models/downloads-model");
const Expense = require("../models/expense-model");
const sequelize = require("../util/database");

const Userservices = require("../services/userservices");
const S3services = require("../services/s3services");

exports.getPage = async (req, res) => {
  try {
    let page = Number(req.params.no); //1
    let limits = Number(req.params.limit);

    let itemsPerPage = limits;
    let id = req.user._id;

    const totalData = await Expense.countDocuments({ userId: id });

    const ispremiumuser = await req.user.ispremiumuser;
    const totalIncome = await req.user.totalIncome;
   

    const expenses = await Expense.find({ userId: id })
      .skip((page - 1) * itemsPerPage)
      .limit(limits)
      .exec();
    const totalPages = Math.ceil(totalData / itemsPerPage);

    let hasNextPage = false;
    let hasPreviousPage = false;
    let nextPage = null;
    let previousPage = null;

    if (page > 1) {
      hasPreviousPage = true;
      previousPage = page - 1;
    }

    if (page < totalPages) {
      hasNextPage = true;
      nextPage = page + 1;
    }

    res.status(200).json({
      premium: ispremiumuser,
      expenses,
      totalIncome,
      hasNextPage,
      hasPreviousPage,
      currentPage: page,
      totalPages,
      nextPage,
      previousPage,
    });
  } catch {
    (err) => console.log(err);
  }
};


exports.getDownload = async (req, res) => {
  try {
    const expenses = await Userservices.getExpenses(req);
    const stringExpenses = JSON.stringify(expenses);
    const userId = req.user._id;
    const filename = `expense${userId}/${new Date()}.txt`;

    const fileURL = await S3services.uploadToS3(stringExpenses, filename);
    console.log(fileURL);

    const encodedDateString = fileURL.split("/").pop().replace(".txt", "");
    const decodedDateString = decodeURIComponent(encodedDateString);
    const parsedDate = new Date(decodedDateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = parsedDate.toLocaleDateString("en-US", options);

    // req.user.createDownload({ date: formattedDate, fileUrl: fileURL });
    Download.create({ date: formattedDate, fileUrl: fileURL });
    res.status(200).json({ fileURL, success: true });
  } catch (err) {
    res.status(401).send("Error while downloading the files");
  }
};
exports.getLeaderboard = async (req, res, next) => {
  try {
    // const leaderboard = await User.findAll({
    //   attributes: ["id", "name", "totalExpense"],
    //   order: [["totalExpense", "DESC"]],
    // });
    const leaderboard = await User.find({})
      .select("id name totalExpense")
      .sort({ totalExpense: -1 });

    res.status(200).json({
      success: true,
      data: leaderboard,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.postaddInc = async (req, res, next) => {
  const amount = req.body.IncAmount;
  const category = req.body.IncCategory;
  let userId = req.user._id;
  try {
    const user = await User.findOne({ _id: req.user._id });
    const previousIncome = user.totalIncome;
    const newIncome = previousIncome + amount;
    const promise =await User.updateOne(
      { _id: req.user._id },
      { $set: { totalIncome: newIncome } }
    );
    res.status(200).json({sucess:true,message:"income updated"});
  } catch {
    (err) => {
      console.log(err);
    };
  }

  //  const promise = User.updateOne(
  //   { _id: req.user._id },
  //   { $set: { totalIncome: true } }
  // );
};
exports.postaddNew = async (req, res, next) => {
  // const t = await sequelize.transaction();
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  try {
    let userId = req.user._id;
    const expense = Expense.create({
      amount: amount,
      category: category,
      description: description,
      userId: userId,
    });
    const updatedTotalExpense = req.user.totalExpense + Number(amount);
    await User.updateOne(
      { _id: req.user._id },
      { $set: { totalExpense: updatedTotalExpense } }
    );

    console.log("Expense added");
    res.status(200).json(expense);
  } catch {
    (err) => {
      console.log(err);
    };
  }
};

exports.getEverything = async (req, res, next) => {
  try {
    // const data = await req.user.getExpenses();
    const data = await Expense.find({ userId: req.user._id });

    res.json({ data: data, premium: req.user.ispremiumuser });
  } catch {
    (err) => console.log(err);
  }
};

exports.getDelete = async (req, res, next) => {
  // const t = await sequelize.transaction();
  let id = req.params.id;
  try {
    const expense = await Expense.findById(id);
    const previousPrice = expense.amount;
    const result = await Expense.findByIdAndDelete(id);
    // updating total expense of user table
    const updatedTotalExpense = req.user.totalExpense - Number(previousPrice);

    await User.updateOne(
      { _id: req.user._id },
      { $set: { totalExpense: updatedTotalExpense } }
    );
    console.log(`deleted ${id}`);
    res.json({ success: true, data: {} });
  } catch {
    (err) => {
      console.log(err);
    };
  }
};
exports.postEdit = async (req, res, next) => {
  const t = await sequelize.transaction();
  const id = req.body.userId;
  const amount = Number(req.body.amount);
  const description = req.body.description;
  const category = req.body.category;
  try {
    const expense = await Expense.findById(id);
    const previousPrice = expense.amount;
    expense.amount = amount;
    expense.description = description;
    expense.category = category;

    const updatedExpense = await expense.save();

    const updatedTotalExpense =
      req.user.totalExpense - Number(previousPrice) + Number(amount);

    await User.updateOne(
      { _id: req.user._id },
      { $set: { totalExpense: updatedTotalExpense } }
    );

    console.log("Record Updated");
    res.json({ sucess: "true", data: updatedExpense });
  } catch (error) {
    console.log(error);
  }
};
