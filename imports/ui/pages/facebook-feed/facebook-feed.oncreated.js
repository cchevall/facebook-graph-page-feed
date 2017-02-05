import { ReactiveVar } from 'meteor/reactive-var';
import { FacebookPageFeed } from "meteor/cchevallay:facebook-graph-page-feed";

var onCreated = function () {

    console.log("actu create");
    let template = this;
    Session.set("loadedPageFeed", 0);
    Session.set("limitPageFeed", 25);

    template.autorun( function () {
        console.log("actu autorun");
        var limit = Session.get("limitPageFeed");
        var subscription = template.subscribe(FacebookPageFeed.fetchAllFeedAlias, {sort: [["created_time", "desc"]], limit: limit});
        if (subscription.ready()) {
            Session.set("loadedPageFeed", limit);
        }
    });
}

Template.facebookFeed.onCreated( onCreated );
