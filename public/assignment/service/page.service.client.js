/**
 * Created by Abhay on 5/26/2016.
 */

/**
 * Created by Abhay on 5/26/2016.
 */
(function (){
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);   /*service and factory method for singleton - same thing but syntax different*/

    var pages =
            [
                { "_id": "321", "name": "Post 1", "websiteId": "456" },
                { "_id": "432", "name": "Post 2", "websiteId": "456" },
                { "_id": "543", "name": "Post 3", "websiteId": "456" }
            ];

    function PageService() {
        var api = {
            findPageByWebsiteID: findPageByWebsiteID,
            findPageByID: findPageByID,
            updatePage: updatePage,
            createPage: createPage,
            deletePage: deletePage
        };
        return api;

        function findPageByWebsiteID(wid) {
            var website_pages = [];
            for (var i in pages) {
                if (pages[i].websiteId === wid)
                    website_pages.push(pages[i]);
            }
            return website_pages;
        }

        function findPageByID(pid) {
            for (var i in pages) {
                if (pages[i]._id === pid)
                    return pages[i];
            }
            return null;
        }

        function updatePage(pid,newPage) {
            for (var i in pages) {
                if (pages[i]._id === pid)
                {
                    pages[i]=newPage;
                    return 1;
                }
            }
            return 0;
        }

        function deletePage(pid) {
            for (var i in pages) {
                if (pages[i]._id === pid)
                {
                    pages.splice(i,1);
                    return 1;
                }
            }
            return 0;
        }

        function createPage(wid , newPage) {
            pages.push(newPage);
            return 1;
        }
    }
})();