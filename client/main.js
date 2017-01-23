"use strict";

import { MongoCollection } from "../imports/collections/graph-api/feed/feed.js";
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

    collection : MongoCollection,

    fetchAllFeedAlias : FetchAllFeedAlias,

    subscribe : function (options = {}) {

        return Meteor.subscribe(FetchAllFeedAlias, options);
    }
}
