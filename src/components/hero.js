import React from 'react'
import Img from 'gatsby-image'

import styles from './hero.module.scss'

export default ({ data }) => (
  <div className={styles.hero}>
    <h1 className={styles.heroHeadline}>{data.shortBio.shortBio}</h1>
    {/* <Img
      className={styles.heroImage}
      alt={data.name}
      fluid={data.heroImage.fluid}
    />
    <div className={styles.heroDetails}>
      <h3 className={styles.heroHeadline}>{data.name}</h3>
      <p className={styles.heroTitle}>{data.title}</p>
    </div> */}
  </div>
)
