const mongoose = require("mongoose");


// schema
const bookSchema = new mongoose.Schema({
  BookName: { type: String, required: true },
  BookTitle: { type: String, required: true },
  Author :{ type:String, required: true},
  SellingPrice:{ type: String, required: true},
  PublishedDate: {type: String}
},{timestamps: true});


// model
const Book = mongoose.model("books", bookSchema)   // books is a collection


module.exports = {Book};