require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
};

// if you want to use the preview API please define
// CONTENTFUL_HOST in your environment config
// the `host` property should map to `preview.contentful.com`
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST;
}

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided."
  );
}

module.exports = {
  siteMetadata: {
    siteUrl: 'https://simon.fish',
    title: "Simon Fish",
    colors: {
      primary: "#069",
    },
    helmet: {
        meta: [
        {
          name: "description",
          content: "Simon Fish",
        },
        {
          name: "keywords",
          content: "software, developer, junior, graduate, ruby, rails, react",
        },
      ],
    }
  },
  pathPrefix: "/gatsby-contentful-starter",
  plugins: [
    "gatsby-transformer-remark",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sass",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfig,
    },
    {
      resolve: "gatsby-plugin-styletron",
      options: {
        // You can pass options to Styletron.
        // Prefix all generated classNames:
        prefix: "_",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Simon Fish`,
        short_name: `Simon Fish`,
        start_url: `/`,
        background_color: `#069`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/images/LogoWhite.svg`
      },
    },
  ],
};
