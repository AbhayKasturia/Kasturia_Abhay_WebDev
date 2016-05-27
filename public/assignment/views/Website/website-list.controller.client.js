/**
 * Created by Abhay on 5/24/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController)

    function WebsiteListController($routeParams , WebsiteService) {      /* dependency injection */
        var vm= this;
        vm.uid = $routeParams.uid;

        function init() {
            vm.websites = WebsiteService.findWebsiteByUserID($routeParams.uid);
        }
        init();

    }
})();