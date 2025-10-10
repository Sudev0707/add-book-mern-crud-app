const { Book } = require("../model/book.model");

// database interaction/ INSERTION  -----------------------------------
const handleBookStoreController = async (req, res) => {
  try {
    const body = req.body;

    // validation check
    if (
      !body.BookName ||
      !body.BookTitle ||
      !body.Author ||
      !body.SellingPrice
    ) {
      return res
        .status(400)
        .json({ Message: "All fields are required", Success: false });
    }

    // if available  Insert book (contains object which holds the book data )
    const bookAdd = await Book.insertOne(body);
    //  const bookAdd = await Book.create(body);
    console.log("bookAdd", bookAdd);

    // after successfully insertion
    if (bookAdd) {
      return res.status(201).json({
        Message: "Data insertd succesfully",
        Success: true,
        data: bookAdd,
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message || "Internal Server Error",
      Success: false,
    });
  }
};

// Fetching data -----------------------------------------------
const handleBookListController = async (req, res) => {
  try {
    const lastModified = new Date().toUTCString();

    // Disable caching (always return fresh data)
    // res.set("Cache-Control", "no-store");

    const bookList = await Book.find({}).sort({ _id: -1 });
    return res.status(200).json({
      message: "All books fetched succesfully",
      success: true,
      data: bookList,
      totalCount: bookList.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// delete data ------------------------------------------------
const handleDeleteBookComntroller = async (req, res) => {
  const body = req.body;

  try {
    const deleted = await Book.deleteOne({ _id: body.Id });
    console.log("deleted", deleted);

    if (deleted.acknowledged) {
      return res.status(200).json({
        message: "Book deleted succesfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// update data -----------------------------------------------------
const handleUpdatBookController = async (req, res) => {
  
  try {
    const body = req.body;
    const update = await Book.updateOne({ _id: body?.Id }, { $set: body });
    // console.log(update, "updateinggg");

    if (update?.acknowledged) {
      return res.json({
        message: "Book updated successfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  handleBookStoreController,
  handleBookListController,
  handleDeleteBookComntroller,
  handleUpdatBookController
};
