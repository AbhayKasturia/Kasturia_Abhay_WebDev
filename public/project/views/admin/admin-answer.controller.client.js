/**
 * Created by Abhay on 6/23/2016.
 */
/**
 * Created by Abhay on 5/24/2016.
 */
(function(){
    angular
        .module("FindAnswers")
        .controller("AdminAnswerController",AdminAnswerController);

    function AdminAnswerController($location , $routeParams , $sce, UserService , QuestionService, AnswerService) {      /* route paramaters can be retrieved using this */
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.getSafeHTML = getSafeHTML;
        vm.findQuestionByID= findQuestionByID;
        vm.qa=[];
        var q_answers=[];

        vm.init_questions = init_questions;
        vm.answers= [];

        function init() {
            init_answers();
        }

        init();

        function findQuestionByID(qid){



            QuestionService
                .searchQuestionByID(qid)
                .then(
                    function(question){
                        title = question.body.title;
                    },function(err){
                        title = "Question might have been deleted , please delete the answer as well";
                    }
                );

            return (title);
        }

        function init_answers(){
            var title;

            AnswerService
                .findAllUncheckedAnswers()
                .then(
                    function(answers){
                        if(answers) {
                            q_answers = answers.data;
                            init_questions();
                        }
                        else
                            vm.message = "There are no answers for review now, check back later";
                    },function(err){
                        vm.error = "There was some error retrieving answers , check back later";
                    }
                );
        }

        function init_questions(){
            if(q_answers.length >0)
            {
                var answer = q_answers.pop();
                QuestionService
                    .searchQuestionByID(answer.question_id)
                    .then(
                        function(question){
                            var title = question.data.title;
                            answer.question_title = title;
                            vm.answers.push(answer);
                            init_questions();
                        },function(err){
                            var title = "Question might have been deleted , please delete the answer as well";
                            answer.question_title = title;
                            vm.answers.push(answer);
                            init_questions();
                        }
                    );
            }
        }

        function getSafeHTML(text)
        {
            return $sce.trustAsHtml(text);
        }


    }})();