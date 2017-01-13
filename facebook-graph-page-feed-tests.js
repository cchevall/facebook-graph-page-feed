// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by facebook-graph-page-feed.js.
import { name as packageName } from "meteor/cchevallay:facebook-graph-page-feed";

// Write your tests here!
// Here is an example.
Tinytest.add('facebook-graph-page-feed - example', function (test) {
  test.equal(packageName, "facebook-graph-page-feed");
});
