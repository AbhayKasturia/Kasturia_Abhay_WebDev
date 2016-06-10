/**
 * Created by Abhay on 6/10/2016.
 */


module.exports = function(){

    var mongoose = require("mongoose");

    var PageSchema = require("./page.schema.server.js")();

    var Page= mongoose.model("Page", PageSchema);

    var api = {
        createPage: createPage,
        deletePage: deletePage,
        updatePage: updatePage,
        findPageByID: findPageByID,
        findAllPagesForWebsite: findAllPagesForWebsite
    };

    return api;

    function findAllPagesForWebsite(wid){
        return Page.find({"_website": wid});
    }

    function findPageByID(pid){
        return Page.findById(pid);
    }

    function createPage(newPage){
        delete newPage._id;

        return Page.create(newPage);
    }

    function deletePage(pid){
        return Page.remove({_id: wid});
    }

    function updatePage(pid , newPage){
        delete newPage._id;

        return Page
            .update({_id: pid},{
                $set: newPage
            });
    }
}