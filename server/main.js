"use strict";

import { MongoCollection } from "../imports/collections/graph-api/feed/feed.js";
import { FetchAllFeedAlias, FetchAllFeedMethod } from "../imports/collections/graph-api/feed/publication-methods/fetch-all-feed.js";


export const FacebookPageFeed = {

    collection : MongoCollection,

    publish : function () {

        Meteor.publish(FetchAllFeedAlias, FetchAllFeedMethod);
    }
};
