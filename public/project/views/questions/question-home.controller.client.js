
(function(){
    angular
        .module("FindAnswers")
        .controller("QuestionHomeController",QuestionHomeController);

    function QuestionHomeController($location,$sce,$filter,$routeParams,StackEService,QuestionService) {
        var vm = this;
        vm.uid=$routeParams.uid;
        vm.getSafeHTML = getSafeHTML;
        vm.searching=false;

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
                            vm.searching = true;
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

        function getSafeHTML(text)
        {
            var content = $filter('limitTo')(text, 150);
            content.concat("<p>...a..</p>");
            return  $sce.trustAsHtml(content);
        }
    }
})();