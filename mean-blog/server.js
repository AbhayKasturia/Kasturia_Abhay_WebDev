var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/meanblogsdb');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + '/public'));

app.get("/api/post" , findAllPosts)

app.delete("/api/post/:id" , removePost)

app.post("/api/post" , createPost)

var posts =[];

// var posts =
//     [
//         {title: "Firt Post", body: "1"},
//         {title: "Second Post", body: "2"},
//         {title: "Third Post", body: "3"},
//         {title: "Fourth Post", body: "4"},
//         {title: "Fifth Post", body: "5"}
//     ];

var PostSchema = mongoose.Schema({
    title: String,
    body: String
});

var PostModel = mongoose.model("PostModel" , PostSchema);

function findAllPosts(req , res)
{
    PostModel
        .find()
        .then(function(docs)
        {
            posts = docs;
            res.send(posts);
        })
}

function removePost(req,res)
{
    var id = req.params.id;
    PostModel
        .remove({_id:id})
        .then(function(stat)
        {
            findAllPosts(req,res);
        })
}

function createPost(req,res)
{
    var npost = req.body;
    PostModel
        .create(npost)
        .then(function(doc){
            posts.push(doc);
            res.send(posts);
        });
}

app.listen(4000);
