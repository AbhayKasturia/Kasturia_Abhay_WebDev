/**
 * Created by Abhay on 6/21/2016.
 */

module.exports = function(app , models) {

    var questionModel = models.projectQuestionModel;

    var answerModel = models.projectAnswerModel;
    
    app.get("/api/project/findAnswerByQuestion", findAnswerByQuestion);
    app.get("/api/uncheckedanswers",findAllUncheckedAnswers);
    app.post("/api/project/updateanswer",updateAnswer);
    app.delete("/api/project/answer/:qid",deleteAnswer);

    function deleteAnswer(req, res) {
        var id = req.params.aid;

        answerModel
            .deleteAnswer(id)
            .then(
                function(stats){
                    console.log(stats);
                    res.send(200);
                },
                function(error){
                    res.statusCode(404).send(err);
                }
            );
    }

    function updateAnswer(req,res){
        var newanswer = req.body;

        answerModel
            .updateAnswer(newanswer._id , newanswer)
            .then(
                function(answer){
                    if(answer){
                        res.json(answer);
                    }
                    else
                        res.sendStatus(404);
                },function(err){
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllUncheckedAnswers(req,res){
        answerModel
            .findAllUncheckedAnswers()
            .then(
                function(answers){
                    if(answers){
                        res.json(answers);
                    }
                    else
                        res.statusCode(404);
                },function(err){
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAnswerByQuestion(req,res){
        var qid = req.body;

        var mongo_qid="";

        questionModel
            .findQuestionByStackID(qid)
            .then(
                function(question){
                    if(question)
                        mongo_qid=question._id;
                },
                function(err){
                    res.send(404);
                }
            )

        questionModel
            .findQuestionByID(qid)
            .then(
                function(question){
                    if(question){
                        mongo_qid=question.id;
                    }
                }
            )

        if(mongo_qid === "")
            res.json("0");
        else
           answerModel
               .findAnswerByQuestionID(mongo_qid)
               .then(
                   function(answers){
                       res.json(answers);
                   },
                   function(err){
                       res.json("0");
                   }
               )

    }
};