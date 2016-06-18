/**
 * Created by Abhay on 6/5/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("YahooService", YahooService);

    var key = "dj0yJmk9TXlnUDYzdWt4UlNFJmQ9WVdrOVlYbHVhblJoTTJVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0xMQ--";
    var secret = "641f92f23515cb223b2f235c1541db63b9c2a180";
    var urlBase = "http://answers.yahooapis.com/AnswersService/V1/getByCategory?appid=YahooDemo&category_id=CAT_ID";

    function FlickrService($http) {
        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        function searchQuestions(searchTerm) {
            var url = urlBase
                .replace("appid", key)
                .replace("CAT_ID","396545664");
            return $http.get(url);
        }
    }
})();