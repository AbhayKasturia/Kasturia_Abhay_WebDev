/**
 * Created by Abhay on 6/8/2016.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var QuestionSchema = mongoose.Schema({
        stackQuestion: {type: Boolean, required: true},
        title: {type: String, required: true},
        body: String,
        posted_by: {type: mongoose.Schema.ObjectId, ref:"ProjectUser"},
        is_answered: {type: Boolean, required: true,default: false},
        stackoverflow: {
            id: String
        },
        answers: [{type: mongoose.Schema.ObjectId, ref:"ProjectAnswer"}],
        is_checked: {type: Boolean,default: false},
        tags: [String],
        dateCreated: {type: Date, default: Date.now()}
    },{collection: "project.question"});

    return QuestionSchema;
};
