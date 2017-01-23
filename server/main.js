"use strict";

import { MongoCollection as Feed } from "../imports/collections/graph-api/feed/feed.js";
import { MongoCollection as PhotosFeed } from "../imports/collections/graph-api/photos-feed/photos-feed.js";

import { FetchAllFeedAlias, FetchAllFeedMethod } from "../imports/collections/graph-api/feed/publication-methods/fetch-all-feed.js";
import { FeedResource } from "meteor/cchevallay:facebook-graph-page-feed/imports/resources/graph/feed/feed.js";

var limit = 1;
if (typeof Meteor.settings["facebook-graph-page-feed"]["fetch-limit"] !== "undefined") {
    var limit = Meteor.settings["facebook-graph-page-feed"]["fetch-limit"];
}

var feedResource = new FeedResource();
feedResource.fetchAllHalCollection(limit);

export const FacebookPageFeed = {

    collection : Feed,

    publish : function () {

        return Meteor.publish(FetchAllFeedAlias, FetchAllFeedMethod);
    }
};

import { FetchAllFeedAlias as FetchPhotosFeed, FetchAllFeedMethod as FetchPhotosFeedMethod } from "../imports/collections/graph-api/photos-feed/publication-methods/fetch-all-photos-feed.js";
import { PhotosFeedResource } from "meteor/cchevallay:facebook-graph-page-feed/imports/resources/graph/photos-feed/photos-feed.js";

var photosFeedResource = new PhotosFeedResource();
photosFeedResource.fetchAllHalCollection(limit);

export const FacebookPhotosFeed = {

    collection : PhotosFeed,

    publish : function () {

        return Meteor.publish(FetchPhotosFeed, FetchPhotosFeedMethod);
    }
};

var loadFacebookFeedPage = function () {
    if (typeof Meteor.settings === "undefined"
        || typeof Meteor.settings.public === "undefined") {
        return false;
    }
    var publicSettings = Meteor.settings.public;
    if (typeof publicSettings["facebook-graph-page-feed"] === "undefined") {
        return false;
    }
    publicSettings = publicSettings["facebook-graph-page-feed"];
    if (typeof publicSettings["use-default-client-feed"] === "undefined"
        || publicSettings["use-default-client-feed"] === false ) {
        return false;
    }
    return true;
}

if ( loadFacebookFeedPage() === true ) {

    Meteor.publish(FetchAllFeedAlias, FetchAllFeedMethod);
}
