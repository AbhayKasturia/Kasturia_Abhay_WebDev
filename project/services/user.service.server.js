/**
 * Created by Abhay on 6/3/2016.
 */
module.exports = function(app , models) {

    var userModel = models.projectUserModel;

    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GooglePlusStrategy = require('passport-google-plus');

    app.post("/api/project/user", createUser);
    app.post("/api/project/login",passport.authenticate('local'), login);
    app.post("/api/project/logout",logout);
    app.post("/api/project/register",register);

    app.get("/api/project/loggedin",loggedIn);
    app.get("/auth/project/facebook",passport.authenticate('facebook'), facebooklogin);
    app.get("/auth/project/google",passport.authenticate('google'), googlelogin);
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#/profile',
            failureRedirect: '/project/#/login'
        }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#/profile',
            failureRedirect: '/project/#/login'
        }));
    app.get("/api/project/user", getUsers);
    app.get("/api/project/user/:uid", findUserByID);

    app.put("/api/project/user/:uid", updateUser);
    app.delete("/api/project/user/:uid",deleteUser);

    function googlelogin(token, refreshToken, profile, done){
        userModel
            .findGoogleUser(profile.id)
            .then(
                function(googleuser){
                    if(googleuser) {
                        return done(null, googleuser);
                    }
                    else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");

                        var googleuser = {
                            username: profile.emails[0].value,
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: email,
                            google: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName,
                            }
                        };
                        userModel
                            .createUser(googleuser)
                            .then(
                                function(user){
                                    done(null,user);
                                }
                            );
                    }
                }
            )
    }

    function facebooklogin(token, refreshToken, profile, done){
        userModel
            .findFacebookUser(profile.id)
            .then(
                function(fbuser){
                    if(fbuser) {
                        return done(null, fbuser);
                    }
                    else {
                        fbuser = {
                            username: profile.displayName.replace(/ /g,''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName,
                            }
                        };
                        userModel
                            .createUser(fbuser)
                            .then(
                                function(user){
                                    done(null,user);
                                }
                            );
                    }
                }
            )
    }

    function register(req,res){
        var username = req.body.username;
        var password = req.body.password;

        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if(user)
                    {
                        res.status(400).send("Username already exists");
                        return;
                    }
                    else {
                        var user = req.body
                        user.password = bcrypt.hashSync(user.password); // this function has 2 versions and the sync version will block the thread and only continue when registered. This will block cycles of CPU and is not recommendable for more than 10 users/time for registration
                        return userModel
                            .createUser(user);
                    }
                },
                function(err){
                    res.status(400).send(err);
                    return;
                }
            )
            .then(
                function(user){
                    if(user) {
                        req.login(user,function(err){   // passport function provided to set any user to the current user - it serializes and adds them to session and cookies
                            if(err){
                                res.status(400).send(err);
                            }
                            else {
                                res.json(user);
                            }
                        })
                    }
                }
            )
    }

    function loggedIn(req,res){
        if(req.isAuthenticated()){  // passport function which authenticate if a user is logged in and has valid running sessions
            res.json(req.user);
        }
        else {
            res.send('0');
        }
    }

    passport.use('local', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    passport.use('google',new GooglePlusStrategy(googleConfig,googlelogin));
    // passport.use(new GooglePlusStrategy({
    //         clientID     : process.env.GOOGLE_CLIENT_ID,
    //         clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    //         callbackURL  : process.env.GOOGLE_CALLBACK_URL
    //     },
    //     function(token, refreshToken, profile, done){
    //     userModel
    //         .findGoogleUser(profile.id)
    //         .then(
    //             function(googleuser){
    //                 if(googleuser) {
    //                     return done(null, googleuser);
    //                 }
    //                 else {
    //                     var email = profile.emails[0].value;
    //                     var emailParts = email.split("@");
    //
    //                     var googleuser = {
    //                         username: profile.emails[0].value,
    //                         firstName: profile.name.givenName,
    //                         lastName: profile.name.familyName,
    //                         email: email,
    //                         google: {
    //                             token: token,
    //                             id: profile.id,
    //                             displayName: profile.displayName,
    //                         }
    //                     };
    //                     userModel
    //                         .createUser(googleuser)
    //                         .then(
    //                             function(user){
    //                                 done(null,user);
    //                             }
    //                         );
    //                 }
    //             }
    //         )
    // }
    // ));


    // passport.use('google', new GooglePlusStrategy({
    //         clientId: process.env.GOOGLE_CLIENT_ID,
    //         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //         callbackURL  : process.env.GOOGLE_CALLBACK_URL
    //     },
    //     function(tokens, profile, done) {
    //         // Create or update user, call done() when complete...
    //         done(null, profile, tokens);
    //     }
    // ));

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use('facebook',new FacebookStrategy(facebookConfig,facebooklogin));

    function localStrategy(username,password,done){
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if(user && bcrypt.compareSync(password,user.password))
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
    }
};