// ets_tracing: off
import "../Operator/index.mjs";
import { none, some } from "../Option/index.mjs";
export function intersect(...as) {
  return as.reduce((a, b) => ({ ...a,
    ...b
  }));
}
export const pattern = n => (_, d) => m => {
  return _[m[n]] ? _[m[n]](m, m) : d(m, m);
};
export const matchTag = /*#__PURE__*/pattern("_tag");
export const pattern_ = n => (m, _, d) => {
  return _[m[n]] ? _[m[n]](m, m) : d(m, m);
};
export const matchTag_ = /*#__PURE__*/pattern_("_tag");
export const patternFor = n => () => (_, d) => m => {
  return _[m[n]] ? _[m[n]](m, m) : d(m, m);
};
export const matchTagFor = /*#__PURE__*/patternFor("_tag");
export * from "./tool.mjs";
export function isEither(u) {
  return typeof u === "object" && u != null && "_tag" in u && (u["_tag"] === "Left" || u["_tag"] === "Right");
}
export function isOption(u) {
  return typeof u === "object" && u != null && "_tag" in u && (u["_tag"] === "Some" || u["_tag"] === "None");
}
export function isTag(u) {
  return typeof u === "object" && u != null && "_tag" in u && u["_tag"] === "Tag";
}
export function isSync(u) {
  return typeof u === "object" && u != null && "_tag" in u && u["_tag"] === "XPure";
}
export function isAdtElement(tag) {
  return adt => adt["_tag"] === tag;
}
export function isGenericAdtElement(_t) {
  return tag => adt => adt[_t] === tag;
}
export function onAdtElement(tag, f) {
  return adt => {
    if (adt["_tag"] === tag) {
      return some(f(adt));
    }

    return none;
  };
}
export function onGenericAdtElement(_t) {
  return (tag, f) => adt => {
    if (adt[_t] === tag) {
      return some(f(adt));
    }

    return none;
  };
}
export * from "./lazy.mjs";
export * from "./union.mjs";
export * from "./equal.mjs";
export * from "./unification.mjs";
//# sourceMappingURL=index.mjs.map