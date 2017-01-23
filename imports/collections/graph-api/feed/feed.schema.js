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
        label: "id",
        optional: true
    },
    name: {
        type: String,
        label: "name",
        optional: true
    }
});

FeedSchemas.summary = new SimpleSchema({
    total_count: {
        type: SimpleSchema.Integer,
        label: "count",
        optional: true
    },
    can_like: {
        type: Boolean,
        label: "can_like",
        optional: true
    },
    can_comment: {
        type: Boolean,
        label: "can_comment",
        optional: true
    },
    order: {
        type: String,
        label: "order",
        optional: true
    },
    has_liked: {
        type: Boolean,
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

FeedSchemas.shares = new SimpleSchema({
    count: {
        type: SimpleSchema.Integer,
        label: "shares",
        optional: true
    },
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
        label: "description",
        optional: true
    },
    from: {
        type: Object,
        label: "from",
        optional: true
    },
    link: {
        type: String,
        label: "link",
        optional: false
    },
    message: {
        type: String,
        label: "message",
        optional: true
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

FeedSchemas.status = new SimpleSchema({
    created_time: {
        type: Date,
        label: "created_time",
        optional: false
    },
    message: {
        type: String,
        label: "message",
        optional: true
    },
    name: {
        type: String,
        label: "name",
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

FeedSchemas.event = new SimpleSchema({
    description: {
        type: String,
        label: "description",
        optional: true
    },
    name: {
        type: String,
        label: "name",
        optional: true
    },
    link: {
        type: String,
        label: "link",
        optional: false
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

FeedSchemas.photo = new SimpleSchema({
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
    location: {
        type: String,
        label: "name",
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

FeedSchemas.video = new SimpleSchema({
    created_time: {
        type: Date,
        label: "created_time",
        optional: false
    },
    description: {
        type: String,
        label: "description",
        optional: true
    },
    from: {
        type: Object,
        label: "from",
        optional: true
    },
    source: {
        type: String,
        label: "source",
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
    },
    statusResource: {
        type: FeedSchemas.status,
        optional: true
    }
});

Feed.attachSchema( FeedSchemas.feed );
