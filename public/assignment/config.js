/**
 * Created by Abhay on 5/24/2016.
 */

(function(){
    angular
        .module("WebAppMaker")
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
                .when("/user/:uid" , { /*added placeholder to navigate to uid profile page*/
                    templateUrl:"views/user/profile.view.client.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedIn
                    }
                })
                .when("/user/:uid/website" , {
                    templateUrl:"views/website/website-list.view.client.html",
                    controller: "WebsiteListController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/new" , {
                    templateUrl:"views/website/website-new.view.client.html",
                    controller: "WebsiteNewController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid" , {
                    templateUrl:"views/website/website-edit.view.client.html",
                    controller: "WebsiteEditController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid/page" , {
                    templateUrl:"views/page/page-list.view.client.html",
                    controller: "PageListController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid/page/new" , {
                    templateUrl:"views/page/page-new.view.client.html",
                    controller: "PageNewController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid/page/:pid" , {
                    templateUrl:"views/page/page-edit.view.client.html",
                    controller: "PageEditController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid/page/:pid/widget" , {
                    templateUrl:"views/widget/widget-list.view.client.html",
                    controller: "WidgetListController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid/page/:pid/widget/new" , {
                    templateUrl:"views/widget/widget-chooser.view.client.html",
                    controller: "WidgetChooserController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid/page/:pid/widget/:wgid" , {
                    templateUrl:"views/widget/widget-edit.view.client.html",
                    controller: "WidgetEditController",
                    controllerAs: "model"
                })
                .when("/default" , {
                    templateUrl:"index.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/flickr", {
                    templateUrl: "views/widget/widget-flickr-search.view.client.html",
                    controller: "FlickrImageSearchController",
                    controllerAs: "model"
                })
                .otherwise({
                    redirectTo: "/login"
                });

        function checkLoggedIn(UserService,$location,$q){
            
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