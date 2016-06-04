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
            PageService
                .findPageByID(vm.pid)
                .then(function(response)
                {
                    vm.page = response.data;
                });
        }
        init();

        function updatePage(newPage){
            PageService
                .updatePage(vm.pid,newPage)
                .then(function(response){
                    var updatePage = response.data;
                    if(updatePage) {
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
                    }
                    else {
                        vm.error="Unable to update page";
                    }
                });
        }

        function deletePage(){
            PageService
                .deletePage(vm.pid)
                .then(function(response)
                {
                    var delPage = response.data;
                    if(delPage) {
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
                    }
                    else {
                        vm.error="Unable to delete page";
                    }
                });
        }
    }
})();