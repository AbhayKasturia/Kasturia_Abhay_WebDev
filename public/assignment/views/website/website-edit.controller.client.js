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
            WebsiteService
                .findWebsiteByID($routeParams.wid)
                .then(function(response){
                    vm.website = response.data;
                });
        }
        init();

        function updateWebsite(newWebsite){
            WebsiteService
                .updateWebsite(vm.wid,newWebsite)
                .then(function(response){
                    if(response.data) {
                        $location.url("/user/"+vm.uid+"/website");
                    }
                    else {
                        vm.error="Unable to update website";
                    }
            });
        }

        function deleteWebsite(){
            WebsiteService
                .deleteWebsite(vm.wid)
                .then(function(response){
                var delWebsite = response.data;
                if(delWebsite) {
                    $location.url("/user/"+vm.uid+"/website");
                }
                else {
                    vm.error="Unable to delete website";
                }
            });
        }
    }
})();