/**
 * Created by Abhay on 6/5/2016.
 */
(function(){
    angular
        .module("FindAnswers")
        .factory("StackEService", StackEService);

    function StackEService($http) {
        var api = {
            searchQuestions: searchQuestions,
            searchQuestionByID: searchQuestionByID
        };
        return api;

        function searchQuestionByID(qid){
            url = "https://api.stackexchange.com/2.2/questions/{ids}/answers?order=desc&sort=activity&site=stackoverflow";
            url = url.replace("{ids}",qid);

            return $http.get(url);
        }

        function searchQuestions(searchTerm,page_number,tags) {

            var url = "https://api.stackexchange.com/2.2/questions/featured?page=1&pagesize=10&order=desc&sort=activity&tagged=TAGS&site=stackoverflow";

            url = url
                .replace("page=1", "page="+page_number)
                .replace("TAGS",tags);

            if(tags === "")
                url = url.replace("&tagged=","");

            return $http.get(url);
        }
    }
})();