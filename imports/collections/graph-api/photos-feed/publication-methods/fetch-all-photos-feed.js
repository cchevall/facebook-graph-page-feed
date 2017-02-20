 "use strict";

import { Meteor } from 'meteor/meteor';
import { CollectionName, MongoCollection } from "../photos-feed.js";
import { PhotosFeedResource } from "meteor/cchevallay:facebook-graph-page-feed/imports/resources/graph/photos-feed/photos-feed.js";

/**
 * FetchAllFeedAlias
 * @type {string}
 */
export const FetchAllFeedAlias = CollectionName + "FetchAllFeed";

/**
 * FetchAllFeedMethod
 */
export var FetchAllFeedMethod = function (options = {}) {

    var ceil = typeof options.limit === "undefined" ? 1 : Math.ceil(options.limit / 25);
    options.sort = typeof options.sort !== "undefined" ? options.sort : [["created_time", "desc"]];
    var data = MongoCollection.find({}, options);
    var limit = 1;
    if (typeof Meteor.settings["facebook-graph-page-feed"]["fetch-limit"] !== "undefined") {
        limit = Meteor.settings["facebook-graph-page-feed"]["fetch-limit"];
    }
    if ( ceil <= limit || limit === -1 ) {
        Meteor.defer( function ( ) {
            var feedResource = new PhotosFeedResource( );
            feedResource.fetchAllHalCollection( ceil );
        } );
    }
    if ( data ) {
        return data;
    }
    return this.ready( );
};
