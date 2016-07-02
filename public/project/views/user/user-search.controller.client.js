/**
 * Created by Abhay on 6/23/2016.
 */
(function(){
    angular
        .module("FindAnswers")
        .controller("UserSearchController",UserSearchController);

    function UserSearchController($location,$routeParams,UserService,$rootScope,$window) {

        var vm = this;
        var userId = $window.sessionStorage.getItem("currentUser");
        vm.searchUsers = searchUsers;
        vm.uid = userId;

        function init(){
            if($window.sessionStorage.getItem("userSearch")){
                vm.searchText=$window.sessionStorage.getItem("userSearch");
                searchUsers(vm.searchText);
            }
        }

        init();
        
        function searchUsers(searchText) {
            vm.error=null;
            UserService
                .searchUsersByUsername(searchText)
                .then(
                    function(response){
                        var usersRet = response.data;
                        $window.sessionStorage.setItem("userSearch",searchText);
                        for (var i in usersRet) {
                            if (usersRet[i]._id === userId) {
                                usersRet.splice(i,1);
                            }
                        }
                        vm.users = usersRet;
                    },
                    function(error){
                        vm.error = "Unable to access users data";
                    });
        }

    }
})();