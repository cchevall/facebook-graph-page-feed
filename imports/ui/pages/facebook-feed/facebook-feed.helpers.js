import { FacebookPageFeed } from "meteor/cchevallay:facebook-graph-page-feed";

var helpers = {};

helpers["fetchAllFeed"] = function ( ) {

    var feed = FacebookPageFeed.collection.find({}, { limit: Session.get("loadedPageFeed") }).fetch();
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

    return !(FacebookPageFeed.collection.find().count() < Session.get("limitPageFeed") );
}

Template.facebookFeed.helpers(helpers);
