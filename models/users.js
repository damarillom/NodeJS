var utils = require("../utils/utils.js");
var mongoose = utils.mongoose;
//var bcrypt = require('bcrypt');

var dbName = "node";

var collection = "users";

var url = 'mongodb://localhost:27017/'+dbName;

var schema = new mongoose.Schema({
	email:{
		type 	:String,
		unique	:true,
		required:true
	},
	pass:{
		type 	:String,
		required:true
	}
});

schema.methods.comparePassword = function(candidatePassword, cb) {
	console.log(this);

	cb(null, candidatePassword === this.pass);

	/*bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		console.log(err);
		console.log(isMatch);
		if (err) return cb(err);
		cb(null, isMatch);
	});*/
};

schema.statics.getAuthenticated = function(userform, cb) {
	this.findOne({ email: userform.email }, function(err, user) {
		if (err) return cb(err);

		if (!user) {
			return cb(null, null, 'No existe el usuario');
		}

		user.comparePassword(userform.pass, function(err, isMatch) {
			if (err) return cb(err);

			if (isMatch) {
				return cb(null, user);
			}

		});
	});
};
/*
schema.pre('save', function (next) {
	var user = this;
	bcrypt.hash(user.pass, 10, function (err, hash){
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
});
*/
var modelo = (function(){
	var users = mongoose.model(collection, schema);

	var registro = function(user, callback){
		mongoose.connect(url, function (error) {
			if(error){
				console.log("no se ha podido conectar");
			}else{
				var insert = new users(user);
				insert.save(function (error, data) {
					if(error){
						console.log(error);
						return callback({});
					}
					return callback(data._doc);
				});
			}
		});
	};

	var login = function(user, callback){
		mongoose.connect(url, function (error) {
			if(error){
				console.log("no se ha podido conectar");
			}else{
				users.getAuthenticated(user,
					function(err, data) {
						if (err){
							console.log(err);
							return callback({});
						} 
						return callback(data);         
					});
			}
		});

	};
	return{
		login:login,
		registro:registro
	};


})();


module.exports = modelo;