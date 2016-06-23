// encapsulate all operations with the database
// this module gives us a high level api to interact with the database

module.exports = function(){

    var mongoose = require("mongoose");

    var UserSchema = require("./user.schema.server")();

    var User= mongoose.model("ProjectUser", UserSchema);

    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByID: findUserByID,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findFacebookUser: findFacebookUser,
        findGoogleUser: findGoogleUser,
        searchUsersByUsername: searchUsersByUsername
    };

    return api;

    function searchUsersByUsername(searchtext){
        return User.find({'$or':[
                            {'username':{'$regex':searchtext, '$options':'i'}},
                            {'firstName':{'$regex':searchtext, '$options':'i'}},
                            {'lastName':{'$regex':searchtext, '$options':'i'}}]}).sort('-dateCreated');
    }

    function findGoogleUser(id){
        return User.findOne({"google.id": id});
    }

    function findFacebookUser(id){
        return User.findOne({"facebook.id": id});
    }

    function findUserByUsername(username){
        return User.findOne({username: username});
    }

    function findUserByID(uid){
        return User.findById(uid);
    }

    function findUserByCredentials(username , password){
        return User.findOne({username: username, password: password});
    }

    function createUser(user){
        return User.create(user);
    }

    function deleteUser(uid){
        return User.remove({_id: uid});
    }

    function updateUser(uid , newuser){
        delete newuser._id;

        return User
            .update({_id: uid},{
                $set: newuser
            });
    }
}