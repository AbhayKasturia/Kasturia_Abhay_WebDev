/**
 * Created by Abhay on 6/8/2016.
 */

// entry base to connect to database

module.exports = function(){

    var mongoose = require("mongoose");

    mongoose.connect('mongodb://localhost/cs5610summer1');

    var models = {
        userModel: require("./user/user.model.server.js")()
        // we need to add other models here as well
    };
    return models;
};
