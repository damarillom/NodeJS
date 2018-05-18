var servidor = require("./controllers/servidor.js");
servidor.inicio(__dirname);
/*


var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/peliculas', require('./peliculas'));
app.set('view engine', 'pug');
app.set('views', './views');
var mongoose = require('mongoose');
var path = require('path');
var bcrypt = require('bcrypt');

app.use('public',express.static(path.join(__dirname, 'public')));
var url = 'mongodb://localhost:27017/midb';

var logger = function(request, response, next) {
        console.log('Request');
        next();
};
app.use(logger);

server.listen(8000);

mongoose.connect(url, function(error){
	if(error) {
		console.log('no se ha podido conectar');
	}
});

var UserSchema = new mongoose.Schema({
	email:{
		type:String,
		unique:true,
		required:true,
	},
	pass:{
                type:String,
                required:true,
        },

});

var users = mongoose.model('usuarios', UserSchema);

app.post('/signup', function(request, response) {
	if (request.body.email && request.body.pass && request.body.passConf ) {
		datos = {
			email: request.body.email,
			pass:request.body.pass
		}
		nuevo = new users(datos);
		nuevo.save(function(error, data){
			if (error) {
                                console.log(error);
                        }

		});
		response.sendFile(__dirname + '/index.html');
	};	
});

app.get('/', function(request,response){
	console.log('request' + __dirname);
	response.sendFile(__dirname + '/index2.html');
});


app.get('/getUsers', function(request,response){
        mongo.connect(url, function(err, client){
		assert.equal(null, err);
		db=client.db('midb');
		db.collection('users').find().toArray(function(err, result) {
			console.log(result);
			client.close();
		});
	});
        response.sendFile(__dirname + '/index.html');
});

app.get('/addUsers', function(request,response){
        mongo.connect(url, function(err, client){
                assert.equal(null, err);
		item= {nombre:'aaaa', email:'aaaa@aaaaa.com'};
                db=client.db('midb');
                db.collection('users').insertOne(item, function(err, result) {
                        console.log(result);
                        client.close();
                });
        });
        response.sendFile(__dirname + '/index.html');
});

app.get('/removeUsers', function(request,response){
        mongo.connect(url, function(err, client){
                assert.equal(null, err);
                query= {email:'aaaa@aaaaa.com'};
                db=client.db('midb');
                db.collection('users').deleteOne(query, function(err, result) {
                        console.log(result);
                        client.close();
                });
        });
        response.sendFile(__dirname + '/index.html');
});


app.post('/addUsers2', function(request,response){
        mongo.connect(url, function(err, client){
                assert.equal(null, err);
                item= {nombre:request.query.nombre, email:request.query.email};
                db=client.db('midb');
                db.collection('users').insertOne(item, function(err, result) {
                        console.log(result);
                        client.close();
                });
        });
        response.sendFile(__dirname + '/index.html');
});

app.get('/updateUser', function(request,response){
        mongo.connect(url, function(err, client){
                assert.equal(null, err);
               
                db=client.db('midb');
		query={nombre:{$exists:true},email:/^[a-z]/}
		nuevo= {$set:{name:'manolo',email:'manolo@gmail.com'}};
		
                db.collection('users').updateMany(query, nuevo, function(err, result) {
                        console.log("actualizado");
                        client.close();
                });
        });
        response.sendFile(__dirname + '/index.html');
});

app.get('/recibe', function(request, response){
        console.log('request' + __dirname);
        response.sendFile(__dirname + {title:'hey', message:'hello there'});
});

app.get('/login.html', function(request, response) {
        console.log('request' + __dirname);
        response.sendFile(__dirname + '/login.html');

});

io.sockets.on('connection', function(socket){
	socket.on('enviaMensaje', function(datos){
		io.sockets.emit('nuevoMensaje',{msg:datos});
	});
});
*/