 "use strict";

import { Meteor } from 'meteor/meteor';
import { CollectionName, MongoCollection } from "../feed.js";
import { FeedResource } from "meteor/cchevallay:facebook-graph-page-feed/imports/resources/graph/feed/feed.js";

var updateFeed = function () {

    var feedResource = new FeedResource();
    feedResource.fetchAllHalCollection(1);
}

/**
 * FetchAllFeedAlias
 * @type {string}
 */
export const FetchAllFeedAlias = CollectionName + "FetchAllFeed";

/**
 * FetchAllFeedMethod
 */
export var FetchAllFeedMethod = function (options = {}) {

    options.sort = typeof options.sort !== "undefined" ? options.sort : [["created_time", "desc"]];
    var data = MongoCollection.find({}, options);
    // Meteor.defer(updateFeed);
    if (data) {
        return data;
    }
    return this.ready();
};
