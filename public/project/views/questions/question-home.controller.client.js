/**
 * Created by Abhay on 6/5/2016.
 */


(function(){
    angular
        .module("FindAnswers")
        .controller("QuestionHomeController",QuestionHomeController);

    function QuestionHomeController($location,$routeParams,YahooService) {
        var vm = this;
        vm.uid=$routeParams.uid;
        vm.wid=$routeParams.wid;
        vm.pid=$routeParams.pid;
        vm.wgid=$routeParams.wgid;

        vm.searchQuestions = searchQuestions;
        vm.selectPhoto = selectPhoto;

        function searchQuestions(searchText) {
            FlickrService
                .searchQuestions(searchText)
                .then(
                    function(response){
                        new_data = response.data; 
                        // data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var widget = {
                _id : vm.wgid,
                widgetType : 'IMAGE',
                pageId : vm.pid,
                url : url,
                width: "100%"
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