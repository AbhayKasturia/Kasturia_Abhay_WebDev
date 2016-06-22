
(function(){
    angular
        .module("FindAnswers")
        .controller("QuestionInteractController",QuestionInteractController);

    function QuestionInteractController($sce, $location,$routeParams,StackEService,QuestionService,AnswerService) {
        var vm = this;
        vm.uid=$routeParams.uid;
        vm.qid=$routeParams.qid;
        vm.answers=[];

        vm.searchQuestionbyID = searchQuestionbyID;
        vm.searchAnswersByQuestionID = searchAnswersByQuestionID;
        vm.saveAnswer = saveAnswer;
        vm.cancelAnswer = cancelAnswer;
        vm.getSafeHTML = getSafeHTML;
        vm.searchQuestionInDB = searchQuestionInDB;

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
                        if(response)
                            vm.question = response.data.items[0];
                        else
                            searchQuestionInDB(qid);
                    },function(err){
                        searchQuestionInDB(qid);
                    }
                )
        }
        
        function searchQuestionInDB(qid){
            QuestionService
                .searchQuestionByID(qid)
                .then(
                    function(question){
                        if(question){
                            vm.question = question.data;
                            vm.question.body = question.data.text;
                        }
                    }
                );
        }

        function searchAnswersByQuestionID(qid) {
            StackEService
                .searchAnswersByQuestionID(qid)
                .then(
                    function(response){
                        vm.answers.push(response.data.items);
                    });
            
            AnswerService
                .searchAnswersByQuestionID(qid)
                .then(
                    function(response){
                        if(response && response!="0")
                            vm.answers.push(response);
                    }
                )
        }

        function getSafeHTML(text)
        {
            return $sce.trustAsHtml(text);
        }
    }
})();