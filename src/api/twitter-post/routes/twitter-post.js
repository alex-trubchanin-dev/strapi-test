"use strict";

/**
 * twitter-post router
 */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::twitter-post.twitter-post');

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/twitter-posts",
      handler: "twitter-post.find",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/twitter-posts",
      handler: "twitter-post.twitterPostHandler",
      config: {
        policies: [],
      },
    },
  ],
};

// const { createCoreRouter } = require("@strapi/strapi").factories;

// module.exports = createCoreRouter(
//   "api::twitter-post.twitter-post",
//   ({ strapi }) => {
//     return {
//       routes: [
//         {
//           method: "POST",
//           path: "/twitter-posts",
//           handler: "twitter-post.twitterPostHandler",
//           config: {
//             policies: [],
//           },
//         },
//       ],
//     };
//   }
// );
