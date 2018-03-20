var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');
var Books = require('./models/books.js');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));
// SET UP SESSIONS
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000*60*60*24*2}, // 2 days in ms
  store: new MongoStore({mongooseConnection: db, ttl: 2*24*60*60}), // 2 days in min
}))
// save to session
app.post('/cart', (req, res) => {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save((err) => {
    if (err) {
      throw err;
    }
    res.json(req.session.cart);
  })
})

app.get('/cart', (req, res) => {
  if(typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
})

// END SESSIONS

// POST BOOKS
app.post('/books', (req, res) => {
	var book = req.body;

	Books.create(book, (err, books) => {
		if (err) {
			throw err;
		}
		res.json(books);
	})
});

// GET BOOKS
app.get('/books', (req, res) => {
	Books.find((err, books) => {
		if (err) {
			throw err;
		}
		res.json(books);
	})
});

// DELETE BOOKS
app.delete('/books/:_id', (req, res) => {
	var query = {_id: req.params._id};

	Books.remove(query, (err, books) => {
		if (err) {
			throw err;
		}
		res.json(books);
	})
});

// UPDATE BOOKS
app.put('/books/:_id', (req, res) => {
	var book = req.body;
	var query = {_id: req.params._id};

	// if the field doesn't exist, $set will set a new field
	var update = {
		'$set': {
			title: book.title,
			description: book.description,
			image: book.image,
			price: book.price
		}
	};

	var options = {new: true};

	Books.findOneAndUpdate(query, update, options, (err, books) => {
		if (err) {
			throw err;
		}
		res.json(books);
	})
});

// END APIs

app.listen(3001, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('API server is listening on http://localhost:3001');
})
