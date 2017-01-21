 "use strict";

import { Meteor } from 'meteor/meteor';
import { CollectionName, MongoCollection } from "../feed.js";

if (Meteor.isServer) {
    import { FeedResource } from "meteor/cchevallay:facebook-graph-page-feed/imports/resources/graph/feed/feed.js";
}

/**
 * FetchAllFeedAlias
 * @type {string}
 */
export const FetchAllFeedAlias = CollectionName + "FetchAllFeed";

/**
 * FetchAllFeedMethod
 */
export var FetchAllFeedMethod = function () {

    var feedResource = new FeedResource();
    feedResource.fetchAllHalCollection();
    var data = MongoCollection.find({});
    if (data) {
        return data;
    }
    return this.ready();
};
