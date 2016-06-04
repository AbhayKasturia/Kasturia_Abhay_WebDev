/**
 * Created by Abhay on 5/28/2016.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController",WidgetChooserController)

    function WidgetChooserController($sce , $location , $routeParams , WidgetService) {      /* dependency injection */
        var vm= this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.getSafeHTML = getSafeHTML;
        vm.getSafeURL = getSafeURL;
        vm.createHeading = createHeading;
        vm.createImage = createImage;
        vm.createYoutube = createYoutube;

        function createHeading()
        {
            var newWidget = {
                _id: (new Date()).getTime()+"",
                pageId: vm.pid,
                widgetType: "HEADER"
            };

            WidgetService
                .createWidget(vm.pid,newWidget)
                .then(function(response){
                    if(response.data)
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+newWidget._id);
                    else
                        vm.error= "Unable to create widget";
                });
        }

        function createImage()
        {
            var newWidget = {
                _id: (new Date()).getTime()+"",
                pageId: vm.pid,
                widgetType: "IMAGE"
            };

            WidgetService
                .createWidget(vm.pid,newWidget)
                .then(function(response){
                    if(response.data)
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+newWidget._id);
                    else
                        vm.error= "Unable to create widget";
                });
        }

        function createYoutube()
        {
            var newWidget = {
                _id: (new Date()).getTime()+"",
                pageId: vm.pid,
                widgetType: "YOUTUBE"
            };

            WidgetService
                .createWidget(vm.pid,newWidget)
                .then(function(response){
                    if(response.data)
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+newWidget._id);
                    else
                        vm.error= "Unable to create widget";
                });
        }

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