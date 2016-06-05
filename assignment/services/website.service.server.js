/**
 * Created by Abhay on 6/3/2016.
 */

module.exports = function(app) {

    var websites =
        [
            { "_id": "123", "name": "Facebook", "desc": "Social Networking Site",   "developerId": "456" },
            { "_id": "234", "name": "Tweeter", "desc": "Social Networking Site",    "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",  "desc": "Social Networking Site",   "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "desc": "Social Networking Site","developerId": "123" },
            { "_id": "678", "name": "Checkers", "desc": "Social Networking Site",   "developerId": "123" },
            { "_id": "789", "name": "Chess", "desc": "Social Networking Site",      "developerId": "234" }
        ];
    
    app.post("/api/user/:uid/website" , createWebsite);
    app.get("/api/user/:uid/website" , findAllWebsitesForUser);
    app.get("/api/website/:wid" , findWebsiteByID);
    app.put("/api/website/:wid" , updateWebsite);
    app.delete("/api/website/:wid" , deleteWebsite);
    
    function findWebsiteByID(req,res){
        var id = req.params.wid;
        for(var i in websites) {
            if(websites[i]._id === id) {
                res.json(websites[i]);
                return;
            }
        }
        res.json();
    };

    function findAllWebsitesForUser(req, res){
        var uid = req.params.uid;
        var user_websites = [];
        for(var i in websites){
            if(websites[i].developerId=== uid)
            {
                user_websites.push(websites[i]);
            }
        }
        res.json(user_websites);
    }

    function createWebsite(req , res) {
        var newWebsite = req.body;
        websites.push(newWebsite);
        res.sendStatus(200);
    }

    function deleteWebsite(req, res) {
        var id = req.params.wid;
        for (var i in websites) {
            if (websites[i]._id === id)
            {
                websites.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function updateWebsite(req, res) {
        var id = req.params.wid;
        var newWebsite = req.body;
        for (var i in websites) {
            if (websites[i]._id === id)
            {
                websites[i]=newWebsite;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

};