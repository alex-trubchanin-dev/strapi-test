"use strict";

const { TwitterDL } = require("twitter-downloader");

module.exports = ({ strapi }) => ({
  async find(query) {
    return strapi.query("twitter-post").find(query);
  },

  async processAndSave(data) {
    let newData = data;

    // Media Handling Logic
    if (newData.content.includes && newData.content.includes("https://t.co")) {
      const splitText = data.content.split(" ");
      const filteredText = splitText.filter(
        (word) => !word.includes("https://t.co")
      );
      newData.content = filteredText.join(" ");
      await TwitterDL(data.url)
        .then(async (res) => {
          for (let i = 0; i < res.result.media.length; i++) {
            if (res.result.media[i].type === "photo") {
              newData.media = res.result.media[i].image;
            } else {
              newData.media = res.result.media[i].videos[0].url;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      newData.content = data.content;
    }

    // Saving to Strapi
    try {
      const newTwitterPost = await strapi.entityService.create(
        "api::twitter-post.twitter-post",
        {
          data: {
            publishedAt: new Date().getTime(),
            ...newData,
          },
        }
      );
      return newTwitterPost;
    } catch (err) {
      console.error("Error saving to Strapi:", JSON.stringify(err));
      throw err; // Re-throw error for handling in the controller
    }
  },
});
