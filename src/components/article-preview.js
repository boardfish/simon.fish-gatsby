import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import { useStyletron } from "styletron-react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

export default ({ article, className }) => {
  const [css] = useStyletron();
  return (
    <Card tag={"li"} className={className}>
      <Img
        className='card-img-top'
        alt={article.heroImage.description}
        fluid={article.heroImage.fluid}
      />
      <CardBody>
        <CardTitle>
          <Link
            to={`/blog/${article.slug}`}
            className={css({
              color: "#222",
              fontSize: "1.5em",
              ":hover": {
                color: "#039"
              }
            })}
          >
            {article.title}{" "}
            <span
              className={css({
                color: "#666",
              })}
            >
              {`//${article.publishDate}`}
            </span>
          </Link>
        </CardTitle>
        <CardText
          dangerouslySetInnerHTML={{
            __html: article.description.childMarkdownRemark.html,
          }}
        ></CardText>
      </CardBody>
    </Card>
  );
};
