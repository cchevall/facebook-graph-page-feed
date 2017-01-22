"use strict";

import { ResourceAbstract } from "../../ResourceAbstract.js";

export class VideoResource extends ResourceAbstract {

    /**
     * constructor
     * @param  {String} videoId
     */
    constructor(videoId = "") {
        var params = {
            fields: [
                "created_time",
                "description",
                "from",
                "source",
                "likes.summary(true)",
                "comments.summary(true)"
            ]
        };
        super(params);
        this.buildRoute(videoId);
    }

    /**
     * buildRoute
     * @param  {[string]} object id
     */
    buildRoute(videoId) {
        this.route = this.domain + "v" + this.version + "/" + videoId;
    }
}
