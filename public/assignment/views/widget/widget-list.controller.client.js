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
            WidgetService
                .findWidgetByPageID(vm.pid)
                .then(function(response){
                    vm.widgets = response.data;
                });

            var objects = jQuery(".container");

            // $(".container").sortable({axis : "y"});
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

        function reorderWidget(start,end){
            WidgetService
                .reorderWidget(vm.pid,start,end)
                .then(
                    function(response){
                        init();
                    },
                    function(response){
                        vm.error = "Unable to reorder widgets";
                    });
        }
    }
})();