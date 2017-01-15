"use strict";

import { MongoCollection } from "../imports/collections/graph-api/feed/feed.js";
import { FeedResource } from "./resources/graph/feed/feed.js";

var feedResource = new FeedResource();

feedResource.fetchAllHalCollection();
