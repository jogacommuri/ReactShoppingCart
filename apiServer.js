var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var index = require('./routes/index');
var users = require('./routes/users');
var mongoose = require('mongoose');
var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//APIs

mongoose.createConnection('mongodb://localhost:27017/bookshop',{ useMongoClient: true })

var Books = require('./models/books.js');

//--->POST BOOKS<---

app.post('/books',function(req,res){
	var book = req.body;

	Books.create(book, function(err,books){
		if(err){
			throw err;
		}

		res.json(books);
	})
});

//--->GET BOOKS<---

app.get('/books',function(req,res){
	Books.find(function(err,books){
		if(err){
			throw err;
		}
		res.json(books)	
	})
});
//--->DELETE BOOKS<---

app.delete('/books/:_id',function(req,res){
	var query = {_id:req.params._id};
	Books.remove(query,function(err,books){
		if(err){
			throw err;
		}
		res.json(books)
	})
});

//End APIs

app.listen(3001,function(err){
	if(err){
		return err;
	}
	console.log("API server is listening on http://localhost:3001")
})