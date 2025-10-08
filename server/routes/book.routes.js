const express = require("express");
const { handleBookStoreController } = require("../controller/book.controller");

const router = express.Router();

// router.post("/addbook", (req, res)=>{})
router.post("/addbook", handleBookStoreController); // http://localhost:8000/book/addbook

module.exports = router;
