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
            var user = UserService.findUserByCredentials(username,password);
            if(user)
                $location.url("/user/"+user._id);
            else
             vm.error = "user not found";
        }
    }
})();