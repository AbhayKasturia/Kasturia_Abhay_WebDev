/**
 * Created by Abhay on 5/26/2016.
 */
(function (){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);   /*service and factory method for singleton - same thing but syntax different*/

    var widgets =
            [
                { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

    function WidgetService() {
        var api = {
            findWidgetByPageID: findWidgetByPageID,
            findWebsiteByWebsiteID: findWebsiteByWebsiteID,
            createWebsite: createWebsite,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            updateUser: updateUser,
            deleteWebsite: deleteWebsite
        };
        return api;


        function createWebsite(developerId , name , desc) {
            var newWebsite = {
                _id: (new Date()).getTime()+"",
                name: name,
                desc: desc,
                developerId: developerId
            };
            websites.push(newWebsite);
            return newWebsite;
        }

        function deleteWebsite(developerId , wid) {

            for (var i in websites) {
                if (websites[i]._id === wid && websites[i].developerId === developerId)
                {
                    websites.splice(i,1);
                    return true;
                }
            }
            return false;
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

        function findWebsiteByWebsiteID(wid) {
            for (var i in websites) {
                if (websites[i]._id === wid)
                    return websites[i];
                //$location.url("/profile/"+users[i]._id);
                /*else
                 vm.error = "User not found";*/
            }
            return null;
        }

        function findWidgetByPageID(pid) {
            var page_widgets = [];
            for (var i in widgets) {
                if (widgets[i].pageId=== pid)
                    page_widgets.push(widgets[i]);
            }
            return page_widgets;
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