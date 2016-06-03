/**
 * Created by Abhay on 6/3/2016.
 */

module.exports = function(app) {

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


    app.post("/api/page/:pid/widget" , createWidget);
    app.get("/api/page/:pid/widget" , findAllWidgetsForPage);
    app.get("/api/widget/:wgid" , findWidgetByID);
    app.put("/api/widget/:wgid" , updateWidget);
    app.delete("/api/widget/:wgid" , deleteWidget);


    function findWidgetByID(req,res){
        var id = req.params.wgid;
        for(var i in widgets) {
            if(widgets[i]._id === id) {
                res.json(widgets[i]);
                return;
            }
        }
        res.json();
    };

    function findAllWidgetsForPage(req, res){
        var pid = req.params.pid;
        var page_widgets = [];
        for(var i in widgets){
            if(widgets[i].pageId === pid)
            {
                page_widgets.push(widgets[i]);
            }
        }
        res.send(page_widgets);
    }

    function createWidget(req , res) {
        var newWidget = req.body;
        pages.push(newWidget);
        res.sendStatus(200);
    }

    function deleteWidget(req, res) {
        var id = req.params.wgid;
        for (var i in widgets) {
            if (widgets[i]._id === id)
            {
                widgets.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function updateWidget(req, res) {
        var id = req.params.wgid;
        var newWidget = req.body;
        for (var i in widgets) {
            if (widgets[i]._id === id)
            {
                widgets[i]=newWidget;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

};