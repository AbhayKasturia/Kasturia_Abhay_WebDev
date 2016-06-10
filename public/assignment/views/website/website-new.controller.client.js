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
            if(name) {
                var newWebsite = {
                    // _id: (new Date()).getTime()+"",
                    name: name,
                    desc: desc,
                    _user: vm.uid
                };
                WebsiteService
                    .createWebsite(vm.uid, newWebsite)
                    .then(function (response) {
                        var newWeb = response.data;

                        if (newWeb) {
                            $location.url("/user/" + vm.uid + "/website");
                        }
                        else {
                            vm.error = "Unable to create website";
                        }
                    });
            }
            else
            {
                vm.error = "You did not fill all the required fields!!";
            }
        }
    }
})();