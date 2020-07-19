import React, { Fragment } from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import kebabCase from "lodash/kebabCase";
import flat from "lodash/flatten"
import Helmet from "../components/helmet";
import Layout from "../components/layout";
import useSiteMetadata from "../hooks/use-site-metadata";
import { UncontrolledCollapse } from "reactstrap";
import { useStyletron } from "styletron-react";

const UsesItem = (item) => (
  <li key={item.id}>
    <a href={item.link}>{item.name}</a> {item.summary}{" "}
    {item.justification ? (
      <Fragment>
        <a id={`${kebabCase(item.name)}-j`}>(Why?)</a>
        <UncontrolledCollapse toggler={`#${kebabCase(item.name)}-j`}>
          <p
            dangerouslySetInnerHTML={{
              __html: item.justification.childMarkdownRemark.html,
            }}
          />
        </UncontrolledCollapse>
      </Fragment>
    ) : (
      ""
    )}
    {item.associatedTools ? (
      <ul>
        {item.associatedTools.map((subItem) => (
          <UsesItem {...subItem} />
        ))}
      </ul>
    ) : (
      ""
    )}
  </li>
);

export default (props) => {
  const [css] = useStyletron();
  let items = get(props, "data.allContentfulUsesItem.nodes");
  const subLevelItems = flat(
    items.map(({ associatedTools }) => (associatedTools || []).map((t) => t.id))
  );
  items = items.filter((item) => !subLevelItems.includes(item.id));
  console.log(subLevelItems);
  const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[get(x, key)] = rv[get(x, key)] || []).push(x);
      return rv;
    }, {});
  };
  const uses = groupBy(items, "category");
  const { title, helmet } = useSiteMetadata();

  return (
    <Layout location={props.location}>
      <Helmet title={title} {...helmet} />
      <main
        className={css({
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        })}
      >
        <h1>Uses</h1>
        <p>Here's a list of a bunch of the things I use on a daily basis.</p>
        {Object.entries(uses).map(([category, items]) => (
          <section id={category}>
            <h2 className={css({ textTransform: "capitalize" })}>{category}</h2>
            <ul>
              {items.map((item) => (
                <UsesItem {...item} />
              ))}
            </ul>
          </section>
        ))}
      </main>
    </Layout>
  );
};

export const pageQuery = graphql`
  query UsesQuery {
    allContentfulUsesItem {
      nodes {
        category
        ...UsesItem
      }
    }
  }

  fragment SingleLevelUsesItem on ContentfulUsesItem {
    id
    name
    summary
    link
    justification {
      childMarkdownRemark {
        html
      }
    }
  }

  fragment UsesItem on ContentfulUsesItem {
    ...SingleLevelUsesItem
    associatedTools {
      ...SingleLevelUsesItem
      associatedTools {
        ...SingleLevelUsesItem
      }
    }
  }
`;
