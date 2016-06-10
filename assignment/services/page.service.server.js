/**
 * Created by Abhay on 6/3/2016.
 */

module.exports = function(app, models) {

    var pageModel = models.pageModel;

    var pages =
        [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];


    app.post("/api/website/:wid/page" , createPage);
    app.get("/api/website/:wid/page" , findAllPagesForWebsite);
    app.get("/api/page/:pid" , findPageByID);
    app.put("/api/page/:pid" , updatePage);
    app.delete("/api/page/:pid" , deletePage);


    function findPageByID(req,res){
        var id = req.params.pid;
        pageModel
            .findPageByID(id)
            .then(
                function(page) {
                    res.json(page);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    };

    function findAllPagesForWebsite(req, res){
        var wid = req.params.wid;

        pageModel
            .findAllPagesForWebsite(wid)
            .then(
                function(website_pages) {
                    console.log(website_pages);
                    res.json(website_pages);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function createPage(req , res) {
        var newPage = req.body;
        pageModel
            .createPage(newPage)
            .then(
                function(newPage) {
                    console.log(newPage);
                    res.json(newPage);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            )
    }

    function deletePage(req, res) {
        var id = req.params.pid;
        pageModel
            .deletePage(id)
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

    function updatePage(req, res) {
        var id = req.params.pid;
        var newPage = req.body;
        pageModel
            .updatePage(id, newPage)
            .then(
                function(newPage) {
                    console.log(newPage);
                    res.json(newPage);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

};