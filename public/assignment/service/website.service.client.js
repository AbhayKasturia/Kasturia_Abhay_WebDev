/**
 * Created by Abhay on 5/26/2016.
 */

/**
 * Created by Abhay on 5/26/2016.
 */
(function (){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);   /*service and factory method for singleton - same thing but syntax different*/

    var websites =
        [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];

    function WebsiteService() {
        var api = {
            findWebsiteByUserID: findWebsiteByUserID,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            updateUser: updateUser,
            createUser: createUser,
            deleteUser: deleteUser
        };
        return api;
        

        function createUser(newUser) {
            users.push(newUser);
        }

        function deleteUser(id) {
            for (var i in users) {
                if (users[i]._id === id)
                {
                    return 1;
                }
            }
        }

        function updateUser(id,newUser) {
            for (var i in users) {
                if (users[i].developerIdid === id)
                {
                    users[i]=newUser;
                    return 1;
                }
                //$location.url("/profile/"+users[i]._id);
                /*else
                 vm.error = "User not found";*/
            }
            return 0;
        }

        function findWebsiteByUserID(uid) {
            var user_website = [];
            for (var i in websites) {
                if (websites[i].developerId === uid)
                    user_website.push(websites[i]);
                //$location.url("/profile/"+users[i]._id);
                /*else
                 vm.error = "User not found";*/
            }
            return user_website;
        }

        function findUserByUsernameAndPassword(username, password) {
            for (var i in users) {
                if (users[i].username === username && users[i].password === password)
                    return users[i];
                //$location.url("/profile/"+users[i]._id);
                /*else
                 vm.error = "User not found";*/
            }
            return null;
        }
    }
})();