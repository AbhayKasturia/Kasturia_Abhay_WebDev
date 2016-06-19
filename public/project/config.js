(function(){
    angular
        .module("FindAnswers")
        .config(Config);        /*specific function to handle configuration */

    function Config($routeProvider){   /*Well know angular object in ng-modular ,  used for dependency injection*/
            $routeProvider
                .when("/" , {
                    templateUrl:"views/user/login.view.client.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/login" , {
                    templateUrl:"views/user/login.view.client.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/register" , {
                    templateUrl:"views/user/register.view.client.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                .when("/profile" , { /*added placeholder to navigate to non uid profile page*/
                    templateUrl:"views/user/profile.view.client.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedIn
                    }
                })
                .when("/user" , { /*added placeholder to navigate to uid profile page*/
                    templateUrl:"views/user/profile.view.client.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedIn
                    }
                })
                .when("/user/:uid" , { /*added placeholder to navigate to uid profile page*/
                    templateUrl:"views/user/profile.view.client.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedIn
                    }
                })
                .when("/user/:uid/question" , { 
                    templateUrl:"views/questions/question-home.view.client.html",
                    controller: "QuestionHomeController",
                    controllerAs: "model"
                })
                .when("/user/:uid/question/:qid", {
                    templateUrl: "views/questions/question-interact.view.client.html",
                    controller: "QuestionInteractController",
                    controllerAs: "model"
                })
                .otherwise({
                    redirectTo: "/login"
                });

        function checkLoggedIn(UserService,$location,$q,$rootScope){
            
            var deferred = $q.defer();
            
            UserService
                .loggedIn()
                .then(
                    function(response){
                        var user=response.data;
                        console.log(user);
                        if(user == '0'){
                            $rootScope.currentUser=null;
                            deferred.reject();
                            $location.url("/login");
                        }
                        else {
                            $rootScope.currentUser=user;
                            deferred.resolve();
                        }
                    },
                    function(res){
                        $location.url("/login");
                    }
                );
            
            return deferred.promise;
        }
    }   
})();