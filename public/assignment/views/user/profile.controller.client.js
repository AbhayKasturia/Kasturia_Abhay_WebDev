/**
 * Created by Abhay on 5/24/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController",ProfileController);

    function ProfileController($routeParams , UserService) {      /* route paramaters can be retrieved using this */
        var vm = this;
        vm.updateUser = updateUser;

        var id = $routeParams.uid;
        /* ["id"] or ".id"*/

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
    }})();