
(function(){
    angular
        .module("FindAnswers")
        .factory("StackEService", StackEService);

    function StackEService($http) {
        var api = {
            searchQuestions: searchQuestions,
            searchQuestionbyID: searchQuestionbyID,
            searchAnswersByQuestionID: searchAnswersByQuestionID
        };
        return api;

        function searchQuestionbyID(qid) {
            url = "https://api.stackexchange.com/2.2/questions/{ids}?order=desc&sort=activity&site=stackoverflow&filter=withbody";
            url = url.replace("{ids}",qid);

            return $http.get(url);
        }



        function searchAnswersByQuestionID(qid){
            url = "https://api.stackexchange.com/2.2/questions/{ids}/answers?order=desc&sort=activity&site=stackoverflow&filter=withbody";
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