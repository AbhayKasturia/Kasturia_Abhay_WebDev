/**
 * Created by Abhay on 6/8/2016.
 */

// entry base to connect to database

module.exports = function(){

    var mongoose = require("mongoose");

    mongoose.connect('mongodb://localhost/cs5610summer1');

    var models = {
        userModel: require("./user/user.model.server.js")(),
        websiteModel: require("./website/website.model.server.js")(),
        pageModel: require("./page/page.model.server.js")(),
        widgetModel: require("./widget/widget.model.server.js")()
    };
    return models;
};
