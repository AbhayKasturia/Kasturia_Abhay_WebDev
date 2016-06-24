/**
 * Created by Abhay on 6/23/2016.
 */
/**
 * Created by Abhay on 5/24/2016.
 */
(function(){
    angular
        .module("FindAnswers")
        .controller("AdminHomeController",AdminHomeController);

    function AdminHomeController($location , $routeParams , $sce, UserService , $rootScope , QuestionService) {      /* route paramaters can be retrieved using this */
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.getSafeHTML = getSafeHTML;

        function init() {
            init_questions();
        }

        init();

        function init_questions(){
            QuestionService
                .findAllUncheckedQuestions()
                .then(
                    function(questions){
                        if(questions) {
                            vm.questions = questions.data;
                        }
                        else
                            vm.message = "There are no questions for review now, check back later";
                    },function(err){
                        vm.error = "There was some error retrieving questions , check back later";
                    }
                );
        }

        function getSafeHTML(text)
        {
            return $sce.trustAsHtml(text);
        }


    }})();