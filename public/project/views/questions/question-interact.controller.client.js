
(function(){
    angular
        .module("FindAnswers")
        .controller("QuestionInteractController",QuestionInteractController);

    function QuestionInteractController($sce, $location,$routeParams,StackEService,QuestionService,AnswerService,UserService) {
        var vm = this;
        vm.uid=$routeParams.uid;
        vm.qid=$routeParams.qid;

        vm.searchQuestionbyID = searchQuestionbyID;
        vm.searchAnswersByQuestionID = searchAnswersByQuestionID;
        vm.saveAnswer = saveAnswer;
        vm.cancelAnswer = cancelAnswer;
        vm.getSafeHTML = getSafeHTML;
        vm.searchQuestionInDB = searchQuestionInDB;
        vm.updateAnswer = updateAnswer;
        vm.updateQuestion = updateQuestion;

        function init() {
            vm.answers=[];
            vm.temp_answers=[];
            cancelAnswer();
            searchQuestionbyID(vm.qid);
            searchAnswersByQuestionID(vm.qid);
            searchAnswersByQuestionIDinDB(vm.qid);
        }

        init();

        function updateAnswer(answer){
            delete answer.asked_by;
            AnswerService
                .updateAnswer(answer._id,answer)
                .then(
                function(stats){
                    init();
                },function(err){
                    vm.error="Could not update , please try again later!";
                }
            );
        }

        function updateQuestion(question){
            delete question.asked_by;
            QuestionService
                .updateQuestion(question._id,question)
                .then(
                    function(stats){
                        init();
                    },function(err){
                        vm.error="Could not update , please try again later!";
                    }
                );
        }

        function cancelAnswer(){
            vm.user_answer = "";
        }

        function saveAnswer(){
            console.log(vm.question);

            QuestionService
                .newAnswer(vm.question,vm.user_answer,vm.uid)
                .then(function(response){
                        if(vm.question._id)
                            init();
                        else
                            QuestionService
                                .searchQuestionByStackID(vm.question.question_id)
                                .then(
                                    function(question){
                                        vm.qid=question.data._id;
                                        init();
                                    },function(err){
                                        vm.error = "Error creating Answer";
                                    }
                                )
                    },function(err){
                        vm.error = "Error creating Answer";
                    }
                );
        }

        function searchQuestionbyID(qid) {
            StackEService
                .searchQuestionbyID(qid)
                .then(
                    function(response){
                        if(response){
                            vm.question = response.data.items[0];
                            vm.question.asked_by="StackOverflow";
                        }
                        else
                            searchQuestionInDB(qid);
                    },function(err){
                        searchQuestionInDB(qid);
                    }
                );
        }
        
        function searchQuestionInDB(qid){
            QuestionService
                .searchQuestionByID(qid)
                .then(
                    function(question){
                        if(question){
                            vm.question = question.data;
                            UserService
                                .findUserByID(vm.question.posted_by)
                                .then(
                                    function(user){
                                        vm.question.asked_by=user.data.username;
                                    }
                                )
                        }
                    }
                );
        }

        function searchAnswersByQuestionID(qid) {
            StackEService
                .searchAnswersByQuestionID(qid)
                .then(
                    function(response){
                        vm.answers=response.data.items;
                    });
        }

        function searchAnswersByQuestionIDinDB(qid){
            AnswerService
                .searchAnswersByQuestionID(qid)
                .then(
                    function(answers){
                        if(answers && answers!="0"){
                            vm.answers=vm.answers.concat(answers.data);
                            vm.temp_answers = vm.answers;
                            vm.asnwers=[];
                            init_asked_by(vm.temp_answers.length);
                        }
                    },function(err){
                        vm.message = "Answer not in DB";
                    });
        }

        function init_asked_by(n){
            if(n >0)
            {
                var answer = vm.temp_answers[n-1];
                UserService
                    .findUserByID(answer.answered_by)
                    .then(
                        function(user){
                            answer.asked_by = user.data.username;
                            vm.answers.push(answer);
                            init_asked_by(n-1);
                        },function(err){
                            answer.asked_by = "StackOverflow";
                            vm.answers.push(answer);
                            init_asked_by(n-1);
                        }
                    );
            }
        }

        function getSafeHTML(text)
        {
            return $sce.trustAsHtml(text);
        }
    }
})();