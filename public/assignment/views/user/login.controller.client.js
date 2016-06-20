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

        // if(usernamevalid) {
        //     vm.error = "Please enter the username"
        // }
        // else if (passwordvalid) {
        //     vm.error = "Please enter the password"
        // }
        // else {
        if(username && password)
        {
            UserService
                .login(username, password)
                .then(function (response) {

                    var user = response.data;
                    console.log(user);
                    if (user)
                        $location.url("/user/" + user._id);
                    else
                        vm.error = "User not found";
                },
                function (error) {
                    vm.error = "User not found";
                });
        }
        else
        {
            vm.error = "You did not fill all the required fields";
        }
    }
}
})();