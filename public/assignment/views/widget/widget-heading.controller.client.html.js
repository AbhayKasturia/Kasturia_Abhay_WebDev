/**
 * Created by Abhay on 5/28/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetHeaderController",WidgetHeaderController)

    function WidgetEditController($sce , $location , $routeParams , WidgetService) {      /* dependency injection */
        var vm= this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        function init() {
            vm.widget = WidgetService.findWidgetByID(vm.wgid)
        }
        init();
    }
})();