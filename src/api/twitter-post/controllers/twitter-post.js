"use strict";

const { TwitterDL } = require("twitter-downloader");

/**
 * twitter-post controller
 */

// const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController(
// "api::twitter-post.twitter-post",
// ({ strapi }) => ({
module.exports = {
  async find(ctx) {
    const { twitterPostService } = strapi.services;
    const response = await twitterPostService.find(ctx.query);
    return response;
  },

  async twitterPostHandler(ctx) {
    const { data } = ctx.request.body;
    const { twitterPostService } = strapi.services;

    let newData = data;
    // if data.content_text is a string with a link "test webhook https://t.co/m2LVIpKR31" then we need to remove the link from the string and use TwitterDL to fetch media from the data.url
    if (
      data.content_text.includes &&
      data.content_text.includes("https://t.co")
    ) {
      const splitText = data.content_text.split(" ");
      const filteredText = splitText.filter(
        (word) => !word.includes("https://t.co")
      );
      newData.content_text = filteredText.join(" ");
      await TwitterDL(data.url)
        .then(async (res) => {
          for (let i = 0; i < res.result.media.length; i++) {
            if (res.result.media[i].type === "photo") {
              newData.content_media_url = res.result.media[i].image;
            } else {
              newData.content_media_url = res.result.media[i].videos[0].url;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      newData.content_text = data.content_text;
    }

    try {
      const newTwitterPost = await strapi.entityService.create(
        "api::twitter-post.twitter-post",
        {
          data: {
            ...newData,
          },
        }
      );
      return newTwitterPost;
    } catch (err) {
      console.error("Error saving to Strapi:", err);
    }
  },
};
