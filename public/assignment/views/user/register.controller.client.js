/**
 * Created by Abhay on 5/28/2016.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController);

    function RegisterController($location , $routeParams , UserService) {      /* route paramaters can be retrieved using this */
        var vm = this;
        vm.createUser = createUser;

        function createUser(username,password,vpassword) {
            if(username && password && vpassword)
            {
                if(password === vpassword)
                {
                    var newUser = {
                    // _id: (new Date()).getTime()+"",
                    username: username,
                    password: password
                };
                UserService
                    .register(newUser)
                    // .createUser(newUser)
                    .then(function(response){
                        var user = response.data;
                        if(response.data)
                            $location.url("/user/"+user._id);
                        else
                            vm.error = "Unable to register, please try again later!";
                    },
                    function(err){
                        vm.error = err.data;
                    });
                }
                else
                {
                    vm.error = "Password doesn't match!!!"
                    vm.perror= "Please make sure password and verify password are both same"
                }
            }
            else {
                vm.error = "You did not fill all the required fields!!";
            }
        }
    }
})();