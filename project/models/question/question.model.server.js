// encapsulate all operations with the database
// this module gives us a high level api to interact with the database

module.exports = function(){

    var mongoose = require("mongoose");

    var QuestionSchema = require("./question.schema.server")();

    var Question= mongoose.model("projectQuestionModel", QuestionSchema);

    var api = {
        createQuestion: createQuestion,
        deleteQuestion: deleteQuestion,
        updateQuestion: updateQuestion,
        findQuestionByStackID: findQuestionByStackID,
        findQuestionsByUser: findQuestionsByUser,
        findQuestionByID:findQuestionByID,
        findQuestionByText: findQuestionByText,
        findAllUncheckedQuestions: findAllUncheckedQuestions
    };

    return api;

    function findAllUncheckedQuestions(){
        return Question.find({"is_checked": false}).sort('-dateCreated');
    }

    function findQuestionByText(searchtext){
        return Question.find({"body":{ "$regex": searchtext, "$options": "i"}}).sort('-dateCreated');
    }

    function findQuestionByStackID(id){
        return Question.findOne({"stackoverflow.id": id});
    }

    function findQuestionsByUser(uid){
        return Question.find({posted_by: uid});
    }

    function findQuestionByID(qid){
        return Question.findOne({ _id: qid});
    }

    function createQuestion(question){
        return Question.create(question);
    }

    function deleteQuestion(qid){
        return Question.remove({_id: qid});
    }

    function updateQuestion(qid , newquestion){
        delete newquestion._id;

        return Question
            .update({_id: qid},{
                $set: newquestion
            });
    }
}