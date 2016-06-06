/**
 * Created by Abhay on 6/3/2016.
 */
module.exports = function(app) {
    var users =         [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

/*    app.get("/api/user" , getUsers);
    app.post("/api/user" , createUser);
    app.get("/api/user?username=username" , findUserByUsername);
    app.get("/api/user/:uid" , findUserByID);
    app.get("/api/user?username=username&password=password" ,findUserByCredentials);
    app.put("/api/user/:uid" , updateUser);
    app.delete("/api/user/:uid" , deleteUser);*/

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:uid", findUserByID);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid",deleteUser);

    function getUsers(req,res){
        var username = req.query.username;
        var password = req.query.password;

        if(username&&password){
            findUserByCredentials(username,password,res);
        }
        else
        if(username){
            findUserByUsername(username,res);
        }
        else
            res.send(users);
    }

    function findUserByID(req,res){
        var uid = req.params.uid;
        for(var i in users) {
            if(users[i]._id === uid) {
                res.json(users[i]);
                return;
            }
        }
        res.json();
    };

    function findUserByUsername(username, res){
        for(var i in users){
            if(users[i].username === username)
            {
                res.json(users[i]);
                return;
            }
        }
        res.json();
    }

    function createUser(req , res) {
        var user = req.body;
        users.push(user);
        res.sendStatus(200);
    }

    function deleteUser(req, res) {
        var id = req.params.uid;
        for (var i in users) {
            if (users[i]._id === id)
            {
                users.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function updateUser(req, res) {
        var id = req.params.uid;
        var newUser = req.body;
        for (var i in users) {
            if (users[i]._id === id)
            {
                users[i]=newUser;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function findUserByCredentials(username, password , res) {
        for (var i in users) {
            if (users[i].username === username && users[i].password === password)
            {
                res.json(users[i]);
                return;
            }
        }
        res.json();
        res.sendStatus(400);
    }
};