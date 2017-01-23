"use strict";

var loadFacebookFeedPage = function () {
    if (typeof Meteor.settings === "undefined"
        || typeof Meteor.settings.public === "undefined") {
        return false;
    }
    var publicSettings = Meteor.settings.public;
    if (typeof publicSettings["facebook-graph-page-feed"] === "undefined") {
        return false;
    }
    publicSettings = publicSettings["facebook-graph-page-feed"];
    if (typeof publicSettings["use-default-client-feed"] === "undefined"
        || publicSettings["use-default-client-feed"] === false ) {
        return false;
    }
    return true;
}

if ( loadFacebookFeedPage() === true ) {
    import "meteor/cchevallay:facebook-graph-page-feed/client/stylesheets/facebook-feed.css";
    import "meteor/cchevallay:facebook-graph-page-feed/imports/ui/layout/layout.js"
    import "./routes";
    import "./helpers";
}
