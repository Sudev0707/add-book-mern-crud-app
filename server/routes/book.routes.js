const express = require("express");
const {
  handleBookStoreController,
  handleBookListController,
  handleDeleteBookComntroller, handleUpdatBookController
} = require("../controller/book.controller");

const router = express.Router();

// insert / post
// router.post("/addbook", (req, res)=>{})
router.post("/addbook", handleBookStoreController); // http://localhost:8000/book/addbook
router.get("/getBookList", handleBookListController);
router.post("/deleteBook", handleDeleteBookComntroller);
router.put("/updateBook", handleUpdatBookController);

module.exports = router;
