import { each } from "lodash";

const sumAggregate = (data) => {
  let value = 0;
  each(data, ({ quantity }) => {
    value += quantity;
  });
  return Math.round(value);
};

export { sumAggregate };
