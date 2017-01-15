 "use strict";

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

    var data = MongoCollection.find(
        {},
        {
            fields : {
                message: 1,
                story: 1,
                created_time: 1,
                id: 1,
                object_id: 1,
                image_url: 1
            }
        }
    );
    if (data) {
        return data;
    }
    return this.ready();
};
