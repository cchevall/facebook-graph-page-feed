"use strict";

import { MongoCollection } from "../imports/collections/graph-api/feed/feed.js";
import { FetchAllFeedAlias } from "../imports/collections/graph-api/feed/publication-methods/fetch-all-feed.js";

export const FacebookPageFeed = {

    collection : MongoCollection,

    fetchAllFeedAlias : FetchAllFeedAlias,

    subscribe : function () {

        return Meteor.subscribe(FetchAllFeedAlias);
    }
}
