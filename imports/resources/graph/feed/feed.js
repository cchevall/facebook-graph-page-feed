"use strict";

import { ResourceAbstract } from "../../ResourceAbstract.js";
import { ObjectIdResource } from "../object-id/object-id.js";
import { StatusResource } from "../status/status.js";
import { LinkResource } from "../link/link.js";
import { EventResource } from "../event/event.js";
import { PhotoResource } from "../photo/photo.js";
import { PictureResource } from "../picture/picture.js";
import { VideoResource } from "../video/video.js";
import { MongoCollection as Feed } from "meteor/cchevallay:facebook-graph-page-feed/imports/collections/graph-api/feed/feed.js";

/**
 * FeedResource
 * Dialog class with graph api: /feed
 */
export class FeedResource extends ResourceAbstract {

    constructor() {
        var params = {
            fields: [
                "type",
                "story",
                "message",
                "created_time"
            ]
        };
        super(params);
        this.fetchMethods = {
            status: this.fetchStatus,
            event: this.fetchEvent,
            photo: this.fetchPhoto,
            video: this.fetchVideo,
            link: this.fetchLink
        };
        this.initFacebookPage();
        this.buildRoute("feed");
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
     * mergeData
     * override the mergeData method to merge other queries to the response object
     * adds object_id and image_url to each response.data.data
     * @param  {[object]} response
     * @return {[object]} response
     */
    mergeData(response) {
        if (typeof response.data === "undefined"
            || typeof response.data.data === "undefined") {
            return response;
        }
        for (var i = response.data.data.length - 1; i >= 0; i--) {
            if (typeof response.data.data[i].id === "undefined") {
                continue ;
            }
            var objectId = this.fetchObjectId(response.data.data[i].id);
            if (objectId !== null) {
                response.data.data[i].object_id = objectId;
                response.data.data[i].image_url = this.getImageUrl(objectId);
            }
            if (typeof this.fetchMethods[response.data.data[i].type] === "undefined") {
                continue ;
            }
            response.data.data[i][response.data.data[i].type + "Resource"] = this.fetchMethods[response.data.data[i].type](response.data.data[i].id);
        }
        return response;
    }

    /**
     * fetchStatus
     * fetch status resource from graph
     * @param  {[Int]} id
     * @return {[Object|null]}
     */
    fetchStatus(id) {
        var statusResource = new StatusResource(id);
        var status = statusResource.fetchAll();
        if (typeof status.data.likes.data !== "Object") {
            status.data.likes.data = {};
        }
        if (typeof status.data.comments.data !== "Object") {
            status.data.comments.data = {};
        }
        return status.data || null;
    }

    /**
     * fetchLink
     * fetch link resource from graph
     * @param  {[Int]} id
     * @return {[Object|null]}
     */
    fetchLink(id) {
        var linkResource = new LinkResource(id);
        var link = linkResource.fetchAll();
        if ( link === null ) {
            return null;
        }
        if (typeof link.data.likes.data !== "Object") {
            link.data.likes.data = {};
        }
        if (typeof link.data.comments.data !== "Object") {
            link.data.comments.data = {};
        }
        return link.data || null;
    }

    /**
     * fetchPhoto
     * fetch photo resource from graph
     * @param  {[Int]} id
     * @return {[Object|null]}
     */
    fetchPhoto(id) {
        var photoResource = new PhotoResource(id);
        var photo = photoResource.fetchAll();
        if ( photo === null ) {
            return null;
        }
        if (typeof photo.data.likes.data !== "Object") {
            photo.data.likes.data = {};
        }
        if (typeof photo.data.comments.data !== "Object") {
            photo.data.comments.data = {};
        }
        return photo.data || null;
    }

    /**
     * fetchPicture
     * fetch photo resource from graph
     * @param  {[Int]} id
     * @return {[Object|null]}
     */
    fetchPicture(id) {
        var pictureResource = new PictureResource(id);
        var picture = pictureResource.fetchAll();
        return picture || null;
    }

    /**
     * fetchVideo
     * fetch video resource from graph
     * @param  {[Int]} id
     * @return {[Object|null]}
     */
    fetchVideo(id) {
        var videoResource = new VideoResource(id);
        var video = videoResource.fetchAll();
        if ( video === null ) {
            return null;
        }
        if (typeof video.data.likes.data !== "Object") {
            video.data.likes.data = {};
        }
        if (typeof video.data.comments.data !== "Object") {
            video.data.comments.data = {};
        }
        return video.data || null;
    }

    /**
     * fetchEvent
     * fetch event resource from graph
     * @param  {[Int]} id
     * @return {[Object|null]}
     */
    fetchEvent(id) {
        var eventResource = new EventResource(id);
        var event = eventResource.fetchAll();
        if ( event === null ) {
            return null;
        }
        if (typeof event.data.likes.data !== "Object") {
            event.data.likes.data = {};
        }
        if (typeof event.data.comments.data !== "Object") {
            event.data.comments.data = {};
        }
        return event.data || null;
    }

    /**
     * saveResponse
     * @param  {object} [response]
     * @return {object} [facebook graph api response]
     */
    saveResponse(response) {
        response = super.saveResponse(response);
        for (var i = response.data.data.length - 1; i >= 0; i--) {
            if ( typeof response.data.data[i].id === "undefined" ) {
                continue ;
            }
            var feed = this.formatFeed( response.data.data[i] )
            var oldFeed = Feed.findOne({feed_id: response.data.data[i].id});
            if ( typeof oldFeed !== "undefined" ) {
                this.updateFeed( oldFeed, feed );
                continue ;
            }
            try {
                Feed.insert(feed);
            } catch (e) { console.error( e.message ) }
        }
        return response;
    }

    updateFeed( oldFeed, newFeed ) {
        if ( typeof newFeed.videoResource !== "undefined" ) {
            Feed.update( { _id: oldFeed._id }, { $set: { videoResource: { source: newFeed.videoResource.source } } } );
        }
        if ( typeof newFeed.photoResource !== "undefined" ) {
            Feed.update( { _id: oldFeed._id }, { $set: { photoResource: { full_picture: newFeed.photoResource.full_picture } } } );
        }
    }

    /**
     * formatFeed
     * @param  {Object} feed
     * @return {Object}
     */
    formatFeed( feed ) {
        var format = {
            feed_id: feed.id,
            type: feed.type,
            created_time: feed.created_time,
            object_id: feed.object_id
        };
        format[format.type + "Resource"] = feed[format.type + "Resource"];
        if (typeof feed.story !== "undefined") {
            format.story = feed.story;
        }
        if (typeof feed.message !== "undefined") {
            format.message = feed.message;
        }
        if (typeof feed.image_url !== "undefined") {
            format.image_url = feed.image_url;
        }
        return format;
    }

    /**
     * isUnique
     * ensure feed_id is unique
     * @param  {String}  id
     * @return {Boolean}
     */
    isUnique( id ) {
        return (typeof Feed.findOne({feed_id: id}) === "undefined");
    }

    /**
     * fetchObjectId
     * @param  {[string]} id
     * @return {[string|null]} object id
     */
    fetchObjectId(id) {
        var objectIdResource = new ObjectIdResource(id);
        var objectRel = objectIdResource.fetchAll();
        if ( objectRel === null ) {
            return null;
        }
        return objectRel.data.object_id || null;
    }

    /**
     * buildRoute
     * @param  {[string]} resource
     */
    buildRoute(resource) {
        this.route = this.domain + "v" + this.version + "/" + this.pageId + "/" + resource;
    }

    /**
     * getImageUrl
     * @param  {[string]} object id
     * @return {[string]} image url
     */
    getImageUrl(objectId) {
        return this.domain + objectId + "/picture";
    }
}
