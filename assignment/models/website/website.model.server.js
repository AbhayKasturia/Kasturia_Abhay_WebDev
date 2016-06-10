/**
 * Created by Abhay on 6/8/2016.
 */

// encapsulate all operations with the database
// this module gives us a high level api to interact with the database

module.exports = function(){

    var mongoose = require("mongoose");

    var WebsiteSchema = require("./website.schema.server.js")();

    var Website= mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        deleteWebsite: deleteWebsite,
        updateWebsite: updateWebsite,
        findWebsiteByID: findWebsiteByID,
        findAllWebsitesForUser: findAllWebsitesForUser
    };

    return api;

    function findAllWebsitesForUser(uid){
        return Website.find({"_user": uid});
    }

    function findWebsiteByID(wid){
        return Website.findById(wid);
    }

    function createWebsite(newWebsite){
        delete newWebsite._id;

        return Website.create(newWebsite);
    }

    function deleteWebsite(wid){
        return Website.remove({_id: wid});
    }

    function updateWebsite(wid , newWebsite){
        delete newWebsite._id;

        return Website
            .update({_id: wid},{
                $set: newWebsite
            });
    }
}