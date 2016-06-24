/**
 * Created by Abhay on 6/23/2016.
 */
/**
 * Created by Abhay on 5/24/2016.
 */
(function(){
    angular
        .module("FindAnswers")
        .controller("AdminQuestionController",AdminQuestionController);

    function AdminQuestionController($location , $routeParams , $sce, UserService , $rootScope , QuestionService) {      /* route paramaters can be retrieved using this */
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.qid = $routeParams.qid;
        vm.getSafeHTML = getSafeHTML;
        vm.checked = checked;
        vm.deleteQuestion = deleteQuestion;

        function init() {
            init_question();
        }

        init();

        function checked(){
            vm.question.is_checked= true;
            
            QuestionService
                .updateQuestion(vm.question._id,vm.question)
                .then(
                    function(question){
                            $location.url("/user/"+vm.uid+"/admin/question");
                    },function(err){
                        vm.error="There was error marking this question  , please try again later";
                    }
                );
        }
        
        function deleteQuestion(){
            
            QuestionService
                .deleteQuestion(vm.qid)
                .then(
                    function(response){
                        $location.url("/user/"+vm.uid+"/admin/question");
                    },function(err){
                        vm.error="There was error deleting this question  , please try again later";
                    }
                );
        }

        function init_question(){
            QuestionService
                .searchQuestionByID(vm.qid)
                .then(
                    function(question){
                        if(question) {
                            vm.question = question.data;
                            return;
                        }
                        else{
                            vm.error = "There was some error retrieving questions , check back later";
                            return;
                        }
                    },function(err){
                        vm.error = "There was some error retrieving questions , check back later";
                        return;
                    }
                );
        }

        function getSafeHTML(text)
        {
            return $sce.trustAsHtml(text);
        }


    }})();