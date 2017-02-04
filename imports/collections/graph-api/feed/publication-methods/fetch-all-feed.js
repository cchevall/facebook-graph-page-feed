 "use strict";

import { Meteor } from 'meteor/meteor';
import { CollectionName, MongoCollection } from "../feed.js";
import { FeedResource } from "meteor/cchevallay:facebook-graph-page-feed/imports/resources/graph/feed/feed.js";

/**
 * FetchAllFeedAlias
 * @type {string}
 */
export const FetchAllFeedAlias = CollectionName + "FetchAllFeed";

/**
 * FetchAllFeedMethod
 */
export var FetchAllFeedMethod = function (options = {}) {

    var ceil = typeof options.limit === "undefined" ? 1 : Math.ceil(options.limit / 25);
    options.sort = typeof options.sort !== "undefined" ? options.sort : [["created_time", "desc"]];
    var data = MongoCollection.find({}, options);
    var count = MongoCollection.find().count() / 25;
    var limit = 1;
    if (typeof Meteor.settings["facebook-graph-page-feed"] !== "undefined"
        && Meteor.settings["facebook-graph-page-feed"]["fetch-limit"] !== "undefined") {
        limit = Meteor.settings["facebook-graph-page-feed"]["fetch-limit"];
    }
    if ( ceil <= limit || limit === -1 ) {
        Meteor.defer( function ( ) {
            var feedResource = new FeedResource();
            feedResource.fetchAllHalCollection(ceil);
        });
    }
    if (data) {
        return data;
    }
    return this.ready();
};
