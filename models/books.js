"use strict"

var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var booksSchema = new Schema({
	title:String,
	description: String,
	images: String,
	price: Number
});

var Books = mongoose.model('Books',booksSchema);

module.exports = Books;