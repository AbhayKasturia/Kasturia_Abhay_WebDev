
(function(){
    angular
        .module("FindAnswers")
        .controller("QuestionInteractController",QuestionInteractController);

    function QuestionInteractController($sce, $location,$routeParams,StackEService) {
        var vm = this;
        vm.uid=$routeParams.uid;
        vm.qid=$routeParams.qid;

        vm.searchQuestionbyID = searchQuestionbyID;

        function init() {
            searchQuestionbyID(vm.qid);
            searchAnswersByQuestionID(vm.qid);
        }

        init();

        function searchQuestionbyID(qid) {
            StackEService
                .searchQuestionbyID(qid)
                .then(
                    function(response){
                        console.log(response.data.items[0]);
                        vm.question = response.data.items[0];
                    }
                )
        }

        function searchAnswersByQuestionID(qid) {
            StackEService
                .searchAnswersByQuestionID(qid)
                .then(
                    function(response){
                        console.log(response);
                        vm.answers = response.data.items;
                    });
        }

        function getSafeHTML(text)
        {
            return $sce.trustAsHtml(text);
        }
    }
})();