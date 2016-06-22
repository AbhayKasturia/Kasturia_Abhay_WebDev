
(function(){
    angular
        .module("FindAnswers")
        .controller("QuestionNewController",QuestionNewController);

    function QuestionNewController($sce, $location,$routeParams,QuestionService,AnswerService) {
        var vm = this;
        vm.uid=$routeParams.uid;

        vm.saveQuestion = saveQuestion;
        vm.cancelQuestion = cancelQuestion;

        function cancelQuestion(){
            vm.question = "";

        }

        function saveQuestion(){
            console.log(vm.question);

            QuestionService
                .newquestion(vm.question,vm.uid)
                .then(
                    function(question){
                        if(question)
                        {
                            $location.url("/user/"+vm.uid+"/question/"+question._id);
                        }
                        else{
                            vm.error = "Cannot create question , please try again";
                        }
                    }, function(err){
                        vm.error = "Cannot create question , please try again";
                    }
                )
        }
    }
})();