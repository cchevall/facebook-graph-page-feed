"use strict";

import { MongoCollection as Feed } from "./feed.js";

/**
 * FeedSchemas
 * Schemas list
 * @type {Object}
 */
var FeedSchemas = {};

FeedSchemas.data = new SimpleSchema({
    id: {
        type: String,
        unique: false,
        label: "id",
        optional: true
    },
    name: {
        type: String,
        unique: false,
        label: "name",
        optional: true
    }
});

FeedSchemas.summary = new SimpleSchema({
    total_count: {
        type: SimpleSchema.Integer,
        unique: false,
        label: "count",
        optional: true
    },
    can_like: {
        type: Boolean,
        unique: false,
        label: "can_like",
        optional: true
    },
    can_comment: {
        type: Boolean,
        unique: false,
        label: "can_comment",
        optional: true
    },
    order: {
        type: String,
        unique: false,
        label: "order",
        optional: true
    },
    has_liked: {
        type: Boolean,
        unique: false,
        label: "has_liked",
        optional: true
    }
});

FeedSchemas.likes = new SimpleSchema({
    data: {
        type: FeedSchemas.data,
        optional: true
    },
    summary: {
        type: FeedSchemas.summary,
        optional: true
    }
});

FeedSchemas.comments = new SimpleSchema({
    data: {
        type: FeedSchemas.data,
        optional: true
    },
    summary: {
        type: FeedSchemas.summary,
        optional: true
    }
});

FeedSchemas.link = new SimpleSchema({
    created_time: {
        type: Date,
        label: "created_time",
        optional: false
    },
    description: {
        type: String,
        unique: false,
        label: "description",
        optional: true
    },
    from: {
        type: Object,
        unique: false,
        label: "from",
        optional: true
    },
    link: {
        type: String,
        unique: false,
        label: "link",
        optional: false
    },
    message: {
        type: String,
        unique: false,
        label: "message",
        optional: true
    },
    name: {
        type: String,
        unique: false,
        label: "name",
        optional: true
    },
    picture: {
        type: String,
        unique: false,
        label: "picture",
        optional: true
    },
    likes: {
        type: FeedSchemas.likes,
        optional: true
    },
    comments: {
        type: FeedSchemas.comments,
        optional: true
    }
});

FeedSchemas.event = new SimpleSchema({
    description: {
        type: String,
        unique: false,
        label: "description",
        optional: true
    },
    name: {
        type: String,
        unique: false,
        label: "name",
        optional: true
    },
    link: {
        type: String,
        unique: false,
        label: "link",
        optional: false
    },
    likes: {
        type: FeedSchemas.likes,
        optional: true
    },
    comments: {
        type: FeedSchemas.comments,
        optional: true
    }
});

FeedSchemas.photo = new SimpleSchema({
    created_time: {
        type: Date,
        label: "created_time",
        optional: false
    },
    link: {
        type: String,
        unique: false,
        label: "link",
        optional: false
    },
    name: {
        type: String,
        unique: false,
        label: "name",
        optional: true
    },
    location: {
        type: String,
        unique: false,
        label: "name",
        optional: true
    },
    likes: {
        type: FeedSchemas.likes,
        optional: true
    },
    comments: {
        type: FeedSchemas.comments,
        optional: true
    }
});

FeedSchemas.video = new SimpleSchema({
    created_time: {
        type: Date,
        label: "created_time",
        optional: false
    },
    description: {
        type: String,
        unique: false,
        label: "description",
        optional: true
    },
    from: {
        type: Object,
        unique: false,
        label: "from",
        optional: true
    },
    source: {
        type: String,
        unique: false,
        label: "source",
        optional: true
    },
    likes: {
        type: FeedSchemas.likes,
        optional: true
    },
    comments: {
        type: FeedSchemas.comments,
        optional: true
    }
});

FeedSchemas.feed = new SimpleSchema({
    feed_id: {
        type: String,
        unique: true,
        label: "feed_id",
        optional: false
    },
    type: {
        type: String,
        label: "type",
        optional: false
    },
    message: {
        type: String,
        label: "message",
        optional: true
    },
    story: {
        type: String,
        label: "story",
        optional: true
    },
    created_time: {
        type: Date,
        label: "created_time",
        optional: false
    },
    object_id: {
        type: String,
        label: "object_id",
        optional: true
    },
    image_url: {
        type: String,
        label: "image_url",
        optional: true
    },
    linkResource: {
        type: FeedSchemas.link,
        optional: true
    },
    eventResource: {
        type: FeedSchemas.event,
        optional: true
    },
    photoResource: {
        type: FeedSchemas.photo,
        optional: true
    },
    videoResource: {
        type: FeedSchemas.video,
        optional: true
    }
});

Feed.attachSchema( FeedSchemas.feed );
