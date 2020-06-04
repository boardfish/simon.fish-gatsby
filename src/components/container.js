import React, { useCallback, useRef } from "react";
import { Container } from "reactstrap";
import { useStyletron } from "styletron-react";
import useSiteMetadata from "../hooks/use-site-metadata";

const useHookWithRefCallback = () => {
  const ref = useRef(null);
  const setRef = useCallback((node) => {
    if (ref.current) {
      // Make sure to cleanup any events/references added to the last instance
    }

    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.
      document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
          case 33:
            ref.current.scrollBy(0, -1 * window.innerHeight);
            break;
          case 34:
            ref.current.scrollBy(0, window.innerHeight);
            break;
          case 35:
            ref.current.scrollTo(0, ref.current.scrollHeight);
            break;
          case 36:
            ref.current.scrollTo(0, 0);
            break;
          case 38:
            ref.current.scrollBy(0, -0.33 * window.innerHeight);
            break;
          case 40:
            ref.current.scrollBy(0, 0.33 * window.innerHeight);
            break;
        }
      });
    }

    // Save a reference to the node
    ref.current = node;
  }, []);
  return [setRef];
};

export default ({ children }) => {
  const [css] = useStyletron();
  const [ref] = useHookWithRefCallback();
  const colors = useSiteMetadata("colors");
  return (
    <div
      ref={ref}
      className={`container-fluid ${css({
        flexDirection: "column",
        backgroundColor: colors.primary,
        color: "white",
        height: "100vh",
        overflowY: "auto",
        scrollBehavior: "smooth",
      })}`}
    >
      {children}
    </div>
  );
};
