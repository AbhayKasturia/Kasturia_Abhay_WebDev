/**
 * Created by Abhay on 6/8/2016.
 */

// encapsulate all operations with the database
// this module gives us a high level api to interact with the database

module.exports = function(){

    var mongoose = require("mongoose");

    var UserSchema = require("./user.schema.server")();

    var User= mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByID: findUserByID,
        findUserByCredentials: findUserByCredentials
    };

    return api;

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
                $set: user
            });
    }
}