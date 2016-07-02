/**
 * Created by Abhay on 5/24/2016.
 */
(function(){
    angular
        .module("FindAnswers")
        .controller("ProfileController",ProfileController);

    function ProfileController($location , $routeParams , UserService , $rootScope , $window) {      /* route paramaters can be retrieved using this */
        var vm = this;
        vm.uid = $routeParams.uid;

        var id = $rootScope.currentUser._id;
        /* ["id"] or ".id"*/


        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.redirect=redirect;

        function init() {

            $window.sessionStorage.removeItem("quesSearch");
            $window.sessionStorage.removeItem("userSearch");
            $window.sessionStorage.removeItem("quesSearchByUser");
            $window.sessionStorage.removeItem("quesSearchByUser_Username");

            UserService
                .findUserByID(id)
                .then(function (response) {
                    vm.user = response.data;
                    if(vm.user && vm.user.is_admin){
                        vm.message = "Admin Profile Page";
                    }
                });
        }

        init();
        
        function redirect(){
            if(vm.user.is_admin)
                $location.url("/user/"+vm.user._id+"/admin/question");
            else
                $location.url("/user/"+vm.user._id+"/question");
        }

        function logout(){
            UserService
                .logout()
                .then(
                    function(response){
                        $window.sessionStorage.clear();
                        $location.url("/login");
                    },
                    function(err){
                        $location.url("/login");
                    }
                )
        }

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
                .deleteUser(id)
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