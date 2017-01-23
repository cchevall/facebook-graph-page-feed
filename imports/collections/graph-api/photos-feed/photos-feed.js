"use strict";

/**
 * Facebook Graph Photos Feed
 * mongo collection name
 * @type {String}
 */
export const CollectionName = "facebook:graph:photos:feed";

/**
 * Facebook Graph Photos Feed
 * mongo collection
 * @type {Meteor.Collection}
 */
export const MongoCollection = new Meteor.Collection( CollectionName );

if (Meteor.isServer) {

    MongoCollection._ensureIndex({ photo_id: 1 }, { unique: true });
}
/**
 * Load rules and schema
 * @param  {callback}
 * @return {void}
 */
Meteor.startup( function() {
    import "./photos-feed.rule.js";
});
