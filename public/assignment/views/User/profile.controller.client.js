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
            UserService.updateUser(id,newUser);
            /*for (var i in users) {
                if (users[i]._id === id) {
                    users[i]=newUser;
                }
            }*/
            
        }
    }
})();