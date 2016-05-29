(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController",PageEditController)

    function PageEditController($location , $routeParams , PageService) {      /* dependency injection */
        var vm= this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.page = PageService.findPageByID(vm.pid);
        }
        init();

        function updatePage(newPage){
            var updatePage = PageService.updatePage(vm.pid,newPage);
            if(updatePage) {
                $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
            }
            else {
                vm.error="Unable to update page";
            }
        }

        function deletePage(){
            var delPage = PageService.deletePage(vm.pid);
            if(delPage) {
                $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
            }
            else {
                vm.error="Unable to delete page";
            }
        }
    }
})();