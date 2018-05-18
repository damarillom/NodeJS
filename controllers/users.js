var express = require('express');
var router = express.Router();

var model = require("../models/users.js");

router.post("/registro", function(req, resp) {
	var user = {
		email: req.body.email,
		pass : req.body.password
	}
	model.registro(user, function(user){
		resp.render("index", user);
	});
});
router.post("/login", function(req, resp) {
	var user = {
		email: req.body.email,
		pass : req.body.password
	}
	model.login(user, function(user){
		resp.render("index", user);
	});

});

module.exports = router;
