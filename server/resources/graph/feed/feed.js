"use strict";

import { ResourceAbstract } from "../../ResourceAbstract.js";
import { ObjectIdResource } from "../object-id/object-id.js";
import { MongoCollection as Feed } from "../../../../imports/collections/graph-api/feed/feed.js";

/**
 * FeedResource
 * Dialog class with graph api: /feed
 */
export class FeedResource extends ResourceAbstract {

    constructor() {
        super();
        this.initPictureSize();
        this.initFacebookPage();
        this.buildRoute("feed");
    }

    /**
     * initPictureSize
     * sets default values for images urls
     */
    initPictureSize() {
        this.width = 9999;
        this.height = 9999;
        this.type = "normal";
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
        }
        return response;
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
                message: response.data.data[i].message,
                created_time: response.data.data[i].created_time,
                object_id: response.data.data[i].object_id,
                image_url: response.data.data[i].image_url
            };
            Feed.insert(feed);
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
        return this.domain + objectId + "/picture?type=" + this.type + "&" + "width=" + this.width +"&height=" + this.height;
    }
}