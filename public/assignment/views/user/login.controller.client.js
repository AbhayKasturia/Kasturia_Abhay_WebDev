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
        UserService
            .findUserByCredentials(username,password)
            .then(function(response){

            var user = response.data;
                console.log(user);
            if(user)
                $location.url("/user/"+user._id);
            else
                vm.error = "user not found";
            });
    }
}
})();