"use strict";

import { MongoCollection as PhotosFeed } from "./photos-feed.js";

/**
 * insertDenyRule
 * @param  { null | string } userId
 * @param  { object } doc
 * @return { Boolean }
 */
var insertDenyRule = function ( userId, doc ) {

    return true;
}

/**
 * updateDenyRule
 * @param  { null | string } userId
 * @param  { object } doc
 * @param  { object } fields
 * @param  { object } modifier
 * @return { Boolean }
 */
var updateDenyRule = function ( userId, doc, fields, modifier ) {

    return true;
}

/**
 * removeDenyRule
 * @param  { null | string } userId
 * @param  { object } doc
 * @return { Boolean }
 */
var removeDenyRule = function ( userId, doc ) {

    return true;
}

/**
 * Deny methods
 * @type {void}
 */
PhotosFeed.deny({

    insert: insertDenyRule,

    update: updateDenyRule,

    remove: removeDenyRule

});
