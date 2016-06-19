
(function(){
    angular
        .module("FindAnswers")
        .controller("QuestionHomeController",QuestionHomeController);

    function QuestionHomeController($location,$routeParams,StackEService) {
        var vm = this;
        vm.uid=$routeParams.uid;
        // vm.wid=$routeParams.wid;
        // vm.pid=$routeParams.pid;
        // vm.wgid=$routeParams.wgid;

        vm.searchQuestions = searchQuestions;

        function init() {
            searchQuestions("",1);
        }

        init();

        function searchQuestions(searchText) {
            StackEService
                .searchQuestions(searchText,"1","")
                .then(
                    function(response){
                        console.log(response);
                        vm.questions = response.data.items;
                    });
        }

        function searchQuestions(searchText , pageno) {
            StackEService
                .searchQuestions(searchText,pageno,"")
                .then(
                    function(response){
                        console.log(response);
                         vm.questions = response.data.items;
                    });
        }
    }
})();