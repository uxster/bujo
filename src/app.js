// Bujo App - Hester van Slooten

// Dependencies requirements

const express = require('express'),
	pg = require('pg'),
	Sequelize = require('sequelize'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	bcrypt = require('bcrypt');
	var db = new Sequelize( "bujo_app", process.env.POSTGRES_USER, null, {
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
app.use(session( {
	secret: "suchsafemanywow",
	saveUninitialized: true,
	resave: true
}));

// View engine config

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// Connection with database

db.sync({force:false});

// Database models definition

var Users = db.define('users', {
	firstname: Sequelize.STRING,
	lastname: Sequelize.STRING,
	username: Sequelize.STRING,
	email: {
		type: Sequelize.STRING,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
	}
});

var Todos = db.define('todos', {
	body: Sequelize.TEXT,
	type: Sequelize.TEXT
});

// Database table associations

Users.hasMany(Todos);
Todos.belongsTo(Users);

// GET

app.get('/', (req, res) => {
	res.render('index', {
		errormessage: req.query.message
	});
});

app.get('/register', (req, res) => {
	res.render('register');
});

app.get('/profile/:username', (req, res) => {
	res.render('profile', {
		user: req.session.user
	});
});

app.get('/bujo/:username', (req, res) => {
	res.render('bujo', {
		user: req.session.user
	});
});

app.get('/bujo/new/task', (req, res) => {
	res.render('task');
});

app.get('/bujo/new/appt', (req, res) => {
	res.render('appt');
});

app.get('/bujo/new/event', (req, res) => {
	res.render('event');
});

app.get('/bujo/new/note', (req, res) => {
	res.render('note');
});

//POST
app.post('/register', (req, res) => {

	let pw = req.body.password;

	 bcrypt.hash(pw, 10)
	 .then((hash) => {
		Users.create({
		  firstname: req.body.firstname,
		  lastname: req.body.lastname,
		  username: req.body.username,
		  email: req.body.email,
		  password: hash
		})
		.then((user) => {
		  req.session.user = user;
		  res.redirect('/bujo/' + user.username)
		})
	 })
	 .catch((error) => {
		console.error(error);
	 });

});

app.post('/login', (req, res) => {
  let pw = req.body.password;
  let username = req.body.username;

  Users.findOne({
	 where: {
		username: username
	 }
  })
  .then(function(user){
	 hash = user.password;

	 bcrypt.compare(pw, hash).then((result) => {
		if(result === true) {
		  req.session.user = user;
		  res.redirect('/bujo/' + user.username)
		} else {
		  res.redirect('/?message=' + encodeURIComponent('Invalid username or password!'))
		}
	 })
  })
  .catch((error) => {
	 console.error(error);
	 res.redirect('/?message=' + encodeURIComponent('Invalid username or password!'));
  });
})

app.post('/new/task', (req, res) => {
	Todos.create({
		body: req.body.body,
		type: 'task',
		userId: req.session.user.id
	})
	.then(function(user){
		console.log("task posted");
		var user = req.session.user;
		res.redirect('/bujo/' + user.username);
	})
	.catch((error) => {
		console.error(error);
	});
})

app.get('/logout', (req, res) => {
	 req.session.destroy((error) => {
		if(error) {
		  throw error;
		}
	 });

	 res.redirect('/');
})

// Start listening
var server = app.listen(9000, () => {
	console.log(`Bujo App listening on port: ${server.address().port}`);
});