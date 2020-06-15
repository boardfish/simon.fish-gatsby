import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import { useStyletron } from "styletron-react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

export default ({ article }) => {
  const [css] = useStyletron();
  return (
    <Card tag={"li"}>
      <Img
        className='card-img-top'
        alt={article.heroImage.description}
        fluid={article.heroImage.fluid}
      />
      <CardBody>
        <CardTitle>
          <Link
            className={css({ color: "white" })}
            to={`/blog/${article.slug}`}
          >
            {article.title}{" "}
            <span
              className={css({
                color: "#ddd",
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
