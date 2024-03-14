("use strict");

module.exports = ({ strapi }) => ({
  async find(query) {
    return strapi.query("blog-post").find(query);
  },

  async save(data) {
    try {
      return strapi.query("blog-post").create(data);
    } catch (err) {
      console.error("Error saving to Strapi:", JSON.stringify(err));
      throw err; // Re-throw error for handling in the controller
    }
  },
});
