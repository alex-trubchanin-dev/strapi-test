"use strict";

const { TwitterDL } = require("twitter-downloader");
const { Readable } = require("stream");

module.exports = ({ strapi }) => ({
  async find(query) {
    return strapi.query("twitter-post").find(query);
  },

  async processAndSave(data) {
    const getServiceUpload = (name) => {
      return strapi.plugin("upload").service(name);
    };

    const uploadAndLinkDocument = async (
      arrayBuffer,
      { filename, extension, mimeType, refId, ref, field, user }
    ) => {
      const config = strapi.config.get("plugin.upload");
      const name = filename.split(".")[0];
      const buffer = Buffer.from(arrayBuffer);
      const stream = Readable.from(buffer);

      const entity = {
        name,
        hash: filename,
        ext: extension,
        mime: mimeType,
        size: buffer.length,
        provider: config.provider,
      };
      if (refId) {
        entity.related = [
          {
            id: refId,
            __type: ref,
            __pivot: { field },
          },
        ];
      }
      entity.getStream = () => stream;
      await getServiceUpload("provider").upload(entity);

      const fileValues = { ...entity };

      const res = await strapi
        .query("plugin::upload.file")
        .create({ data: fileValues });
      return res;
    };
    let newData = data;
    newData.external_url = data.url;

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
              const image = await fetch(res.result.media[i].image).then(
                (result) => {
                  console.log(result);
                  return result;
                }
              );
              const buffer = await image.arrayBuffer();

              newData.media = await uploadAndLinkDocument(buffer, {
                filename: `twitter_photo_${i}_${Date.now()}`,
                extension: "jpg",
                mimeType: "image/jpeg",
                refId: null,
                ref: "api::twitter-post:twitter-post",
                field: "media",
                user: "admin",
              });
            } else {
              const videoBuffer = await fetch(
                res.result.media[i].videos[
                  res.result.media[i].videos.length - 1
                ].url
              ).then((response) => response.arrayBuffer());

              newData.media = await uploadAndLinkDocument(videoBuffer, {
                filename: `twitter_video_${i}_${Date.now()}.`,
                extension: "mp4",
                mimeType: "video/mp4",
                refId: null,
                ref: "api::twitter-post:twitter-post",
                field: "media",
                user: "admin",
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      newData.content = data.content;
    }

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
      throw err;
    }
  },
});
