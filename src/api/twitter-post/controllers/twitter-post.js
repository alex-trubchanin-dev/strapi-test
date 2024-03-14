"use strict";

module.exports = {
  async find(ctx) {
    const { query } = ctx.request;
    const { 'api::twitter-post.twitter-post': twitterPostSerive } = strapi.services;

    try {
      const twitterPost = await twitterPostSerive.find(query);
      return twitterPost;
    } catch (err) {
      ctx.response.status = 400;
      return { error: err.message };
    }
  },

  async twitterPostHandler(ctx) {
    const { data } = ctx.request.body;
    const { 'api::twitter-post.twitter-post': twitterPostSerive } = strapi.services;

    try {
      const processedPost = await twitterPostSerive.processAndSave(data);
      return processedPost;
    } catch (err) {
      ctx.response.status = 400;
      return { error: err.message };
    }
  },
};
