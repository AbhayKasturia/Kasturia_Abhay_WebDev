/**
* Created by Abhay on 5/24/2016.
*/
(function(){
angular
    .module("FindAnswers")
    .controller("LoginController",LoginController)

function LoginController($location , UserService) {      /* dependency injection */
    var vm= this;
    
    vm.login = function(username,password) {
        
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