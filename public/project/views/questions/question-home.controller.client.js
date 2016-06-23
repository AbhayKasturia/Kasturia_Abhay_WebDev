
(function(){
    angular
        .module("FindAnswers")
        .controller("QuestionHomeController",QuestionHomeController);

    function QuestionHomeController($location,$routeParams,StackEService,QuestionService) {
        var vm = this;
        vm.uid=$routeParams.uid;
        // vm.wid=$routeParams.wid;
        // vm.pid=$routeParams.pid;
        // vm.wgid=$routeParams.wgid;

        vm.searchFeaturedQuestions = searchFeaturedQuestions;
        vm.searchQuestions = searchQuestions;

        function init() {
            searchFeaturedQuestions(1);
        }

        init();

        function searchQuestions(searchText , pageno) {
            
            if(searchText === "")
                searchFeaturedQuestions(pageno);
            else {
                QuestionService
                    .searchQuestionsByText(searchText , pageno)
                    .then(
                        function(questions){
                            vm.questions = questions.data;
                        }
                    )
                
                // if(vm.questions.length>0 && )
                //     var stack_pageno = 1;
                // else
                //     stack_pageno
                //
                // if(vm.questions.length < 10)
                //     StackEService
                //         .searchQuestionsByText(searchText , pageno , "")
                //         .then(
                //             function(response){
                //                 console.log(response);
                //                 vm.questions.push(response.data.items);
                //             });
                    
            }        
        }

        function searchFeaturedQuestions(pageno) {
            StackEService
                .searchQuestions("",pageno,"")
                .then(
                    function(response){
                        console.log(response);
                         vm.questions = response.data.items;
                    });
        }
    }
})();