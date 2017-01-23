"use strict";

class _FetchException {

    /**
     * constructor
     * @param  {[string]} message
     */
    constructor(message) {
        this.name = "Fetch Exception";
        this.message = message;
    }
};

export const FetchException = _FetchException;
