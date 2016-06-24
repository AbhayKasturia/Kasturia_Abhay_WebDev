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

        function init() {
            init_answers();
        }

        init();

        function findQuestionByID(qid){

            var title;

            QuestionService
                .searchQuestionByID(qid)
                .then(
                    function(question){
                        title = question.body.title;
                    },function(err){
                        title = "Question might have been deleted , please delete the answer as well";
                    }
                )

            return (title);
        }

        function init_answers(){
            AnswerService
                .findAllUncheckedAnswers()
                .then(
                    function(answers){
                        if(answers) {
                            vm.answers = answers.data;
                        }
                        else
                            vm.message = "There are no answers for review now, check back later";
                    },function(err){
                        vm.error = "There was some error retrieving answers , check back later";
                    }
                );
        }

        function getSafeHTML(text)
        {
            return $sce.trustAsHtml(text);
        }


    }})();