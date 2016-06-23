/**
 * Created by Abhay on 6/8/2016.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        facebook: {
            token: String,
            id: String,
            displayName: String
        },
        google: {
            token: String,
            id: String,
            displayName: String
        },
        lastName: String,
        email: String,
        phone: Number,
        followed_by:[{type: mongoose.Schema.ObjectId, ref:"ProjectUser"}],
        following:[{type: mongoose.Schema.ObjectId, ref:"ProjectUser"}],
        dob: Date,   // or this {type: Date}
        dateCreated: {type: Date, default: Date.now()}
    },{collection: "project.user"});

    return UserSchema;
};
