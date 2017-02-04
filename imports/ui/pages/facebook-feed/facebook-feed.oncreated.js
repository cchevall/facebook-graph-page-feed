import { ReactiveVar } from 'meteor/reactive-var';
import { FacebookPageFeed } from "meteor/cchevallay:facebook-graph-page-feed";

var onCreated = function () {

    var template = this;

    template.loaded = new ReactiveVar(0);
    template.limit = new ReactiveVar(25);

    template.autorun( function () {
        var limit = template.limit.get();
        var subscription = template.subscribe(FacebookPageFeed.fetchAllFeedAlias, {sort: [["created_time", "desc"]], limit: limit});
        if (subscription.ready()) {
            template.loaded.set(limit);
        }
    });
}

Template.facebookFeed.onCreated( onCreated );
