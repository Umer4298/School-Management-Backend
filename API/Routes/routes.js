const express = require("express");
const router = express.Router();
// const { isLoggedIn } = require("../Middleware/isLoggedin");

const {login,addClass,addStudents, getStudents,getStudbtn,addStudbtn} = require("../Controller/authController");
const { isLoggedIn } = require("../Middleware/middleware");
//Routes

router.post("/login", login);
router.post("/addClass",isLoggedIn,addClass)
router.post("/addStudent",isLoggedIn,addStudents)
router.post("/getStudents",isLoggedIn,getStudents)
router.post("/getStudbtn",isLoggedIn,getStudbtn)
router.post("/addStudbtn",isLoggedIn,addStudbtn)

module.exports = router;
