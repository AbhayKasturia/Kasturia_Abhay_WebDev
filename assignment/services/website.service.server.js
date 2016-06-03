/**
 * Created by Abhay on 6/3/2016.
 */

module.exports = function(app) {

    var websites =
        [
            { "_id": "123", "name": "Facebook", "desc": "Social Networking Site",   "developerId": "456" },
            { "_id": "234", "name": "Tweeter", "desc": "Social Networking Site",    "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",  "desc": "Social Networking Site",   "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "desc": "Social Networking Site","developerId": "123" },
            { "_id": "678", "name": "Checkers", "desc": "Social Networking Site",   "developerId": "123" },
            { "_id": "789", "name": "Chess", "desc": "Social Networking Site",      "developerId": "234" }
        ];

    app.post("/api/user/:uid/website" , createWebsite);
    app.get("/api/user/:uid/website" , findAllWebsitesForUser);
    app.get("/api/user?username=:username" , findUserbyUsername);
    app.get("/api/user/:uid" , findUserById);
    app.get("/api/user?username=username&password=password" ,findUserByCredentials);
    app.put("/api/user/:uid" , updateUser);
    app.delete("/api/user/:uid" , deleteUser);

    function getUsers(req,res){
        res.send(users);
        return;
    }

    function findUserById(req,res){
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

    function findUserbyID(id) {
        for (var i in users) {
            if (users[i]._id === id)
                return users[i];
        }
        return null;
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
    }
};