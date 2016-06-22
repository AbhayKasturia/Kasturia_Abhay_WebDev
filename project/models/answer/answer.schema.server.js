/**
 * Created by Abhay on 6/8/2016.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var AnswerSchema = mongoose.Schema({
        question_id: {type: mongoose.Schema.ObjectId, ref:"ProjectQuestion"},
        body: String,
        answered_by: {type: mongoose.Schema.ObjectId, ref:"ProjectUser"},
        is_checked: {type: Boolean,default: false},
        dateCreated: {type: Date, default: Date.now()}
    },{collection: "project.answer"});

    return AnswerSchema;
};
