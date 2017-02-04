"use strict";

import { MongoCollection as Feed } from "../imports/collections/graph-api/feed/feed.js";
import { FetchAllFeedAlias } from "../imports/collections/graph-api/feed/publication-methods/fetch-all-feed.js";
import "../imports/startup/client/index.js";
import { Template } from 'meteor/templating';

export const FacebookPageFeed = {

    collection : Feed,

    fetchAllFeedAlias : FetchAllFeedAlias,

    subscribe : function (options = {}) {

        return Meteor.subscribe(FetchAllFeedAlias, options);
    }
}

import { MongoCollection as PhotosFeed } from "../imports/collections/graph-api/photos-feed/photos-feed.js";
import { FetchAllFeedAlias as FetchPhotosFeed } from "../imports/collections/graph-api/photos-feed/publication-methods/fetch-all-photos-feed.js";

export const FacebookPhotosFeed = {

    collection : PhotosFeed,

    fetchAllFeedAlias : FetchPhotosFeed,

    subscribe : function (options = {}) {

        return Meteor.subscribe(FetchPhotosFeed, options);
    }
}
