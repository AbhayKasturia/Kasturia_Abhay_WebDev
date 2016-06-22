/**
 * Created by Abhay on 6/21/2016.
 */

module.exports = function(app , models) {

    var questionModel = models.projectQuestionModel;

    var answerModel = models.projectAnswerModel;
    
    app.post("/api/project/newanswer", newAnswer);

    function addAnswerByQuestionID(qid,new_answer,question,uid,res){
        questionModel
            .findQuestionByID(qid)
            .then(
                function(res_question){
                    if(res_question){
                        addAnswer(res_question,new_answer);
                    }
                    else{
                        addQuestionthenAnswer(qid,new_answer,question,uid);
                    }
                },
                function(err){
                    addQuestionthenAnswer(qid,new_answer,question,uid);
                }
            );
    }

    function newAnswer(req,res) {
        var send_objects = req.body;
        var question = send_objects.question;
        var user_answer = send_objects.user_answer;
        var uid = send_objects.uid;

        var ques_found = false;

        var new_answer = {
            body: user_answer,
            answered_by: uid
        };

        questionModel
            .findQuestionByStackID(question.question_id)
            .then(
                function(res_question){
                    if(res_question){
                        addAnswer(res_question,new_answer);
                    }
                    else{
                        addAnswerByQuestionID(question.question_id,new_answer,question,uid);
                    }
                }
            );
    }



    function addAnswer(question,new_answer,res){
        new_answer.question_id = question._id;
        answerModel
            .createAnswer(new_answer)
            .then(
                function(answer){
                    var answers = question.answers;
                    answers.push(answer._id);
                    question.answers = answers;
                    return questionModel
                        .updateQuestion(question._id,question)
                },
                function(err){
                    return err;
                }
            )
            .then(
                function(question){
                    res.send(200);
                },
                function(err){
                    return err;
                }
            );
    }

    function addQuestionthenAnswer(question_id,new_answer,question,uid,res){
        var new_question={
            stackQuestion: true,
            title: question.title,
            body: question.body,
            posted_by: uid,
            stackoverflow: {
                id: question_id
            },
            tags: question.tags
        }

        questionModel
            .createQuestion(new_question)
            .then(
                function(question){
                    addAnswer(question,new_answer);
                }
            );
    }
};