/**
 * Created by Abhay on 5/24/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController",WebsiteNewController)

    function WebsiteNewController($location , $routeParams , WebsiteService) {      /* dependency injection */
        var vm= this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.createWebsite = createWebsite;

        function createWebsite(name,desc){
            var newWebsite = {
                // _id: (new Date()).getTime()+"",
                name: name,
                desc: desc,
                developerId: vm.uid
            };
            WebsiteService
                .createWebsite(vm.uid,newWebsite)
                .then(function(response){
                    var newWeb = response.data;

                    if(newWeb) {
                        $location.url("/user/"+vm.uid+"/website");
                    }
                    else {
                        vm.error="Unable to create website";
                    }
                });
        }
    }
})();