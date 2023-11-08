const path = require("path");

const express = require("express");

const userController = require("../controllers/user-controller");

const router = express.Router();


// router.get("/getAll", userController.getEverything);

router.post("/singup", userController.postaddNew);
router.post("/login", userController.postlogin);

// router.get("/delete/:id", userController.postDelete);


module.exports = router;
