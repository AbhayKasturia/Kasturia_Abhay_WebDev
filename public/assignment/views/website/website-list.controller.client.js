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
            WebsiteService
                .findWebsiteByUser($routeParams.uid)
                .then(function(response){
                vm.websites = response.data;
            });
        }
        init();

    }
})();