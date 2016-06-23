/**
 * Created by Abhay on 5/24/2016.
 */
(function(){
  angular
      .module("FindAnswers")
      .controller("PublicProfileController",PublicProfileController);

  function PublicProfileController($location , $routeParams , UserService , $rootScope) {      /* route paramaters can be retrieved using this */
    var vm = this;
    vm.uid = $routeParams.uid;


    function init() {
      UserService
          .findUserByID(vm.uid)
          .then(function (response) {
            vm.user = response.data;
          });
    }

    init();

  }})();