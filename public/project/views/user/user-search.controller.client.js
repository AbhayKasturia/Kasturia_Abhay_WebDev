/**
 * Created by Abhay on 6/23/2016.
 */
(function(){
    angular
        .module("FindAnswers")
        .controller("UserSearchController",UserSearchController);

    function UserSearchController($location,$routeParams,UserService,$rootScope) {

        var vm = this;
        var userId = $rootScope.currentUser._id;
        vm.searchUsers = searchUsers;

        function init(){
            searchUsers("");
        }
        init();

        function searchUsers(searchText) {
            UserService
                .searchUsersByUsername(searchText)
                .then(
                    function(response){
                        var usersRet = response.data;
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