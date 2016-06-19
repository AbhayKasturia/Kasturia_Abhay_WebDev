
(function(){
    angular
        .module("FindAnswers")
        .controller("QuestionInteractController",QuestionInteractController);

    function QuestionInteractController($location,$routeParams,StackEService) {
        var vm = this;
        vm.uid=$routeParams.uid;
        vm.qid=$routeParams.qid;

        vm.searchQuestionByID = searchQuestionByID;

        function init() {
            searchQuestionByID(vm.qid);
        }

        init();

        function searchQuestionByID(qid) {
            StackEService
                .searchQuestionByID(qid)
                .then(
                    function(response){
                        console.log(response);
                        vm.question = response.data.items;
                    });
        }
    }
})();