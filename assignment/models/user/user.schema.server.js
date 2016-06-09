/**
 * Created by Abhay on 6/8/2016.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        dob: Date,   // or this {type: Date}
        dateCreated: {type: Date, default: Date.now()}
    },{collection: "assignment.user"});

    return UserSchema;
};
