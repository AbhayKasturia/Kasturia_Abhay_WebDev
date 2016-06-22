/**
 * Created by Abhay on 6/21/2016.
 */

/**
 * Created by Abhay on 5/26/2016.
 */
(function (){
    angular
        .module("FindAnswers")
        .factory("QuestionService",QuestionService);   /*service and factory method for singleton - same thing but syntax different*/

    function QuestionService($http) {
        var api = {
            newAnswer: newAnswer
        };

        return api;

        function newAnswer(question, user_answer , uid) {
            var url = "/api/project/newanswer";
            var send_objects = {
                question: question,
                user_answer: user_answer,
                uid: uid
            };
            return $http.post(url, send_objects);
        }
    }
})();