var utils = require("../utils/utils.js");
var mongoose = utils.mongoose;

//var bcrypt = require('bcrypt');

var dbName = "node";

var collection = "peliculas";

var url = 'mongodb://localhost:27017/'+dbName;

var schema = new mongoose.Schema({
	Codpeli:{
		type 	:Number,
		unique	:true,
		required:true
	},
	Titol:{
		type 	:String,
		required:true
	},
	Sinopsi:{
		type 	:String,
		required:true
	}
});

var modelo = (function(){
	var peliculas = mongoose.model(collection, schema);

	schema.pre('save', function (next) {
        console.log("Generando Codpeli");
        var pelicula = this;

        peliculas.find({},"Codpeli -_id",{limit:1, sort:{Codpeli:-1}},
            function(err, id) {
                if (err){
                    console.log(err);
                    next(err);
                }
                pelicula.Codpeli = ++id[0].Codpeli;
                next();   
            });
    });

	var list = function(callback){
		mongoose.connect(url, function (error) {
			if(error){
				console.log("no se ha podido conectar");
			}else{
				peliculas.find({}, "Titol Sinopsi Codpeli -_id",
					function(err, peliculas) {
						if (err){
							console.log(err);
							return callback([]);
						}else{
							var array = [];
							for (var i = 0; i < peliculas.length; i++) {
								array.push(peliculas[i]._doc);
							}
							return callback(array);
						}
					});
			}
		});

	};

	var add = function(pelicula, callback) {
        mongoose.connect(url, function (error) {
            if(error){
                console.log("no se ha podido conectar");
            }else{
                var insert = new peliculas(pelicula);
                insert.save(function (error, data) {
                    console.log("insertando");
                    if(error){
                        console.log(error);
                        return callback({});
                    }
                    return list(callback);
                });
            }
        });
    };


    /*var del = function(pelicula, callback) {
        mongoose.connect(url, function (error) {
            if(error){
                console.log("no se ha podido conectar");
            }else{
                pelicula.deleteOne({Codpeli: pelicula.codPeli,
                function (error) {
                    console.log("borrado");
                    if(error){
                        console.log(error);
                        return callback({});
                    }
                    return list(callback);
                }
            	});
        	}
    };*/

    var del = function(codPeli, callback) {

        mongoose.connect(url, function (error) {
            if(error){
                console.log("no se ha podido conectar");
            }else{
                peliculas.deleteOne({Codpeli: codPeli}, 
                    function(error) {
                        console.log(error);
                        return callback("ok");
                    }
                    )};
            });
    };

	return{
		list:list,
		add:add,
		del:del
	};


})();


module.exports = modelo;