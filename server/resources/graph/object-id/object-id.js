"use strict";

import { ResourceAbstract } from "../../ResourceAbstract.js";

export class ObjectIdResource extends ResourceAbstract {

    /**
     * constructor
     * @param  {String} objectId
     */
    constructor(objectId = "") {
        super({ fields: "object_id" });
        this.buildRoute(objectId);
    }

    /**
     * buildRoute
     * @param  {[string]} object id
     */
    buildRoute(objectId) {
        this.route = this.domain + "v" + this.version + "/" + objectId;
    }
}
