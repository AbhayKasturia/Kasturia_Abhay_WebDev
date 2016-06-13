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
        findAllWidgetsForPage: findAllWidgetsForPage,
        reorderWidget: reorderWidget
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

        var pid = newWidget._page;

        return Widget
            .find({"_page": pid})
            .then(
                function (widgets) {
                    newWidget.order = widgets.length ;
                    return Widget.create(newWidget);
                },
                function (error) {
                    return null;
                }
            );
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

    function reorderWidget(pid,start,end){
        console.log("Start="+start);
        console.log("End="+end);

        return Widget
            .find({_page: pid}, function (err, widgets) {
                widgets.forEach(function(widget){
                    if(start< end){
                        if(widget.order > start && widget.order <= end){
                            widget.order= widget.order - 1;
                            widget.save();
                        }

                        else if(widget.order === start){
                            widget.order = end;
                            widget.save();
                        }
                    } else{
                        if(widget.order < start && widget.order >= end){
                            widget.order=widget.order+1;
                            widget.save();

                        }
                        else if(widget.order === start){
                            widget.order = end;
                            widget.save();
                        }
                    }
                });
            });
    }

}