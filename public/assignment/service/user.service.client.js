/**
 * Created by Abhay on 5/26/2016.
 */
(function (){
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);   /*service and factory method for singleton - same thing but syntax different*/

    function UserService($http) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserByID: findUserByID,
            updateUser: updateUser,
            createUser: createUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(newUser) {
            return $http.post("/api/user",newUser);
        }

        function deleteUser(id) {
            var url = "/api/user/"+ id;
            return $http.delete(url);
        }

        function updateUser(id,newUser) {
            var url = "/api/user/" + id;
            return $http.put(url, newUser);
        }

        function findUserByID(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }
    }
})();