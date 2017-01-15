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
    id : {
        type: String,
        unique: true,
        optional: false
    },
    message : {
        type: String,
        optional: true
    },
    story : {
        type: String,
        optional: true
    },
    created_time : {
        type: Date,
        optional: false
    },
    object_id : {
        type: String,
        optional: true
    },
    image_url : {
        type: String,
        optional: true
    }
});

Feed.attachSchema( FeedSchemas );
