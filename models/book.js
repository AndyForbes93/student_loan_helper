const mongoose = require("mongoose");
require('mongoose-moment')(mongoose);
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  loan: { type: Number},
  payment: { type: Number, required: true },
  date: 'Moment'
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
