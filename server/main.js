"use strict";

import { MongoCollection as Feed } from "../imports/collections/graph-api/feed/feed.js";
import { MongoCollection as PhotosFeed } from "../imports/collections/graph-api/photos-feed/photos-feed.js";

import { FetchAllFeedAlias, FetchAllFeedMethod } from "../imports/collections/graph-api/feed/publication-methods/fetch-all-feed.js";

export const FacebookPageFeed = {

    collection : Feed,

    publish : function () {

        return Meteor.publish(FetchAllFeedAlias, FetchAllFeedMethod);
    }
};

import { FetchAllFeedAlias as FetchPhotosFeed, FetchAllFeedMethod as FetchPhotosFeedMethod } from "../imports/collections/graph-api/photos-feed/publication-methods/fetch-all-photos-feed.js";

export const FacebookPhotosFeed = {

    collection : PhotosFeed,

    publish : function () {

        return Meteor.publish(FetchPhotosFeed, FetchPhotosFeedMethod);
    }
};
