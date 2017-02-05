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
    import { FacebookPhotosFeed } from "meteor/cchevallay:facebook-graph-page-feed";

    var news = function () {
        import '/imports/ui/common/news/news.html';
        BlazeLayout.render( "news" );
    };

    var photos = function () {
        import '/imports/ui/common/photos/photos.html';
        BlazeLayout.render( "photos" );
    };

    FlowRouter.route('/news', {
        name: "news",
        action: news
    });

    FlowRouter.route('/photos', {
        name: "photos",
        action: photos
    });
```
- template declaration
```xml
    <template name="news">
        {{> facebookFeed }}
    </template>

    <template name="photos">
        {{> facebookPhotosFeed }}
    </template>
```

# On Server side:
```javascript
    import { FacebookPageFeed } from "meteor/cchevallay:facebook-graph-page-feed";
    import { FacebookPhotosFeed } from "meteor/cchevallay:facebook-graph-page-feed";

    FacebookPageFeed.publish();
    FacebookPhotosFeed.publish();
```
