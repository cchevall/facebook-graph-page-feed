"use strict";

import { ResourceAbstract } from "../../ResourceAbstract.js";

export class StatusResource extends ResourceAbstract {

    /**
     * constructor
     * @param  {String} statusId
     */
    constructor(statusId = "") {
        var params = {
            fields: [
                "created_time",
                "message",
                "name",
                "place",
                "likes.summary(true)",
                "shares.summary(true)",
                "comments.summary(true)"
            ]
        };
        super(params);
        this.buildRoute(statusId);
    }

    /**
     * buildRoute
     * @param  {[string]} object id
     */
    buildRoute(statusId) {
        this.route = this.domain + "v" + this.version + "/" + statusId;
    }
}
