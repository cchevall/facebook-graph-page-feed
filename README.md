# Sever side tools to get a facebook page feed from graph API.

# settings.json exemple:
```json
{
    "facebook-graph-page-feed" : {
        "fetch-limit" : -1,                                      //optional
        "facebook-api-domain" : "https://graph.facebook.com/",
        "facebook-api-version" : "2.8",
        "facebook-page-id" : "facebookPageId",
        "facebook-app-id" : "facebookAppId",
        "facebook-app-secret" : "facebookAppSecret"
    }
}
```

# On Client side:
- route declaration with FlowRouter and BlazeLayout Packages (not included).
```javascript
    import { FacebookPageFeed } from "meteor/cchevallay:facebook-graph-page-feed";

    var news = function () {
        import '/imports/ui/common/newa/news.html';
        BlazeLayout.render( "news" );
    };

    FlowRouter.route('/news', {
        name: "news",
        action: news,
        subscriptions: function(params, queryParams) {
            this.register(
                FacebookPageFeed.fetchAllFeedAlias,
                FacebookPageFeed.subscribe( {limit: 25} )
            );
        }
    });
```
- template declaration
```xml
    <template name="news">
        {{> facebookFeed }}
    </template>
```

# On Server side:
```javascript
    import { FacebookPageFeed } from "meteor/cchevallay:facebook-graph-page-feed";

    FacebookPageFeed.publish();
```
