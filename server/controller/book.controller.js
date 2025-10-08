const { Book } = require("../model/book.model");

// database interaction/ INSERTION  -----------------------------------
const handleBookStoreController = async (req, res) => {
  try {
    const body = req.body;

    // validation check
    if (!body.BookName || !body.BookTitle || !body.Author || !body.SellingPrice) {
      return res
        .status(400)
        .json({ Message: "All fields are required", Success: false });
    }

    // if available  Insert book (contains object which holds the book data )
    const bookAdd = await Book.insertOne(body);
    //  const bookAdd = await Book.create(body); 
    console.log("bookAdd",bookAdd);

    // after successfully insertion
    if(bookAdd){
         return res
        .status(201)
        .json({ Message: "Data insertd succesfully", Success: true, data: bookAdd   });
    }

  } catch (error) {
    return res.status(500).json({ Message: error.message || 'Internal Server Error', Success: false });
  }
};

module.exports = { handleBookStoreController };
