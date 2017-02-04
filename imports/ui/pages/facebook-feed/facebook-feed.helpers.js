import { FacebookPageFeed } from "meteor/cchevallay:facebook-graph-page-feed";

var helpers = {};

helpers["fetchAllFeed"] = function ( ) {

    var limit = typeof Template.instance().limit.get() !== "undefined" ? Template.instance().limit.get() : 1;
    var scroll = {
        limit: limit
    };
    var feed = FacebookPageFeed.collection.find({}, scroll).fetch();
    return feed;
}

helpers["isPhoto"] = function ( type ) {

    return type === "photo";
}

helpers["isVideo"] = function ( type ) {

    return type === "video";
}

helpers["isEvent"] = function ( type ) {

    return type === "event";
}

helpers["isLink"] = function ( type ) {

    return type === "link";
}

helpers["isStatus"] = function ( type ) {

    return type === "status";
}

helpers["moreResults"] = function( ) {

    return !(FacebookPageFeed.collection.find().count() < Template.instance().limit.get());
}

Template.facebookFeed.helpers(helpers);
