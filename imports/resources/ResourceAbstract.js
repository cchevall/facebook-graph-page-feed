"use strict";

import { HTTP } from 'meteor/http';
import { SettingsException } from "meteor/cchevallay:facebook-graph-page-feed/imports/exceptions/SettingsException.js";

export class ResourceAbstract {

    /**
     * constructor
     * @param  {Object} params [request parameters]
     */
    constructor(params = {}) {
        this.params = params;
        this.initSettings();
        this.initAccessToken();
        this.continueToFetch = true;
    }

    /**
     * initSettings
     * @throws {SettingsException} If [facebook-graph-page-feed is missing from settings file]
     */
    initSettings() {
        if (typeof Meteor.settings["facebook-graph-page-feed"] === "undefined") {
            throw new SettingsException("settingsMissing");
        }
        this.initAccessToken();
        this.initFacebookApiDomain();
        this.initFacebookApiVersion();
    }

    /**
     * initAccessToken
     * @throws {SettingsException} If [facebook-app-id is missing from settings file]
     * @throws {SettingsException} If [facebook-app-secret is missing from settings file]
     */
    initAccessToken() {
        if (typeof Meteor.settings["facebook-graph-page-feed"]["facebook-app-id"] === "undefined") {
            throw new SettingsException("appIdMissing");
        }
        if (typeof Meteor.settings["facebook-graph-page-feed"]["facebook-app-secret"] === "undefined") {
            throw new SettingsException("appSecretMissing");
        }
        this.params.access_token = Meteor.settings["facebook-graph-page-feed"]["facebook-app-id"] + "|" + Meteor.settings["facebook-graph-page-feed"]["facebook-app-secret"];
    }

    /**
     * initFacebookApiDomain
     */
    initFacebookApiDomain() {
        if (typeof Meteor.settings["facebook-graph-page-feed"]["facebook-api-domain"] !== "undefined") {
            this.domain = Meteor.settings["facebook-graph-page-feed"]["facebook-api-domain"];
        } else {
            this.domain = "https://graph.facebook.com/";
        }
    }

    /**
     * initFacebookApiVersion
     */
    initFacebookApiVersion() {
        if (typeof Meteor.settings["facebook-graph-page-feed"]["facebook-api-version"] !== "undefined") {
            this.version = Meteor.settings["facebook-graph-page-feed"]["facebook-api-version"];
        } else {
            this.version = "2.8";
        }
    }

    /**
     * fetchAll
     * @param  {string|null} route [facebook graph api route] optional
     * @param  {object|null} params [description] optional
     * @return {object|null} [facebook graph api response]
     */
    fetchAll(route = null, params = null) {
        if ( route === null ) {
            route = this.route;
        }
        if ( params === null ) {
            params = this.params;
        }
        try {
            var response = HTTP.call(
                "GET", route, {
                    params: params
                }
            );
        } catch (e) {
            console.error(e);
            console.error("- Http Error - " + e.message);
            return null;
        }
        if (typeof response === "undefined") {
            return null;
        }
        return this.saveResponse(response);
    }

    /**
     * fetchAllHalCollection
     * @param  {Number} page count [pagination limit] optional
     */
    fetchAllHalCollection(limit = 1) {

        if (limit === 0) {
            return ;
        }
        this.fetchAll();
        limit--;
        while ( typeof this.responsePaging !== "undefined" && limit !== 0 ) {
            if ( this.paginateNext() === null ) {
                return ;
            }
            limit--;
        }
    }

    /**
     * paginateNext
     * @return {object} [facebook graph api response]
     */
    paginateNext() {
        if (typeof this.responsePaging === "undefined") {
            return this.fetchAll();
        }
        return this.fetchAll(this.responsePaging.next);
    }

    /**
     * paginatePrev
     * @return {object} [facebook graph api response]
     */
    paginatePrev() {
        if (typeof this.responsePaging === "undefined") {
            return this.fetchAll();
        }
        return this.fetchAll(this.responsePaging.previous);
    }

    /**
     * getRoute
     * @return {string} [request route]
     */
    getRoute() {
        return this.route;
    }

    /**
     * getParams
     * @return {object} [request parameters]
     */
    getParams() {
        return this.params;
    }

    /**
     * mergeData
     * override the mergeData method to merge other queries to the response object
     * @param  {[object]} response
     * @return {[object]} response
     */
    mergeData(response) {
        return response;
    }

    /**
     * saveResponse
     * @param  {object} [response]
     * @return {object} [facebook graph api response]
     */
    saveResponse(response) {
        response = this.mergeData(response);
        if (typeof response.headers !== "undefined") {
            this.responseHeaders = response.headers;
        }
        if (typeof response.content !== "undefined" && typeof response.data === "undefined") {
            this.content = response.content;
        }
        if (typeof response.data !== "undefined"
            && response.data !== null ) {
            this.responseData = response.data;
            this.responsePaging = response.data.paging;
        }
        return response;
    }
}
