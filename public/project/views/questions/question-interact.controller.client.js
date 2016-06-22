
(function(){
    angular
        .module("FindAnswers")
        .controller("QuestionInteractController",QuestionInteractController);

    function QuestionInteractController($sce, $location,$routeParams,StackEService,QuestionService) {
        var vm = this;
        vm.uid=$routeParams.uid;
        vm.qid=$routeParams.qid;

        vm.searchQuestionbyID = searchQuestionbyID;
        vm.searchAnswersByQuestionID = searchAnswersByQuestionID;
        vm.saveAnswer = saveAnswer;
        vm.cancelAnswer = cancelAnswer;
        vm.getSafeHTML = getSafeHTML;

        function init() {
            searchQuestionbyID(vm.qid);
            searchAnswersByQuestionID(vm.qid);
        }

        init();

        function cancelAnswer(){
            vm.user_answer = "";
        }

        function saveAnswer(){
            console.log(vm.question);

            QuestionService
                .newAnswer(vm.question,vm.user_answer,vm.uid)
                .then(
                    function(response){
                        init();
                    }
                )
        }

        function searchQuestionbyID(qid) {
            StackEService
                .searchQuestionbyID(qid)
                .then(
                    function(response){
                        vm.question = response.data.items[0];
                    }
                )
        }

        function searchAnswersByQuestionID(qid) {
            StackEService
                .searchAnswersByQuestionID(qid)
                .then(
                    function(response){
                        vm.answers = response.data.items;
                    });
        }

        function getSafeHTML(text)
        {
            return $sce.trustAsHtml(text);
        }
    }
})();