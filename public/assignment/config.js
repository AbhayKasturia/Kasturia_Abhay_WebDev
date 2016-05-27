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
                    templateUrl:"views/User/login.view.client.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/login" , {
                    templateUrl:"views/User/login.view.client.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/register" , {
                    templateUrl:"views/User/register.view.client.html"
                })
                .when("/profile/:uid" , { /*added placeholder to navigate to uid profile page*/
                    templateUrl:"views/User/profile.view.client.html",
                    controller: "ProfileController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website" , {
                    templateUrl:"views/Website/website-list.view.client.html",
                    controller: "WebsiteListController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/new" , {
                    templateUrl:"views/Website/website-new.view.client.html",
                    controller: "WebsiteNewController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid" , {
                    templateUrl:"views/Website/website-edit.view.client.html",
                    controller: "WebsiteEditController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid/page/:pid/widget" , {
                    templateUrl:"views/Widget/widget-list.view.client.html",
                    controller: "WidgetListController",
                    controllerAs: "model"
                })
    }   
})();