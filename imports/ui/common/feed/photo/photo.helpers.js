var helpers = {};

helpers["formatPlace"] = function (place) {
    var format = place.name + ", " + place.location.city + ", " + place.location.country;
    return format;
};

Template.photoFeed.helpers(helpers);
