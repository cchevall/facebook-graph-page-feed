
var onScroll = function ( template ) {

    $(window).scroll( function( ) {
        var showMoreElem = $("#showMoreResults");
        if (showMoreElem.length === 0) {
            return ;
        }
        var threshold = $(window).scrollTop() + $(window).height() - showMoreElem.height();
        if (showMoreElem.offset().top < threshold) {
            if (!showMoreElem.data("visible")) {
                showMoreElem.data("visible", true);
                template.limit.set(template.limit.get( ) + 10);
            }
        } else {
            if (showMoreElem.data("visible")) {
                showMoreElem.data("visible", false);
            }
        }
    });
}

var onRendered = function ( ) {

    var template = Template.instance( );
    onScroll( template );
}

Template.facebookFeed.onRendered( onRendered );
