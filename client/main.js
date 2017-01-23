"use strict";

import { MongoCollection as Feed } from "../imports/collections/graph-api/feed/feed.js";
import { FetchAllFeedAlias } from "../imports/collections/graph-api/feed/publication-methods/fetch-all-feed.js";
import { Template } from 'meteor/templating';

var initPublicSettings = function () {
    if (typeof Meteor.settings === "undefined"
        || typeof Meteor.settings.public === "undefined") {
        return ;
    }
    var publicSettings = Meteor.settings.public;
    if (typeof publicSettings["facebook-graph-page-feed"] === "undefined") {
        return ;
    }
    publicSettings = publicSettings["facebook-graph-page-feed"];
    if (typeof publicSettings["use-default-client-feed"] === "undefined"
        || publicSettings["use-default-client-feed"] === false ) {
        return ;
    }
    import "meteor/cchevallay:facebook-graph-page-feed/imports/startup/client";
}

initPublicSettings();

export const FacebookPageFeed = {

    collection : Feed,

    fetchAllFeedAlias : FetchAllFeedAlias,

    subscribe : function (options = {}) {

        return Meteor.subscribe(FetchAllFeedAlias, options);
    }
}

import { MongoCollection as PhotosFeed } from "../imports/collections/graph-api/photos-feed/photos-feed.js";
import { FetchAllFeedAlias as FetchPhotosFeed } from "../imports/collections/graph-api/photos-feed/publication-methods/fetch-all-photos-feed.js";

export const FacebookPhotosFeed = {

    collection : PhotosFeed,

    fetchAllFeedAlias : FetchPhotosFeed,

    subscribe : function (options = {}) {

        return Meteor.subscribe(FetchPhotosFeed, options);
    }
}
