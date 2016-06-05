/**
 * Created by Abhay on 5/26/2016.
 */

/**
 * Created by Abhay on 5/26/2016.
 */
(function (){
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);   /*service and factory method for singleton - same thing but syntax different*/

    function PageService($http) {
        var api = {
            findPageByWebsiteID: findPageByWebsiteID,
            findPageByID: findPageByID,
            updatePage: updatePage,
            createPage: createPage,
            deletePage: deletePage
        };
        return api;

        function findPageByWebsiteID(wid) {
            var url = "/api/website/"+ wid + "/page" ;
            return $http.get(url);
        }

        function findPageByID(pid) {
            var url = "/api/page/" + pid;
            return $http.get(url);
        }

        function updatePage(pid,newPage) {
            var url = "/api/page/" + pid;
            return $http.put(url , newPage);
        }

        function deletePage(pid) {
            var url = "/api/page/" + pid;
            return $http.delete(url);
        }

        function createPage(wid , newPage) {
            var url = "/api/website/"+ wid +"/page" ;
            return $http.post(url , newPage);
        }
    }
})();