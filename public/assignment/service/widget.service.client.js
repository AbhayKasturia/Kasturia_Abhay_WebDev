/**
 * Created by Abhay on 5/26/2016.
 */
(function (){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);   /*service and factory method for singleton - same thing but syntax different*/

    function WidgetService($http) {
        var api = {
            createWidget: createWidget,
            findWidgetByPageID: findWidgetByPageID,
            findWidgetByID: findWidgetByID,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(pid , newWidget) {
            var url = "/api/page/"+pid+"/widget" ;
            return $http.post(url , newWidget);
        }

        function findWidgetByPageID(pid) {
            var url = "/api/page/"+pid+"/widget" ;
            return $http.get(url);
        }

        function findWidgetByID(wgid) {
            var url = "/api/widget/" + wgid;
            return $http.get(url);
        }

        function updateWidget(wgid,newWidget) {
            var url = "/api/widget/" + wgid;
            return $http.put(url , newWidget);
        }

        function deleteWidget(wgid) {
            var url = "/api/widget/" + wgid;
            return $http.delete(url);
        }
    }
})();