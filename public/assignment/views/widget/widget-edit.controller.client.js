/**
 * Created by Abhay on 5/28/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController",WidgetEditController)

    function WidgetEditController($sce , $location , $routeParams , WidgetService) {      /* dependency injection */
        var vm= this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;

        function init() {
            WidgetService
                .findWidgetByID(vm.wgid)
                .then(function(response){
                    vm.widget = response.data;
                });
        }
        init();

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.wgid)
                .then(function(response){
                    if(response.data)
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget");
                    else
                        vm.error = "Unable to delete";
                });
        }

        function updateWidget(newWidget) {
            WidgetService
                .updateWidget(vm.wgid,newWidget)
                .then(function(response){
                    if(response.data)
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget");
                    else
                        vm.error = "Unable to delete";
                });
        }
    }
})();