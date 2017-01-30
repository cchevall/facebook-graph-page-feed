"use strict";

import { ResourceAbstract } from "../../ResourceAbstract.js";

export class PictureResource extends ResourceAbstract {

    /**
     * constructor
     * @param  {String} objectId
     */
    constructor(objectId = "") {
        var params = {
            fields: [
                "large"
            ]
        };
        super(params);
        this.buildRoute(objectId);
    }

    /**
     * buildRoute
     * @param  {[string]} object id
     */
    buildRoute(objectId) {
        this.route = this.domain + "v" + this.version + "/" + objectId + "/picture";
    }
}
