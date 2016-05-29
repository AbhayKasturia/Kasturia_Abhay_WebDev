/**
 * Created by Abhay on 5/24/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController)

    function WidgetListController($sce , $location , $routeParams , WidgetService) {      /* dependency injection */
        var vm= this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.getSafeHTML = getSafeHTML;
        vm.getSafeURL = getSafeURL;

        function init() {
            vm.widgets = WidgetService.findWidgetByPageID(vm.pid)
        }
        init();

        function getSafeHTML(widget)
        {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeURL(widget)
        {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length-1];
            var url = "https://www.youtube.com/embed/"+ id;
            return $sce.trustAsResourceUrl(url);
        }

    }
})();