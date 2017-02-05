import { FacebookPhotosFeed } from "meteor/cchevallay:facebook-graph-page-feed";

var helpers = {};

helpers["fetchAllFeed"] = function ( ) {

    var feed = FacebookPhotosFeed.collection.find( { }, { limit: Session.get( "loadedPhotoFeed" ) } ).fetch( );
    return feed;
}

helpers["formatPlace"] = function (place) {
    var format = place.name + ", " + place.location.city + ", " + place.location.country;
    return format;
};

helpers["moreResults"] = function( ) {

    return !(FacebookPhotosFeed.collection.find().count() < Session.get( "limitPhotoFeed" ) );
}

Template.facebookPhotosFeed.helpers(helpers);
