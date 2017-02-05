
var events = {};

events["click #showMoreResults"] = function ( evt, template ) {
    Session.set("limitPageFeed", Session.get("limitPageFeed") + 25);
}

Template.facebookFeed.events( events );
