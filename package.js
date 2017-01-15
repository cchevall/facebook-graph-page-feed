Package.describe({
  name: 'cchevallay:facebook-graph-page-feed',
  version: '0.0.5',
  summary: './README.md',
  git: 'https://github.com/cchevall/facebook-graph-page-feed.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript');
  api.use('aldeed:collection2-core@2.0.0');
  api.use('aldeed:schema-index@1.1.1');
  api.use('http');
  api.mainModule('./server/main.js', 'server');
  api.mainModule('./client/main.js', 'client');
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
