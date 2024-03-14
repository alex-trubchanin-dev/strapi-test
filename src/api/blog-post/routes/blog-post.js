"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/blog-post",
      handler: "blog-post.find",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/blog-post",
      handler: "blog-post.blogPostHandler",
      config: {
        policies: [],
      },
    },
  ],
};
