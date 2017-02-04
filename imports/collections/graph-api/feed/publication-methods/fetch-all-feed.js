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
    if (count <= ceil) {
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
