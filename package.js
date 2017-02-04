Package.describe({
  name: 'cchevallay:facebook-graph-page-feed',
  version: '0.1.10',
  summary: './README.md',
  git: 'https://github.com/cchevall/facebook-graph-page-feed.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript');
  api.use('templating@1.2.15', 'client');
  api.use('momentjs:moment@2.17.1', 'client');
  api.use('twbs:bootstrap@3.3.6', 'client');
  api.use("aldeed:collection2@2.10.0");
  api.use('http');
  api.mainModule('./client/main.js', 'client');
  api.mainModule('./server/main.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('cchevallay:facebook-graph-page-feed');
  api.addFiles('tests/facebook-graph-page-feed-tests.js', 'server');
});

Npm.depends({
  "simpl-schema": '0.1.0'
});
