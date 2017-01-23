"use strict";

import { FacebookPageFeed } from "meteor/cchevallay:facebook-graph-page-feed";

Session.set('FacebookFeedLimit', 1);

var facebookFeed = function () {

    import 'meteor/cchevallay:facebook-graph-page-feed/imports/ui/pages/facebook-feed/facebook-feed.js';
    import 'meteor/cchevallay:facebook-graph-page-feed/imports/ui/common/feed';
    BlazeLayout.render(
        "facebookFeedLayout",
        {
            header: "facebookFeedHeader",
            main: "facebookFeed",
            footer: "facebookFeedFooter"
        }
    );
};

var getRoute = function () {
    var route = "/facebook-feed";
    if (typeof Meteor.settings === "undefined"
        || typeof Meteor.settings.public === "undefined") {
        return route;
    }
    var publicSettings = Meteor.settings.public;
    if (typeof publicSettings["facebook-graph-page-feed"] === "undefined") {
        return route;
    }
    publicSettings = publicSettings["facebook-graph-page-feed"];
    if (typeof publicSettings["facebook-feed-route"] === "undefined") {
        return route;
    }
    return publicSettings["facebook-feed-route"];
}

var route = getRoute();

FlowRouter.route(route, {
    name: "facebookFeed",
    action: facebookFeed,
    subscriptions: function(params, queryParams) {
        this.register( FacebookPageFeed.fetchAllFeedAlias, FacebookPageFeed.subscribe() );
    }
});
