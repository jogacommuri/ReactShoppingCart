var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var mongoose = require('mongoose');
var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//APIs

//mongoose.connect('mongodb://localhost:27017/bookshop')
mongoose.connect('mongodb://test:test@ds161209.mlab.com:61209/bookshop');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '#MongoDB - connection error'));
//--->Set UP SESSION<---
app.use(session({
	secret: 'mySecretString',
	saveUninitialized: false,
	resave: false,
	cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
	store: new MongoStore({mongooseConnection: db, ttl: 2 *24 *60 *60})
}))

//SAVE SESSION CART API
app.post('/cart', function(req,res){
	var cart = req.body;
	req.session.cart = cart;
	req.session.save(function(err){
		if(err){
			throw err
		}
		res.json(req.session.cart);
	})
});

//GET SESSION CART API

app.get('/cart',function(req,res){
	if(typeof req.session.cart !== undefined){
		res.json(req.session.cart);
	}
});

//--->END SESSION<---

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
			console.log("# API Delete Books: ",err);
		}
		res.json(books)
	})
});

//--->	GET BOOKS IMAGES API <---

app.get('/images', function(req,res){
	const imgFolder = __dirname+'/public/images';
	//REquire the file system
	const fs = require('fs');
	//READ files
	fs.readdir(imgFolder, function(err,files){
		if(err){
			return console.error(err);
		}
		//CREATE AN EMPTY ARRAY
		const filesArr =[];
		//var i =1;
		files.forEach(function(file){
			filesArr.push({name:file});
			//i++;
		});

		//SEND THE JSON RESPONSE WITH ARRAY
		res.json(filesArr);
	})
})

//End APIs

app.listen(3001,function(err){
	if(err){
		return err;
	}
	console.log("API server is listening on http://localhost:3001")
})