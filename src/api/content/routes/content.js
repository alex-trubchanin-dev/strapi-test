"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/contents",
      handler: "content.find",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/contents",
      handler: "content.twitterPostHandler",
      config: {
        policies: [],
      },
    },
  ],
};
