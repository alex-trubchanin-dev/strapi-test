"use strict";

module.exports = {
  async find(ctx) {
    const { query } = ctx.request;
    const { 'api::content.content': contentService } = strapi.services;

    try {
      const content = await contentService.find(query);
      return content;
    } catch (err) {
      ctx.response.status = 400;
      return { error: err.message };
    }
  },

  async twitterPostHandler(ctx) {
    const { data } = ctx.request.body;
    const { 'api::content.content': contentService } = strapi.services;

    try {
      const processedPost = await contentService.processAndSave(data);
      return processedPost;
    } catch (err) {
      ctx.response.status = 400;
      return { error: err.message };
    }
  },
};
