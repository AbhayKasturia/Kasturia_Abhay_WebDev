/**
 * Created by Abhay on 5/26/2016.
 */
/**
 * Created by Abhay on 5/24/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController",WebsiteEditController)

    function WebsiteEditController($location , $routeParams , WebsiteService) {      /* dependency injection */
        var vm= this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;

        function deleteWebsite(){
            var delWebsite = WebsiteService.deleteWebsite(vm.uid,vm.wid);
            if(delWebsite) {
                $location.url("/user/"+vm.uid+"/website");
            }
            else {
                vm.error="Unable to delete website";
            }
        }
    }
})();