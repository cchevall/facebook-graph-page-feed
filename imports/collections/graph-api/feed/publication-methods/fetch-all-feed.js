 "use strict";

import { Meteor } from 'meteor/meteor';
import { CollectionName, MongoCollection } from "../feed.js";

/**
 * FetchAllFeedAlias
 * @type {string}
 */
export const FetchAllFeedAlias = CollectionName + "FetchAllFeed";

/**
 * FetchAllFeedMethod
 */
export var FetchAllFeedMethod = function () {

    var data = MongoCollection.find({});
    if (data) {
        return data;
    }
    return this.ready();
};
