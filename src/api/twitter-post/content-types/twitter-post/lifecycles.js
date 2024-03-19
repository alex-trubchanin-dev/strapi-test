module.exports = {
  afterCreate(event) {
    const { result, params } = event;
    const { "api::all.all": allService } = strapi.services;

    allService.create({
      data: {
        uuid: result.uuid,
        type: "twitter-post",
        title: null,
        content: result.content,
        external_url: result.external_url,
        user: result.user,
        media: params.data.media,
      },
      publishedAt: result.publishedAt,
    });
  },

  async afterUpdate(event) {
    const { result, params } = event;
    const { "api::all.all": allService } = strapi.services;

    const allEntry = await strapi.entityService.findMany("api::all.all", {
      filters: { uuid: { $eq: result.uuid } },
    });

    if (allEntry.length > 0) {
      let id = allEntry[0].id;

      allService.update(id, {
        data: {
          uuid: result.uuid,
          type: "twitter-post",
          title: null,
          content: result.content,
          external_url: result.external_url,
          user: result.user,
          media: params.data.media,
        },
        publishedAt: result.publishedAt,
      });
    }
  },

  async afterDelete(event) {
    const { result, params } = event;
    const { "api::all.all": allService } = strapi.services;

    const allEntry = await strapi.entityService.findMany("api::all.all", {
      filters: { uuid: { $eq: result.uuid } },
    });

    if (allEntry.length > 0) {
      let id = allEntry[0].id;

      allService.delete(id);
    }
  },
};
