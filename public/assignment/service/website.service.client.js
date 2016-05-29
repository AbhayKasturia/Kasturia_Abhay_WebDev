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
            { "_id": "123", "name": "Facebook", "desc": "Social Networking Site",   "developerId": "456" },
            { "_id": "234", "name": "Tweeter", "desc": "Social Networking Site",    "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",  "desc": "Social Networking Site",   "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "desc": "Social Networking Site","developerId": "123" },
            { "_id": "678", "name": "Checkers", "desc": "Social Networking Site",   "developerId": "123" },
            { "_id": "789", "name": "Chess", "desc": "Social Networking Site",      "developerId": "234" }
        ];

    function WebsiteService() {
        var api = {
            findWebsiteByUser: findWebsiteByUser,
            findWebsiteByID: findWebsiteByID,
            updateWebsite: updateWebsite,
            createWebsite: createWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(developerId , newWebsite) {
            websites.push(newWebsite);
            return 1;
        }

        function deleteWebsite(wid) {
            for (var i in websites) {
                if (websites[i]._id === wid)
                {
                    websites.splice(i,1);
                    return 1;
                }
            }
            return 0;
        }

        function updateWebsite(wid,newWebsite) {
            for (var i in websites) {
                if (websites[i]._id === wid)
                {
                    websites[i]=newWebsite;
                    return 1;
                }
            }
            return 0;
        }

        function findWebsiteByID(wid) {
            for (var i in websites) {
                if (websites[i]._id === wid)
                    return websites[i];
            }
            return null;
        }

        function findWebsiteByUser(uid) {
            var user_website = [];
            for (var i in websites) {
                if (websites[i].developerId === uid)
                    user_website.push(websites[i]);
            }
            return user_website;
        }

    }
})();