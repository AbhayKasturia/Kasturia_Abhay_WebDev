/**
 * Created by Abhay on 6/3/2016.
 */

module.exports = function(app) {

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
        for(var i in pages) {
            if(pages[i]._id === id) {
                res.json(pages[i]);
                return;
            }
        }
        res.json();
    };

    function findAllPagesForWebsite(req, res){
        var wid = req.params.wid;
        var websites_pages = [];
        for(var i in pages){
            if(pages[i].websiteId === wid)
            {
                websites_pages.push(pages[i]);
            }
        }
        res.send(websites_pages);
    }

    function createPage(req , res) {
        var newPage = req.body;
        pages.push(newPage);
        res.sendStatus(200);
    }

    function deletePage(req, res) {
        var id = req.params.pid;
        for (var i in pages) {
            if (pages[i]._id === id)
            {
                pages.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function updatePage(req, res) {
        var id = req.params.pid;
        var newPage = req.body;
        for (var i in pages) {
            if (pages[i]._id === id)
            {
                pages[i]=newPage;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

};