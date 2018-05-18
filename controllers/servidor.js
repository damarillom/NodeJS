var express = require('express'), 
app = express(),
server = require('http').createServer(app);
//var cookieParser = require('cookie-parser');

var assert = require('assert');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set("view engine", "pug");

app.use("/peliculas", require("./peliculas.js"));

app.use("/users", require("./users.js"));

var logger = function(req, resp, next) {
	console.log("Peticion a ----- "+req.url);
	next();
};
app.use(logger);


function inicio(path) {
	server.listen(8000);
	app.use("/public", express.static(path+'/public'));
	app.use("/views", express.static(path+'/views'));

	app.set("views", path+"/views");

	app.get("/", function(req, resp) {
		resp.render("index", {nombre:"Andres"});
	});

	app.get("/registro", function(req, resp) {
		resp.render("registro", {nombre:"Andres"});
	});
	app.get("/login", function(req, resp) {
		resp.render("login", {nombre:"Andres"});
	});
}



exports.inicio=inicio;