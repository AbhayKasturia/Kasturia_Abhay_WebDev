/**
 * Created by Abhay on 6/3/2016.
 */

module.exports = function(app, models) {

    var widgetModel = models.widgetModel;

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

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pid/widget" , createWidget);
    app.get("/api/page/:pid/widget" , findAllWidgetsForPage);
    app.get("/api/widget/:wgid" , findWidgetByID);
    app.put("/api/widget/:wgid" , updateWidget);
    app.delete("/api/widget/:wgid" , deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {

        var widgetId = req.body.wgid ;
        var width = req.body.width ;
        var myFile = req.file;
        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename; // new file name in upload folder
        var path = myFile.path; // full path of uploaded file
        var destination = myFile.destination; // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        widgetModel
            .findWidgetByID(widgetId)
            .then(
                function(widget) {
                    widget.url= "/uploads/"+filename;
                    widgetModel
                        .updateWidget(id, widget)
                        .then(
                            function(widget) {
                                console.log(widget);
                                res.json(widget);
                            },
                            function(error) {
                                res.statusCode(400).send(error);
                            }
                        );
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );

        // for(var i in widgets){
        //     if(widgets[i]._id === widgetId){
        //         widgets[i].url = "/uploads/"+filename;
        //     }
        // }

        console.log(req.body);
        res.redirect("/assignment/index.html#/user/"+req.body.uid+"/website/"+req.body.wid+"/page/"+req.body.pid+"/widget/"+widgetId);

    }

    function findWidgetByID(req,res){
        var id = req.params.wgid;

        widgetModel
            .findWidgetByID(id)
            .then(
                function(widget) {
                    res.json(widget);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    };

    function findAllWidgetsForPage(req, res){
        var pid = req.params.pid;
        widgetModel
            .findAllWidgetsForPage(pid)
            .then(
                function(page_widgets) {
                    console.log(page_widgets);
                    res.json(page_widgets);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function createWidget(req , res) {
        var newWidget = req.body;

        widgetModel
            .createWidget(newWidget)
            .then(
                function(newWidget) {
                    console.log(newWidget);
                    res.json(newWidget);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function deleteWidget(req, res) {
        var id = req.params.wgid;

        widgetModel
            .deleteWebsite(id)
            .then(
                function(stats){
                    console.log(stats);
                    res.send(200);
                },
                function(error){
                    res.statusCode(404).send(err);
                }
            );
    }

    function updateWidget(req, res) {
        var id = req.params.wgid;
        var newWidget = req.body;

        widgetModel
            .updateWidget(id, newWidget)
            .then(
                function(newWidget) {
                    console.log(newWidget);
                    res.json(newWidget);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }
};