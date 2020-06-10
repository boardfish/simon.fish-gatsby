const Promise = require("bluebird");
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blog-post.js");
    const portfolioItem = path.resolve("./src/templates/portfolio-item.js");
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulPortfolioItem {
              edges {
                node {
                  title
                  id
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const posts = result.data.allContentfulBlogPost.edges;
        const portfolio = result.data.allContentfulPortfolioItem.edges;
        posts.forEach((post) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
            },
          });
        });
        portfolio.forEach((item) => {
          createPage({
            path: `/portfolio/${item.node.id}/`,
            component: portfolioItem,
            context: {
              id: item.node.id,
            },
          });
        });
      })
    );
  });
};
