import { contramap_, makeOrd } from "./operations.mjs";

const compare = (x, y) => {
  return x < y ? -1 : x > y ? 1 : 0;
};

export const boolean = /*#__PURE__*/makeOrd(compare);
export const number = /*#__PURE__*/makeOrd(compare);
export const date = /*#__PURE__*/contramap_(number, date => date.valueOf());
export const string = /*#__PURE__*/makeOrd(compare);
//# sourceMappingURL=common.mjs.map