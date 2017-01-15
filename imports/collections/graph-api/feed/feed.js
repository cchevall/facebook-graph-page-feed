"use strict";

/**
 * Facebook Graph Feed
 * mongo collection name
 * @type {String}
 */
export const CollectionName = "facebook:graph:feed";

/**
 * Facebook Graph Feed
 * mongo collection
 * @type {Meteor.Collection}
 */
export const MongoCollection = new Meteor.Collection( CollectionName );

/**
 * Load rules and schema
 * @param  {callback}
 * @return {void}
 */
Meteor.startup( function() {
    MongoCollection._ensureIndex({feed_id: 1}, {unique: 1});
    import "./feed.rule.js";
    import "./feed.schema.js";
});
