var express = require('express');
var router = express.Router();

var model = require("../models/peliculas.js");


router.get("/list", function(req, resp) {
	model.list(function(peliculas){
		resp.render("list", {peliculas:JSON.stringify(peliculas)});
	});
});
router.post("/add", function(req, resp) {
	var pelicula = {
		Codpeli: 0,
		Titol: req.body.titol,
		Sinopsi: req.body.sinopsi
	}
	model.add(pelicula, function(peliculas){
		resp.render("list", {peliculas:JSON.stringify(peliculas)});
	});
});
router.post("/del", function(req, resp) {
	/*var pelicula = {
		Codpeli: 0,
		Titol: req.body.titol,
		Sinopsi: req.body.sinopsi
	}*/
	model.del(req.body.Codpeli, function(peliculas){
		resp.render("list", {peliculas:JSON.stringify(peliculas)});
	});
});


module.exports = router;
