"use strict";

import SimpleSchema from 'simpl-schema';
import { MongoCollection as Feed } from "./feed.js";

/**
 * FeedSchemas
 * Schemas list
 * @type {Object}
 */
var FeedSchemas = {};

FeedSchemas.feed = new SimpleSchema({
    feed_id : {
        type: String,
        label: "feed_id",
        optional: false
    },
    message : {
        type: String,
        label: "message",
        optional: true
    },
    story : {
        type: String,
        label: "story",
        optional: true
    },
    created_time : {
        type: Date,
        label: "created_time",
        optional: false
    },
    object_id : {
        type: String,
        label: "object_id",
        optional: true
    },
    image_url : {
        type: String,
        label: "image_url",
        optional: true
    }
});

Feed.attachSchema( FeedSchemas.feed );
