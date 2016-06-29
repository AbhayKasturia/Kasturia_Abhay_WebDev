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
            searchAnswersByQuestionID: searchAnswersByQuestionID,
            findAllUncheckedAnswers: findAllUncheckedAnswers,
            updateAnswer: updateAnswer,
            deleteAnswer: deleteAnswer,
            searchAnswerByUserID:searchAnswerByUserID
        };

        return api;

        function searchAnswerByUserID(uid) {
            var url = "/api/project/answer/user/"+ uid;
            console.log(url);
            return $http.get(url);
        }

        function deleteAnswer(id) {
            var url = "/api/project/answer/"+ id;

            return $http.delete(url);
        }

        function updateAnswer(aid,newanswer){
            var url = "/api/project/updateanswer";

            return $http.post(url, newanswer);
        }

        function findAllUncheckedAnswers(){
            var url ="/api/uncheckedanswers";

            return $http.get(url);
        }

        function searchAnswersByQuestionID(qid) {
            var url = "/api/project/findAnswerByQuestion/"+qid;

            return $http.get(url);
        }
    }
})();