var helpers = {};

helpers["isYoutubeVideo"] = function (source) {

    return source.indexOf("www.youtube.com") !== -1;
};

Template.videoFeed.helpers(helpers);
