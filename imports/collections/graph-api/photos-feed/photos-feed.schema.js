"use strict";

import { MongoCollection as PhotosFeed } from "./photos-feed.js";

/**
 * PhotosFeedSchemas
 * Schemas list
 * @type {Object}
 */
var PhotosFeedSchemas = {};

PhotosFeedSchemas.likes = new SimpleSchema({
    data: {
        type: PhotosFeedSchemas.data,
        optional: true
    },
    summary: {
        type: PhotosFeedSchemas.summary,
        optional: true
    }
});

PhotosFeedSchemas.comments = new SimpleSchema({
    data: {
        type: PhotosFeedSchemas.data,
        optional: true
    },
    summary: {
        type: PhotosFeedSchemas.summary,
        optional: true
    }
});

PhotosFeedSchemas.feed = new SimpleSchema({
    photo_id: {
        type: String,
        unique: true,
        label: "feed_id",
        optional: false
    },
    created_time: {
        type: Date,
        label: "created_time",
        optional: false
    },
    link: {
        type: String,
        label: "link",
        optional: false
    },
    name: {
        type: String,
        label: "name",
        optional: true
    },
    picture: {
        type: String,
        label: "picture",
        optional: true
    },
    image_url: {
        type: String,
        label: "image_url",
        optional: true
    },
    place: {
        type: Object,
        label: "place",
        optional: true
    },
    likes: {
        type: FeedSchemas.likes,
        optional: true
    },
    shares: {
        type: FeedSchemas.shares,
        optional: true
    },
    comments: {
        type: FeedSchemas.comments,
        optional: true
    }
});

PhotosFeed.attachSchema( PhotosFeedSchemas.feed );
