// Bujo App - Hester van Slooten

// Dependencies requirements

const express = require('express'),
	pg = require('pg'),
	Sequelize = require('sequelize'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	SequelizeStore = require('connect-session-sequelize')( session.Store ),
	bcrypt = require('bcrypt'),
	port = process.env.PORT || 8000;
  	var db = new Sequelize( "bujo_app", process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
		host: "localhost",
		dialect: "postgres",
		define: {
			timestamps: false
	}
} )

const app = express();

// Config

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static( __dirname + '/../public'));
// app.use(session( {
// 	secret: "suchsafemanywow",
// 	store: new SequelizeStore({
// 		db: db,
// 		checkExpirationInterval: 15 * 60 * 1000,
// 		expiration: 24 * 60 * 60 * 1000
// 	}),
// 	saveUnitialized: true,
// 	resave: true
// }));

// View engine config

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// Database config

// db = new Sequelize('bujo_app', process.env.POSTGRES_USER, null, {
// 	host: 'localhost',
// 	dialect: 'postgres',
// 	define: {
// 		timestamps: false
// 	}
// } );

// Connection with database

// db.sync({force:false});

// Database models definition

// var Users = db.define('users', {
// 	firstname: Sequelize.STRING,
// 	lastname: Sequelize.STRING,
// 	username: Sequelize.STRING,
// 	email: {
//    	type: Sequelize.STRING,
//    	unique: true
//  	},
// 	password: {
//    	type: Sequelize.STRING,
//   	}
// });

// var Todos = db.define('todos', {
// 	todo: Sequelize.TEXT
// });

// Database table associations

// Users.hasMany(Todos);
// Todos.belongsTo(Users);

// GET

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/profile', function(req, res) {
	res.render('profile');
});

app.get('/bujo', function(req, res) {
	res.render('bujo');
});

// Start listening
var server = app.listen(9000, () => {
	console.log(`Bujo App listening on port: ${server.address().port}`);
});