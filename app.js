//  PACKAGES
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyPaser = require("body-parser");
const session = require("express-session");
const app = express();

// AUTH
const passport = require("passport");
const User = require("./models/user");
const LocalStrategy = require("passport-local");

// MONGOOSE SETTINGS
const password = process.env.MONGO_PASSWORD;
const uri = process.env.MONGO_CONNECTION;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

app.use(express.static(__dirname + "public"));
app.use(bodyPaser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// AUTH SETTINGS
app.use(
	session({
		secret: process.env.AUTH_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MIDDLEWEAR TO CHECK AUTH
const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
};

app.get("/", isLoggedIn, (req, res) => {
	res.render("index");
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.get("/logout", (req, res) => {
	req.logOut();
	res.redirect("/");
});

app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
	}),
	(req, res) => {}
);

app.get("/register", (req, res) => {
	res.render("register");
});

app.post("/register", (req, res) => {
	User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
		if (err) {
			console.log("Error" + err);
			res.redirect("/register");
		} else {
			passport.authenticate("local")(req, res, () => {
				res.redirect("/");
			});
		}
	});
});

app.listen(process.env.PORT | 3000, () => {
	console.log("Server is live on http://localhost:3000");
});
