var helpers = {};

helpers["isYoutubeVideo"] = function (source) {

    return source.indexOf("www.youtube.com") !== -1;
};

helpers["noAutoplay"] = function (source) {
    return source.replace("autoplay=1", "autoplay=0");
}

Template.videoFeed.helpers(helpers);
