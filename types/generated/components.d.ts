import type { Schema, Attribute } from '@strapi/strapi';

export interface PostInfoBlogPost extends Schema.Component {
  collectionName: 'components_post_info_blog_posts';
  info: {
    displayName: 'Blog post';
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.Text;
    media: Attribute.Media;
  };
}

export interface PostInfoTwitterPost extends Schema.Component {
  collectionName: 'components_post_info_twitter_posts';
  info: {
    displayName: 'Twitter post';
  };
  attributes: {
    user: Attribute.String;
    url: Attribute.String;
    content: Attribute.Text;
    media: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'post-info.blog-post': PostInfoBlogPost;
      'post-info.twitter-post': PostInfoTwitterPost;
    }
  }
}
