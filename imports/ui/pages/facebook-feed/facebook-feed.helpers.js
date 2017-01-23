import { FacebookPageFeed } from "meteor/cchevallay:facebook-graph-page-feed";

var helpers = {};

helpers["fetchAllFeed"] = function ( ) {

    var limit = typeof Session.get("FacebookFeedLimit") !== "undefined" ? Session.get("FacebookFeedLimit") : 1;
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

    return !(FacebookPageFeed.collection.find().count() < Session.get("FacebookFeedLimit"));
}

Template.facebookFeed.helpers(helpers);
