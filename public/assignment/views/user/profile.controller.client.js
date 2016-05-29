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

        var id = $routeParams.uid; /* ["id"] or ".id"*/

        function init() {
            vm.user = UserService.findUserByID(id);
        }
        init();

        function updateUser(newUser) {
            if(UserService.updateUser(id,newUser))
                vm.success = "Successfully updated your profile! :)";
            else
                vm.error = "Not able to update your profile , try again!";
        }
    }
})();