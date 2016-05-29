/**
 * Created by Abhay on 5/26/2016.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController",WebsiteEditController)

    function WebsiteEditController($location , $routeParams , WebsiteService) {      /* dependency injection */
        var vm= this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.website = WebsiteService.findWebsiteByID($routeParams.wid);
        }
        init();

        function updateWebsite(newWebsite){
            var updateWebsite = WebsiteService.updateWebsite(vm.wid,newWebsite);
            if(updateWebsite) {
                $location.url("/user/"+vm.uid+"/website");
            }
            else {
                vm.error="Unable to update website";
            }
        }

        function deleteWebsite(){
            var delWebsite = WebsiteService.deleteWebsite(vm.wid);
            if(delWebsite) {
                $location.url("/user/"+vm.uid+"/website");
            }
            else {
                vm.error="Unable to delete website";
            }
        }
    }
})();