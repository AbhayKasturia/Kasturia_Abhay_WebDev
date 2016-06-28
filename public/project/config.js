(function(){
    angular
        .module("FindAnswers")
        .config(Config);        /*specific function to handle configuration */

    function Config($routeProvider){   /*Well know angular object in ng-modular ,  used for dependency injection*/
            $routeProvider
                .when("/" , {
                    templateUrl:"views/home/home-page.view.client.html",
                    controller: "HomePageController",
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
                .when("/user/search" , { /*added placeholder to navigate to uid profile page*/
                    templateUrl:"views/user/user-search.view.client.html",
                    controller: "UserSearchController",
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
                .when("/user/public/:uid" , { /*added placeholder to navigate to uid profile page*/
                    templateUrl:"views/user/public-profile.view.client.html",
                    controller: "PublicProfileController",
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedIn
                    }
                })
                .when("/user/:uid/question" , { 
                    templateUrl:"views/questions/question-home.view.client.html",
                    controller: "QuestionHomeController",
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedIn
                    }
                })
                .when("/user/:uid/admin/question" , {
                    templateUrl:"views/admin/admin-home.view.client.html",
                    controller: "AdminHomeController",
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedIn
                    }
                })
                .when("/user/:uid/admin/answer" , {
                    templateUrl:"views/admin/admin-answer.view.client.html",
                    controller: "AdminAnswerController",
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedIn
                    }
                })
                .when("/user/:uid/admin/user" , {
                    templateUrl:"views/admin/admin-user.view.client.html",
                    controller: "UserSearchController",
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedIn
                    }
                })
                .when("/user/:uid/question/new", {
                    templateUrl: "views/questions/question-new.view.client.html",
                    controller: "QuestionNewController",
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedIn
                    }
                })
                .when("/user/:uid/admin/question/:qid" , {
                    templateUrl:"views/admin/admin-question.view.client.html",
                    controller: "AdminQuestionController",
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedIn
                    }
                })
                .when("/user/:uid/question/:qid", {
                    templateUrl: "views/questions/question-interact.view.client.html",
                    controller: "QuestionInteractController",
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedIn
                    }
                })
                .otherwise({
                    redirectTo: "/login"
                });

        function checkLoggedIn(UserService,$location,$q,$rootScope,$window){
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function(response){
                        var user = response.data;
                        // console.log(user);
                        if(user ==  '0'){
                            console.log(user._id);
                            $rootScope.currentUser = null;
                            $window.sessionStorage.setItem("currentUser",'0');
                            $window.sessionStorage.setItem("currentUsername",'0');
                            deferred.reject();
                            $location.url("/login");
                        } else {
                            console.log(user._id);
                            $rootScope.currentUser = user;
                            $window.sessionStorage.setItem("currentUser",user._id);
                            $window.sessionStorage.setItem("currentUsername",user.username);
                            deferred.resolve();
                        }
                    },
                    function(err){
                        $location.url("/login");
                    }
                );
            return deferred.promise;
        }

        // function checkLoggedIn(UserService,$location,$q,$rootScope){
        //
        //     var deferred = $q.defer();
        //
        //     UserService
        //         .loggedIn()
        //         .then(
        //             function(response){
        //                 var user=response.data;
        //                 console.log(user);
        //                 if(user == '0'){
        //                     $rootScope.currentUser=null;
        //                     deferred.reject();
        //                     $location.url("/login");
        //                 }
        //                 else {
        //                     $rootScope.currentUser=user;
        //                     deferred.resolve();
        //                 }
        //             },
        //             function(res){
        //                 $location.url("/login");
        //             }
        //         );
        //
        //     return deferred.promise;
        // }
    }   
})();