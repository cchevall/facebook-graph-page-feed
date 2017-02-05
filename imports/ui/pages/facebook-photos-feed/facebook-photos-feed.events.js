
var events = {};

events["click #showMoreResults"] = function ( evt, template ) {
    Session.set("limitPhotoFeed", Session.get("limitPhotoFeed") + 25);
}

Template.facebookPhotosFeed.events( events );
