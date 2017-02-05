import { ReactiveVar } from 'meteor/reactive-var';
import { FacebookPhotosFeed } from "meteor/cchevallay:facebook-graph-page-feed";

var onCreated = function () {

    let template = this;
    Session.set("loadedPhotoFeed", 0);
    Session.set("limitPhotoFeed", 25);

    template.autorun( function () {
        var limit = Session.get("limitPhotoFeed");
        var subscription = template.subscribe(FacebookPhotosFeed.fetchAllFeedAlias, {sort: [["created_time", "desc"]], limit: limit});
        if (subscription.ready()) {
            Session.set("loadedPhotoFeed", limit);
        }
    });
}

Template.facebookPhotosFeed.onCreated( onCreated );
