"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/twitter-post",
      handler: "twitter-post.find",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/twitter-post",
      handler: "twitter-post.twitterPostHandler",
      config: {
        policies: [],
      },
    },
  ],
};
