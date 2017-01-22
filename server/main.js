"use strict";

import { MongoCollection } from "../imports/collections/graph-api/feed/feed.js";
import { FetchAllFeedAlias, FetchAllFeedMethod } from "../imports/collections/graph-api/feed/publication-methods/fetch-all-feed.js";
import { FeedResource } from "meteor/cchevallay:facebook-graph-page-feed/imports/resources/graph/feed/feed.js";

// var feedResource = new FeedResource();
// feedResource.fetchAllHalCollection(2);

export const FacebookPageFeed = {

    collection : MongoCollection,

    publish : function () {

        return Meteor.publish(FetchAllFeedAlias, FetchAllFeedMethod);
    }
};
