Sever side tools to get a facebook page feed from graph API.

settings.json exemple:
```json
{
    "public" : {
        "facebook-graph-page-feed" : {
            "fetch-limit" : 5,                                  //optional
            "use-default-client-feed" : true,                   //optional
            "facebook-feed-route" : "/my-feed-route"            //optional
        }
    },
    "facebook-graph-page-feed" : {
        "facebook-api-domain" : "https://graph.facebook.com/",
        "facebook-api-version" : "2.8",
        "facebook-page-id" : "facebookPageId",
        "facebook-app-id" : "facebookAppId",
        "facebook-app-secret" : "facebookAppSecret"
    }
}
```

For custom implementation:

on Client side:

    import { FacebookPageFeed } from "meteor/cchevallay:facebook-graph-page-feed";

    Meteor.subscribe( FacebookPageFeed.fetchAllFeedAlias )

    var options = {};
    FacebookPageFeed.collection.find({}, options).fetch();

on Server side:

    import { FacebookPageFeed } from "meteor/cchevallay:facebook-graph-page-feed";

    FacebookPageFeed.publish();
