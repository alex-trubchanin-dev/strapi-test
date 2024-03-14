"use strict";

module.exports = {
  async find(ctx) {
    const { query } = ctx.request;
    const { "api::blog-post.blog-post": blogPostSerive } = strapi.services;

    try {
      const blogPost = await blogPostSerive.find(query);
      return blogPost;
    } catch (err) {
      ctx.response.status = 400;
      return { error: err.message };
    }
  },

  async blogPostHandler(ctx) {
    const { data } = ctx.request.body;
    const { "api::blog-post.blog-post": blogPostSerive } = strapi.services;

    try {
      const processedPost = await blogPostSerive.save(data);
      return processedPost;
    } catch (err) {
      ctx.response.status = 400;
      return { error: err.message };
    }
  },
};
