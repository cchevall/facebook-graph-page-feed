"use strict";

import { ResourceAbstract } from "../../ResourceAbstract.js";

export class PhotoResource extends ResourceAbstract {

    /**
     * constructor
     * @param  {String} photoId
     */
    constructor(photoId = "") {
        var params = {
            fields: [
                "created_time",
                "link",
                "name",
                "place",
                "full_picture",
                "likes.summary(true)",
                "shares.summary(true)",
                "comments.summary(true)"
            ]
        };
        super(params);
        this.buildRoute(photoId);
    }

    /**
     * buildRoute
     * @param  {[string]} object id
     */
    buildRoute(photoId) {
        this.route = this.domain + "v" + this.version + "/" + photoId;
    }
}
