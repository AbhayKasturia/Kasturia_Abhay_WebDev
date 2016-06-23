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
    var userId = $rootScope.currentUser._id;
    vm.ownId = false;
    vm.following = false;
    vm.follows = false;
    vm.follow = follow;
    var currentuser;


    function init() {
      UserService
          .findUserByID(vm.uid)
          .then(function (response) {
            vm.user = response.data;

            if(vm.uid=userId)
              vm.ownId = true;

            for (var i in vm.user.following) {
              if (vm.user.following[i] === userId) {
                vm.follows == true;
              }
            }

            UserService
                .findUserByID(userId)
                .then(function (response) {
                  currentuser = response.data;
                  var following = currentuser.following;
                  for (var i in following) {
                    if (following[i] === vm.uid) {
                      vm.following == true;
                    }
                  }
                });
          });
    }

    init();

    function follow(){
      vm.user.followed_by.push(userId);

      UserService
          .updateUser(vm.user._id,vm.user)
          .then(
              function(newUser){
                if(newUser){
                  currentuser.following.push(vm.uid);
                  UserService
                      .updateUser(vm.currentuser._id,currentuser)
                      .then(
                          function(newUser){
                            if(newUser)
                              vm.success="You are now following this user";
                            else
                              vm. error = "Something went wrong please try again";
                          }
                      )
                }
                else
                  vm. error = "Something went wrong please try again";
              },function(err){
                vm. error = "Something went wrong please try again";
              }
          );
    }

    function unfollow(){

      for (var i in vm.user.followed_by) {
        if(vm.user.followed_by[i] === userId)
          vm.user.followed_by.splice(i,1);
      }


      UserService
          .updateUser(vm.user._id,vm.user)
          .then(
              function(newUser){
                if(newUser){

                  for (var i in currentuser.following) {
                    if(currentuser.following[i] === vm.uid)
                      currentuser.following.splice(i,1);
                  }

                  UserService
                      .updateUser(vm.currentuser._id,currentuser)
                      .then(
                          function(newUser){
                            if(newUser)
                              vm.success="You are now following this user";
                            else
                              vm. error = "Something went wrong please try again";
                          }
                      )
                }
                else
                  vm. error = "Something went wrong please try again";
              },function(err){
                vm. error = "Something went wrong please try again";
              }
          );
    }


  }})();