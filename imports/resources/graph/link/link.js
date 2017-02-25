"use strict";

import { ResourceAbstract } from "../../ResourceAbstract.js";

export class LinkResource extends ResourceAbstract {

    /**
     * constructor
     * @param  {String} linkId
     */
    constructor(linkId = "") {
        var fields = [ "created_time", "description", "from", "link", "message", "name", "full_picture", "likes.summary(true)", "shares.summary(true)", "comments.summary(true)" ].join(',');
        var params = {
            fields: fields
        };
        super(params);
        this.buildRoute(linkId);
    }

    /**
     * buildRoute
     * @param  {[string]} object id
     */
    buildRoute(linkId) {
        this.route = this.domain + "v" + this.version + "/" + linkId;
    }
}
