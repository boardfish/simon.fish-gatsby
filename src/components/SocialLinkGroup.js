import React, { Fragment } from "react";
import SocialLink from "./SocialLink";

export default ({ data }) => {
  return (
    <Fragment>
      {data.map(socialLink => (
        <SocialLink {...socialLink} />
      ))}
    </Fragment>
  );
};
