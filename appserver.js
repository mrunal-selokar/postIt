var http = require("http");
var express  = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(__dirname + '/public'));

var posts = [];
app.locals.posts = posts;

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(request,response){
	response.render("home");
});

app.get('/new-post', function(request, response){
	response.render("post_form")
});

app.post('/new-post', function(request, response){
	if(!request.body.name || !request.body.content){
		response.status(400).send("Both fields must be present");
		return;
	}
	posts.push({
		"name":request.body.name,
		"content":request.body.content,
		"posted_at": new Date()
	});
	response.redirect("/");
});

http.createServer(app).listen(process.env.PORT ||4000, function(){
	console.log("Server started on port: 4000");
})