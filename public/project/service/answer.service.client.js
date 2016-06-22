/**
 * Created by Abhay on 6/21/2016.
 */

/**
 * Created by Abhay on 5/26/2016.
 */
(function (){
    angular
        .module("FindAnswers")
        .factory("AnswerService",AnswerService);   /*service and factory method for singleton - same thing but syntax different*/

    function AnswerService($http) {
        var api = {
            searchAnswersByQuestionID: searchAnswersByQuestionID
        };

        return api;

        function searchAnswersByQuestionID(qid) {
            var url = "/api/project/findAnswerByQuestion";

            return $http.get(qid);
        }
    }
})();