/**
 * Created by Abhay on 6/5/2016.
 */


(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController",FlickrImageSearchController);

    function FlickrImageSearchController($location,$routeParams,FlickrService,WidgetService) {
        var vm = this;
        vm.uid=$routeParams.uid;
        vm.wid=$routeParams.wid;
        vm.pid=$routeParams.pid;
        vm.wgid=$routeParams.wgid;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function(response){
                        data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var widget = {
                widgetId : vm.wgid,
                widgetType : "IMAGE",
                pageId : vm.pid,
                url : url
            };

            WidgetService
                .updateWidget(vm.wgid,widget)
                .then(function(response){
                        var url = "/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+vm.wgid;
                        $location.url(url);
                    });
        }
    }
})();