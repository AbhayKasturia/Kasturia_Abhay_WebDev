/**
 * Created by Abhay on 5/26/2016.
 */
(function (){
    angular
        .module("FindAnswers")
        .factory("UserService",UserService);   /*service and factory method for singleton - same thing but syntax different*/

    function UserService($http) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserByID: findUserByID,
            updateUser: updateUser,
            createUser: createUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            loggedIn:loggedIn,
            register:register
        };

        return api;

        function loggedIn(){
            return $http.get("/api/project/loggedin");
        }
        
        function logout(){
            return $http.post("/api/project/logout");
        }

        function login(username,password){
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/project/login",user);
        }

        function createUser(newUser) {
            return $http.post("/api/project/user",newUser);
        }

        function register(newUser) {
            return $http.post("/api/project/register",newUser);
        }

        function deleteUser(id) {
            var url = "/api/project/user/"+ id;
            return $http.delete(url);
        }

        function updateUser(id,newUser) {
            var url = "/api/project/user/" + id;
            return $http.put(url, newUser);
        }

        function findUserByID(id) {
            var url = "/api/project/user/" + id;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username="+username+"&password="+password;
            return $http.get(url);
        }
    }
})();