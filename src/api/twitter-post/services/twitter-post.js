'use strict';

/**
 * twitter-post service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::twitter-post.twitter-post');
