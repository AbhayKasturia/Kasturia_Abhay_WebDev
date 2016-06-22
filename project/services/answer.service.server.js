/**
 * Created by Abhay on 6/21/2016.
 */

module.exports = function(app , models) {

    var questionModel = models.projectQuestionModel;

    var answerModel = models.projectAnswerModel;
    
    app.get("/api/project/findAnswerByQuestion", findAnswerByQuestion);

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