// encapsulate all operations with the database
// this module gives us a high level api to interact with the database

module.exports = function(){

    var mongoose = require("mongoose");

    var AnswerSchema = require("./answer.schema.server")();

    var Answer= mongoose.model("projectAnswerModel", AnswerSchema);

    var api = {
        createAnswer: createAnswer,
        deleteAnswer: deleteAnswer,
        updateAnswer: updateAnswer,
        findAnswerByQuestionID: findAnswerByQuestionID,
        findAnswersByUser: findAnswersByUser,
        findAnswerByID:findAnswerByID,
        findAllUncheckedAnswers: findAllUncheckedAnswers,
        searchAnswerByUserID: searchAnswerByUserID
    };

    return api;

    function searchAnswerByUserID(uid){
        return Answer.find({"answered_by": uid}).sort('-dateCreated');
    }

    function findAllUncheckedAnswers(){
        return Answer.find({"is_checked": false}).sort('-dateCreated');
    }

    function findAnswerByQuestionID(qid){
        return Answer.find({"question_id": qid});
    }

    function findAnswersByUser(uid){
        return Answer.find({answered_by: uid});
    }

    function findAnswerByID(aid){
        return Answer.findById(aid);
    }

    function createAnswer(answer){
        return Answer.create(answer);
    }

    function deleteAnswer(aid){
        return Answer.remove({_id: aid});
    }

    function updateAnswer(aid ,newanswer){
        delete newanswer._id;

        return Answer
            .update({_id: aid},{
                $set: newanswer
            });
    }
}