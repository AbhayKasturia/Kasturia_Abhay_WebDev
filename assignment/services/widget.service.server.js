/**
 * Created by Abhay on 6/3/2016.
 */

module.exports = function(app, models) {

    var widgetModel = models.widgetModel;

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pid/widget" , createWidget);
    app.get("/api/page/:pid/widget" , findAllWidgetsForPage);
    app.get("/api/widget/:wgid" , findWidgetByID);
    app.put("/api/widget/:wgid" , updateWidget);
    app.delete("/api/widget/:wgid" , deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/page/:pid/widget",reorderWidget);

    function uploadImage(req, res) {

        var widgetId = req.body.wgid ;
        var width = req.body.width ;
        var myFile = req.file;
        var originalname = myFile.originalname;
        var filename = myFile.filename;
        var path = myFile.path;
        var destination = myFile.destination; // folder where file will be saved
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
                function(widget) {
                    console.log(widget);
                    res.json(widget);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function deleteWidget(req, res) {
        var id = req.params.wgid;

        widgetModel
            .deleteWidget(id)
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

    function reorderWidget(req,res){

        var pid = req.params.pid;
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);

        start = start;
        end = end;

        widgetModel
            .reorderWidget( pid , start, end)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400);
                });
    }
    
};