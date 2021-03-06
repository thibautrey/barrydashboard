import { useState, useEffect } from "react";
import { each } from "lodash";

const sumAggregate = (data) => {
  let value = 0;
  each(data, ({ quantity }) => {
    value += quantity;
  });
  return Math.round(value);
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

export { sumAggregate, useWindowSize };
