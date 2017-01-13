Package.describe({
  name: 'cchevallay:facebook-graph-page-feed',
  version: '0.0.1',
  summary: './README.md',
  git: 'https://github.com/cchevall/facebook-graph-page-feed.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript');
  api.mainModule('facebook-graph-page-feed.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('cchevallay:facebook-graph-page-feed');
  api.mainModule('facebook-graph-page-feed-tests.js');
});
