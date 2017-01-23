 "use strict";

import { Meteor } from 'meteor/meteor';
import { CollectionName, MongoCollection } from "../photos-feed.js";
import { PhotosFeedResource } from "meteor/cchevallay:facebook-graph-page-feed/imports/resources/graph/photos-feed/photos-feed.js";

var updateFeed = function () {
    var limit = 1;
    if (typeof Meteor.settings["facebook-graph-page-feed"]["fetch-limit"] !== "undefined") {
        var limit = Meteor.settings["facebook-graph-page-feed"]["fetch-limit"];
    }
    var feedResource = new PhotosFeedResource();
    feedResource.fetchAllHalCollection(limit);
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
    Meteor.defer(updateFeed);
    if (data) {
        return data;
    }
    return this.ready();
};
