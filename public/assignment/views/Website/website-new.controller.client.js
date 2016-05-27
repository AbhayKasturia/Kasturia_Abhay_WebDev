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
        vm.createWebsite = createWebsite;

        function createWebsite(name,desc){
            var newWebsite = WebsiteService.createWebsite(vm.uid,name,desc);
            if(newWebsite) {
                $location.url("/user/"+vm.uid+"/website");
            }
            else {
                vm.error="Unable to create website";
            }
        }
    }
})();