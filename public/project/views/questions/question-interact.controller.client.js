
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
            searchAnswersByQuestionIDinDB(vm.qid);
        }

        init();

        function cancelAnswer(){
            vm.user_answer = "";
        }

        function saveAnswer(){
            console.log(vm.question);

            QuestionService
                .newAnswer(vm.question,vm.user_answer,vm.uid)
                .then(function(response){
                        init();
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
                        if(response)
                            vm.question = response.data.items[0];
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
                        if(answers && answers!="0")
                            vm.answers=vm.answers.concat(answers.data);
                    },function(err){
                        vm.message = "Answer not in DB";
                    });
        }

        function getSafeHTML(text)
        {
            return $sce.trustAsHtml(text);
        }
    }
})();