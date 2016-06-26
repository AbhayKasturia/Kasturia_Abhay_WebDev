/**
 * Created by Abhay on 6/23/2016.
 */
/**
 * Created by Abhay on 5/24/2016.
 */
(function(){
    angular
        .module("FindAnswers")
        .controller("HomePageController",HomePageController);

    function HomePageController($scope,$http,$location) {      /* route paramaters can be retrieved using this */

        var vm = this;

        vm.slide = slide;
        vm.login = login;

        var slides = [];

        function init() {
            $('#myCarousel').carousel({
                interval: 4000
            });
        }

        init();

        function slide(dir) {
            $('#myCarousel').carousel(dir);
        };

        function login(){
            $location.url("/login");
        }

    }

    })();