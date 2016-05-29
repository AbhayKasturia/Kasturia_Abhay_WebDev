(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController",PageNewController)

    function PageNewController($location , $routeParams , PageService) {      /* dependency injection */
        var vm= this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.createPage = createPage;

        function createPage(name){
            var newPage = {
                _id: (new Date()).getTime()+"",
                name: name,
                websiteId: vm.wid
            };
            var newWeb = PageService.createPage(vm.wid,newPage);
            if(newWeb) {
                $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
            }
            else {
                vm.error="Unable to create page";
            }
        }
    }
})();