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

const getUA = () => navigator.userAgent;

const isKindle = () => {
  return !!(
    getUA.match(/Kindle/i) ||
    getUA.match(/Silk/i) ||
    getUA.match(/KFTT/i) ||
    getUA.match(/KFOT/i) ||
    getUA.match(/KFJWA/i) ||
    getUA.match(/KFJWI/i) ||
    getUA.match(/KFSOWI/i) ||
    getUA.match(/KFDOWI/i) ||
    getUA.match(/KFTHWA/i) ||
    getUA.match(/KFTHWI/i) ||
    getUA.match(/KFAPWA/i) ||
    getUA.match(/KFAPWI/i)
  );
};

export { sumAggregate, useWindowSize, isKindle };
