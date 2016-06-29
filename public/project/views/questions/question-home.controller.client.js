
(function(){
    angular
        .module("FindAnswers")
        .controller("QuestionHomeController",QuestionHomeController);

    function QuestionHomeController($location,$sce,$filter,$routeParams,StackEService,QuestionService,$window) {
        var vm = this;
        vm.uid=$routeParams.uid;
        vm.getSafeHTML = getSafeHTML;
        vm.searching=false;
        vm.paginate=paginate;
        vm.goBack=goBack;

        vm.searchFeaturedQuestions = searchFeaturedQuestions;
        vm.searchQuestions = searchQuestions;

        function init() {
            vm.pageno=1;
            vm.ques={
                searchText:null
            };
            vm.userid_q_search = false;
            vm.ques.searchText = "";
            vm.ques.searchText = $window.sessionStorage.getItem("quesSearch");
            if ($window.sessionStorage.getItem("quesSearchByUser"))
            {
                vm.username = $window.sessionStorage.getItem("quesSearchByUser_Username");
                searchQuestionsByUser($window.sessionStorage.getItem("quesSearchByUser"));
            }
            else if(vm.ques.searchText!=""){
                searchQuestions(vm.ques.searchText, 1);
            }
            else {
                searchFeaturedQuestions(1);
            }
        }

        init();

        function goBack(){
            $window.sessionStorage.removeItem("quesSearchByUser");
            $window.sessionStorage.removeItem("quesSearchByUser_Username");
            $window.history.back();
        }

        function searchQuestionsByUser(uid){
            QuestionService
                .searchQuestionByUserID(uid)
                .then(
                    function(questions){
                        vm.all_questions = questions.data;
                        for (var i in vm.all_questions){
                            vm.all_questions[i].answer_count=vm.all_questions[i].answers.length;
                            vm.all_questions[i].creation_date=vm.all_questions[i].dateCreated;
                            vm.all_questions[i].question_id=vm.all_questions[i]._id;
                        }
                        vm.userid_q_search = true;
                        vm.questions=vm.all_questions;
                    },function(err){
                        vm.error = "Unable to fetch questions and answers";
                    }
                );
        }

        function searchQuestions(searchText , pageno) {
            $window.sessionStorage.setItem("quesSearch",searchText);
            
            if(searchText === "")
                searchFeaturedQuestions(pageno);
            else {
                QuestionService
                    .searchQuestionsByText(searchText , pageno)
                    .then(
                        function(questions) {
                            vm.all_questions = questions.data;
                            for (var i in vm.all_questions){
                                vm.all_questions[i].answer_count=vm.all_questions[i].answers.length;
                                vm.all_questions[i].creation_date=vm.all_questions[i].dateCreated;
                                vm.all_questions[i].question_id=vm.all_questions[i]._id;
                            }
                            vm.searching = true;
                            StackEService
                                .searchQuestionByText(searchText)
                                .then(
                                    function (response) {
                                        vm.all_questions = vm.all_questions.concat(response.data.items);
                                        for (var i in vm.all_questions) {
                                            var utcSeconds = vm.all_questions [i].creation_date;
                                            var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                                            d.setUTCSeconds(utcSeconds);
                                            vm.all_questions [i].creation_date = d;
                                        }
                                        paginate(vm.pageno);
                                    });
                        });
            }
        }

        function searchFeaturedQuestions(pageno) {
            vm.pageno = pageno;
            StackEService
                .searchQuestions("", vm.pageno,"")
                .then(
                    function(response){
                        console.log(response);
                         vm.questions = response.data.items;
                        for(var i in vm.questions){
                            var utcSeconds = vm.questions[i].creation_date;
                            var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                            d.setUTCSeconds(utcSeconds);
                            vm.questions[i].creation_date= d;
                        }
                    });
        }

        function paginate(pageno){
            vm.pageno =pageno;
            vm.questions=[];
            if(vm.ques.searchText === ""){
                searchFeaturedQuestions(pageno);
            }
            else {
                for(var i in vm.all_questions){
                    if(i>=((vm.pageno*10)-10) && i < ((vm.pageno)*10))
                        vm.questions.push(vm.all_questions[i]);
                }
            }
        }

        function getSafeHTML(text)
        {
            var content = $filter('limitTo')(text, 150);
            return  $sce.trustAsHtml(content);
        }
    }
})();