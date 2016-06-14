/**
 * Created by Abhay on 6/3/2016.
 */
module.exports = function(app , models) {

    var userModel = models.userModel;

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

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
    app.post("/api/login",passport.authenticate('local'), login);
    app.get("/api/user", getUsers);
    app.get("/api/user/:uid", findUserByID);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid",deleteUser);
    app.post("/api/logout",logout);

    passport.use('local', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username,password,done){
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user){
                    if(user)
                        done(null,user); // only valid request
                    else
                        done(null,false); // will give an unauthenticate error
                },
                function(error){
                    done(err);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserByID(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function login(req, res) {
        var user= req.user;
        res.json(user);
    }


    function logout(req,res){
        req.logout();   // passport logout function
        res.send(200);
    }

    function getUsers(req,res){
        var username = req.query.username;
        var password = req.query.password;

        if(username&&password){
            findUserByCredentials(username,password,req,res);
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

        console.log(req.session.createUser);

        userModel
            .findUserByID(uid)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
        // for(var i in users) {
        //     if(users[i]._id === uid) {
        //         res.json(users[i]);
        //         return;
        //     }
        // }
        // res.json();
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

        userModel
            .createUser(user)
            .then(
            function(user) {
                console.log(user);
                res.json(user);
            },
            function(error) {
                res.statusCode(400).send(error);
            }
        )

        // // users.push(new_user);
        // res.send(new_user);
    }

    function deleteUser(req, res) {
        var id = req.params.uid;

        userModel
            .deleteUser(id)
            .then(
                function(stats){
                    console.log(stats);
                    res.send(200);
                },
                function(error){
                    res.statusCode(404).send(err);
                }
            );
        //
        //
        // for (var i in users) {
        //     if (users[i]._id === id)
        //     {
        //         users.splice(i,1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
    }

    function updateUser(req, res) {
        var id = req.params.uid;
        var newUser = req.body;

        userModel
            .updateUser(id, newUser)
            .then(
                function(user) {
                    console.log(user);
                    res.json(user);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );

        // for (var i in users) {
        //     if (users[i]._id === id)
        //     {
        //         users[i]=newUser;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
    }

    function findUserByCredentials(username, password ,req, res) {

        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user){
                    console.log(req.session);
                    req.session.createUser=user;
                    res.json(user);
                },
                function(error){
                    res.statusCode(400).send(err);
                }
            );
        //
        // for (var i in users) {
        //     if (users[i].username === username && users[i].password === password)
        //     {
        //         res.json(users[i]);
        //         return;
        //     }
        // }
        // res.json();
        // res.sendStatus(400);
    }
};