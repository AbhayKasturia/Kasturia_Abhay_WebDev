/**
 * Created by Abhay on 5/26/2016.
 */

/**
 * Created by Abhay on 5/26/2016.
 */
(function (){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);   /*service and factory method for singleton - same thing but syntax different*/

    function WebsiteService($http) {
        var api = {
            findWebsiteByUser: findWebsiteByUser,
            findWebsiteByID: findWebsiteByID,
            updateWebsite: updateWebsite,
            createWebsite: createWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(developerId , newWebsite) {
            var url = "/api/user/"+developerId+"/website" ;
            return $http.post(url,newWebsite);
        }

        function deleteWebsite(wid) {
            var url = "/api/website/"+ wid;
            return $http.delete(url);
        }

        function updateWebsite(wid,newWebsite) {
            var url = "/api/website/" + wid;
            return $http.put(url, newWebsite);
        }

        function findWebsiteByID(wid) {
            var url = "/api/website/" + wid;
            return $http.get(url);
        }

        function findWebsiteByUser(uid) {
            var url = "/api/user/"+uid+"/website" ;
            return $http.get(url);
        }

    }
})();