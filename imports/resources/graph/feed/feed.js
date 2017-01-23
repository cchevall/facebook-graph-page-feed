"use strict";

import { ResourceAbstract } from "../../ResourceAbstract.js";
import { ObjectIdResource } from "../object-id/object-id.js";
import { StatusResource } from "../status/status.js";
import { LinkResource } from "../link/link.js";
import { EventResource } from "../event/event.js";
import { PhotoResource } from "../photo/photo.js";
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
        if (typeof response.data === "undefined" || typeof response.data.data === "undefined") {
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

    fetchLink(id) {
        var linkResource = new LinkResource(id);
        var link = linkResource.fetchAll();
        if (typeof link.data.likes.data !== "Object") {
            link.data.likes.data = {};
        }
        if (typeof link.data.comments.data !== "Object") {
            link.data.comments.data = {};
        }
        return link.data || null;
    }

    fetchPhoto(id) {
        var photoResource = new PhotoResource(id);
        var photo = photoResource.fetchAll();
        if (typeof photo.data.likes.data !== "Object") {
            photo.data.likes.data = {};
        }
        if (typeof photo.data.comments.data !== "Object") {
            photo.data.comments.data = {};
        }
        return photo.data || null;
    }

    fetchVideo(id) {
        var videoResource = new VideoResource(id);
        var video = videoResource.fetchAll();
        if (typeof video.data.likes.data !== "Object") {
            video.data.likes.data = {};
        }
        if (typeof video.data.comments.data !== "Object") {
            video.data.comments.data = {};
        }
        return video.data || null;
    }

    fetchEvent(id) {
        var eventResource = new EventResource(id);
        var event = eventResource.fetchAll();
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
            if (typeof response.data.data[i].id === "undefined") {
                continue ;
            }
            var feed = {
                feed_id: response.data.data[i].id,
                type: response.data.data[i].type,
                created_time: response.data.data[i].created_time,
                object_id: response.data.data[i].object_id
            };
            feed[feed.type + "Resource"] = response.data.data[i][feed.type + "Resource"];
            if (typeof response.data.data[i].story !== "undefined") {
                feed.story = response.data.data[i].story;
            }
            if (typeof response.data.data[i].message !== "undefined") {
                feed.message = response.data.data[i].message;
            }
            if (typeof response.data.data[i].image_url !== "undefined") {
                feed.image_url = response.data.data[i].image_url;
            }
            try {
                Feed.insert(feed);
            } catch (e) { }
        }
        return response;
    }

    /**
     * fetchObjectId
     * @param  {[string]} id
     * @return {[string|null]} object id
     */
    fetchObjectId(id) {
        var objectIdResource = new ObjectIdResource(id);
        var objectRel = objectIdResource.fetchAll();
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
