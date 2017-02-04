
var onScroll = function ( ) {

    var template = Template.instance( );
    $(window).scroll( function( ) {
        var showMoreElem = $("#showMoreResults");
        if (showMoreElem.length === 0) {
            return ;
        }
        var threshold = $(window).scrollTop() + $(window).height() - showMoreElem.height();
        if (showMoreElem.offset().top < threshold) {
            if (!showMoreElem.data("visible")) {
                showMoreElem.data("visible", true);
                template.limit.set(template.limit.get( ) + 5);
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

Template.facebookFeed.onRendered( onRendered );
