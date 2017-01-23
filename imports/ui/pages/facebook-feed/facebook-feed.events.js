
var onShowMoreFeed = function (e) {
    var showMoreElem = $("#showMoreResults");
    if (showMoreElem.length === 0) {
        return ;
    }
    var threshold = $(window).scrollTop() + $(window).height() - showMoreElem.height();
    if (showMoreElem.offset().top <= threshold) {
        if (!showMoreElem.data("visible")) {
            showMoreElem.data("visible", true);
            Session.set("FacebookFeedLimit", Session.get("FacebookFeedLimit") + 5);
        }
    } else {
        if (showMoreElem.data("visible")) {
            showMoreElem.data("visible", false);
        }
    }
}

$(window).scroll(onShowMoreFeed);
