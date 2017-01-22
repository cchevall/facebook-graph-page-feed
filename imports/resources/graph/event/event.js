"use strict";

import { ResourceAbstract } from "../../ResourceAbstract.js";

export class EventResource extends ResourceAbstract {

    /**
     * constructor
     * @param  {String} eventId
     */
    constructor(eventId = "") {
        var params = {
            fields: [
                "description",
                "name",
                "link",
                "likes.summary(true)",
                "comments.summary(true)"
            ]
        };
        super(params);
        this.buildRoute(eventId);
    }

    /**
     * buildRoute
     * @param  {[string]} object id
     */
    buildRoute(eventId) {
        this.route = this.domain + "v" + this.version + "/" + eventId;
    }
}
