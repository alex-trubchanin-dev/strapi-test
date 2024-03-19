module.exports = {
  afterCreate(event) {
    const { result, params } = event;
    const { "api::all.all": allService } = strapi.services;

  },

  async afterUpdate(event) {
    const { result, params } = event;
    const { "api::all.all": allService } = strapi.services;

  },

  async afterDelete(event) {
    const { result, params } = event;
    const { "api::all.all": allService } = strapi.services;

  },
};
