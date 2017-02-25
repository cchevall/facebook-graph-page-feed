"use strict";

import { ResourceAbstract } from "../../ResourceAbstract.js";
import { MongoCollection as PhotosFeed } from "meteor/cchevallay:facebook-graph-page-feed/imports/collections/graph-api/photos-feed/photos-feed.js";

/**
 * PhotosFeedResource
 * Dialog class with graph api: /feed
 */
export class PhotosFeedResource extends ResourceAbstract {

    constructor() {
        var fields = [ "created_time", "link", "name", "picture", "place", "likes.summary(true)", "comments.summary(true)" ].join(',');
        var params = {
            fields: fields,
            type: "uploaded"
        };
        super(params);
        this.initFacebookPage();
        this.buildRoute("photos");
    }

    /**
     * initFacebookPage
     * sets value of pageId
     * @throws {[SettingsException]} If [facebook-page-id is missing from settings file]
     */
    initFacebookPage() {
        if (typeof Meteor.settings["facebook-graph-page-feed"]["facebook-page-id"] === "undefined") {
            throw new SettingsException("pageIdMissing");
        }
        this.pageId = Meteor.settings["facebook-graph-page-feed"]["facebook-page-id"];
    }

    /**
     * saveResponse
     * @param  {object} [response]
     * @return {object} [facebook graph api response]
     */
    saveResponse(response) {
        response = super.saveResponse(response);
        if (this.continueToFetch === false) {
            return response;
        }
        for (var i = response.data.data.length - 1; i >= 0; i--) {
            if ( typeof response.data.data[i].id === "undefined" ) {
                continue ;
            }
            var feed = this.formatPhotosFeed( response.data.data[i] );
            var oldFeed = PhotosFeed.findOne({photo_id: response.data.data[i].id});
            if ( typeof oldFeed !== "undefined" ) {
                this.updatePhotosFeed( oldFeed, feed );
                continue ;
            }
            try {
                PhotosFeed.insert(feed);
            } catch (e) { console.error( e.message ) }
        }
        return response;
    }

    /**
     * updatePhotosFeed
     * @param  {object} oldFeed
     * @param  {object} newFeed
     */
    updatePhotosFeed( oldFeed, newFeed ) {
        try {
            PhotosFeed.update( { _id: oldFeed._id }, { $set: newFeed } );
        } catch (e) { console.error( e.message ) }
    }

    /**
     * formatPhotosFeed
     * @param  {Object} feed
     * @return {Object}
     */
    formatPhotosFeed( feed ) {
        var format = {
            photo_id: feed.id,
            created_time: feed.created_time,
            link: feed.link,
            name: feed.name,
            picture: feed.picture,
            image_url: this.domain + feed.id + "/picture",
            place: feed.place,
            likes: feed.likes,
            comments: feed.comments
        };
        return format;
    }

    /**
     * isUnique
     * ensure feed_id is unique
     * @param  {String}  id
     * @return {Boolean}
     */
    isUnique( id ) {
        return (typeof PhotosFeed.findOne({photo_id: id}) === "undefined");
    }

    /**
     * buildRoute
     * @param  {[string]} resource
     */
    buildRoute(resource) {
        this.route = this.domain + "v" + this.version + "/" + this.pageId + "/" + resource;
    }
}
