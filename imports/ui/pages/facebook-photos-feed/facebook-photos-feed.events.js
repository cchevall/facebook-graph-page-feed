
var events = {};

events["click #showMoreResults"] = function ( evt, template ) {
    Session.set("limitPhotoFeed", Session.get("limitPhotoFeed") + 25);
}

Template.facebookPhotosFeed.events( events );

var onScroll = function ( ) {

    $(window).scroll( function( ) {
        var showMoreElem = $("#showMoreResults");
        if (showMoreElem.length === 0) {
            return ;
        }
        var threshold = $(window).scrollTop() + $(window).height() - showMoreElem.height();
        if (showMoreElem.offset().top < threshold) {
            if (!showMoreElem.data("visible")) {
                showMoreElem.data("visible", true);
                $("#showMoreResults").click( );
            }
        } else {
            if (showMoreElem.data("visible")) {
                showMoreElem.data("visible", false);
            }
        }
    });
}

var onRendered = function ( ) {

    onScroll( );
}

Template.facebookPhotosFeed.onRendered( onRendered );
