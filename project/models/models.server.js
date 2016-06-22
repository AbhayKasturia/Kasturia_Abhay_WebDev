// entry base to connect to database

module.exports = function(){

    var models = {
        projectUserModel: require("./user/user.model.server.js")(),
        projectQuestionModel: require("./question/question.model.server.js")(),
        projectAnswerModel:require("./answer/answer.model.server.js")()//,
        // websiteModel: require("./website/website.model.server.js")(),
        // pageModel: require("./page/page.model.server.js")(),
        // widgetModel: require("./widget/widget.model.server.js")()
    };
    return models;
};
