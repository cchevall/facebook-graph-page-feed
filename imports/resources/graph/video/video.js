"use strict";

import { ResourceAbstract } from "../../ResourceAbstract.js";

export class VideoResource extends ResourceAbstract {

    /**
     * constructor
     * @param  {String} videoId
     */
    constructor(videoId = "") {
        var fields = [ "created_time", "description", "from", "source", "likes.summary(true)", "shares.summary(true)", "comments.summary(true)" ].join(',');
        var params = {
            fields: fields
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
