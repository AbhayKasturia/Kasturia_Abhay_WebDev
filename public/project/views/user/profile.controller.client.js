/**
 * Created by Abhay on 5/24/2016.
 */
(function(){
    angular
        .module("FindAnswers")
        .controller("ProfileController",ProfileController);

    function ProfileController($location , $routeParams , UserService , $rootScope) {      /* route paramaters can be retrieved using this */
        var vm = this;
        vm.uid = $routeParams.uid;

        var id = $rootScope.currentUser._id;
        /* ["id"] or ".id"*/


        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function logout(){
            UserService
                .logout()
                .then(
                    function(response){
                        $location.url("/login");
                    },
                    function(){
                        $location.url("/login");
                    }
                )
        }

        function init() {
            UserService
                .findUserByID(id)
                .then(function (response) {
                    vm.user = response.data;
                });
        }

        init();

        function updateUser(newUser) {
            UserService.updateUser(id, newUser)
                .then(function (response) {
                        vm.success = "Successfully updated your profile! :)";
                    },
                    function (error) {
                        vm.error = "Not able to update your profile , try again!";
                    });
        }

        function deleteUser(){
            UserService
                .deleteUser(vm.uid)
                .then(
                    function(response){
                        $location.url("/login");
                        console.log("deleted");
                    },
                    function(){
                        vm.error = "Cannot delete"
                        console.log(vm.error);
                    }
                );
        }

    }})();