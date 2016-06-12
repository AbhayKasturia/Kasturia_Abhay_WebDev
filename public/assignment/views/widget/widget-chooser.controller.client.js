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
        vm.createText = createText;
        vm.createHTML = createHTML;


        function createHeading()
        {
            var newWidget = {
                // _id: (new Date()).getTime()+"",
                name: "newWidget",
                _page: vm.pid,
                type: "HEADING"
            };

            WidgetService
                .createWidget(vm.pid,newWidget)
                .then(function(response){
                    var widget = response.data;

                    if(widget)
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+widget._id);
                    else
                        vm.error= "Unable to create widget";
                });
        }

        function createImage()
        {
            var newWidget = {
                // _id: (new Date()).getTime()+"",
                name: "newWidget",
                _page: vm.pid,
                type: "IMAGE"
            };

            WidgetService
                .createWidget(vm.pid,newWidget)
                .then(function(response){
                    var widget = response.data;

                    if(widget)
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+widget._id);
                    else
                        vm.error= "Unable to create widget";
                });
        }

        function createYoutube()
        {
            var newWidget = {
                // _id: (new Date()).getTime()+"",
                name: "newWidget",
                _page: vm.pid,
                type: "YOUTUBE"
            };

            WidgetService
                .createWidget(vm.pid,newWidget)
                .then(function(response){
                    var widget = response.data;

                    if(widget)
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+widget._id);
                    else
                        vm.error= "Unable to create widget";
                });
        }

        function createHTML()
        {
            var newWidget = {
                // _id: (new Date()).getTime()+"",
                name: "newWidget",
                _page: vm.pid,
                type: "HTML"
            };

            WidgetService
                .createWidget(vm.pid,newWidget)
                .then(function(response){
                    var widget = response.data;

                    if(widget)
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+widget._id);
                    else
                        vm.error= "Unable to create widget";
                });
        }

        function createText()
        {
            var newWidget = {
                // _id: (new Date()).getTime()+"",
                name: "newWidget",
                _page: vm.pid,
                type: "TEXT",
                text: ""
            };

            WidgetService
                .createWidget(vm.pid,newWidget)
                .then(function(response){
                    var widget = response.data;

                    if(widget)
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+widget._id);
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