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
            createWidget: createWidget,
            findWidgetByPageID: findWidgetByPageID,
            findWidgetByID: findWidgetByID,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(pid , newWidget) {
            widgets.push(newWidget);
            return newWidget;
        }

        function findWidgetByPageID(pid) {
            var page_widgets = [];
            for (var i in widgets) {
                if (widgets[i].pageId=== pid)
                    page_widgets.push(widgets[i]);
            }
            return page_widgets;
        }

        function findWidgetByID(wgid) {
            for (var i in widgets) {
                if (widgets[i]._id === wgid)
                    return widgets[i];
            }
            return null;
        }

        function updateWidget(wgid,newWidget) {
            for (var i in users) {
                if (widgets[i]._id === wgid)
                {
                    widgets[i]=newWidget;
                    return 1;
                }
            }
            return 0;
        }

        function deleteWidget(wgid) {
            for (var i in widgets) {
                if (widgets[i]._id === wgid)
                {
                    widgets.splice(i,1);
                    return 1;
                }
            }
            return 0;
        }
    }
})();