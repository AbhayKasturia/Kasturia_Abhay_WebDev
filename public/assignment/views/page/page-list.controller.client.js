/**
 * Created by Abhay on 5/28/2016.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController)

    function PageListController($routeParams , PageService) {      /* dependency injection */
        var vm= this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        

        function init() {
            vm.pages = PageService.findPageByWebsiteID(vm.wid);
        }
        init();
    }
})();