/**
 * Created by Abhay on 6/8/2016.
 */

// encapsulate all operations with the database
// this module gives us a high level api to interact with the database

module.exports = function(){

    var mongoose = require("mongoose");

    var WidgetSchema = require("./widget.schema.server.js")();

    var Widget= mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        deleteWidget: deleteWidget,
        updateWidget: updateWidget,
        findWidgetByID: findWidgetByID,
        findAllWidgetsForPage: findAllWidgetsForPage
    };

    return api;

    function findAllWidgetsForPage(pid){
        return Widget.find({"_page": pid});
    }

    function findWidgetByID(wgid){
        return Widget.findById(wgid);
    }

    function createWidget(newWidget){
        delete newWidget._id;

        return Widget.create(newWidget);
    }

    function deleteWidget(wgid){
        return Widget.remove({_id: wgid});
    }

    function updateWidget(wgid , newWidget){
        delete newWidget._id;

        return Widget
            .update({_id: wgid},{
                $set: newWidget
            });
    }
}