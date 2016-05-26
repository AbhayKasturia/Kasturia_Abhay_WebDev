/**
 * Created by Abhay on 5/24/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController)
    
    function LoginController($location , UserService) {      /* dependency injection */
        var vm= this;

        vm.login = function(username,password) {
            var user = UserService.findUserByUsernameAndPassword(username,password);
            if(user)
                $location.url("/profile/"+user._id);
            else
             vm.error = "User not found";
        }
    }
})();