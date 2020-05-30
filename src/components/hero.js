import React from "react";
import Img from "gatsby-image";

import styles from "./hero.module.scss";
import usePortfolioImages from "../hooks/use-portfolio-images";

export default ({ data }) => {
  const images = usePortfolioImages();
  return (
    <div className={styles.hero}>
      <h1 className={styles.heroHeadline}>{data.shortBio.shortBio}</h1>
      <div className={styles.imageBlock}>
        {images.slice(0, 3).map((image) => (
          <Img
            fluid={image.fluid}
            aspectRatio={image.fluid.aspectRatio}
            className={styles.heroImage}
            imgStyle={{ objectFit: "contain" }}
          />
        ))}
      </div>
    </div>
  );
};
