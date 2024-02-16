// ets_tracing: off
import "../Operator/index.mjs";
import { fromNullable, none } from "../Option/index.mjs";
export function service(x) {
  // @ts-expect-error
  return x;
}
/**
 * Extract the Has type from any augumented variant
 */

const makeTag = (key = Symbol()) => ({
  _tag: "Tag",
  _T: undefined,
  key,
  has: t => ({
    [key]: t
  }),
  of: t => t,
  read: r => r[key],
  readOption: r => typeof r === "object" && r !== null ? fromNullable(r[key]) : none,
  refine: () => makeTag(key)
});
/**
 * Create a service entry Tag from a type and a URI
 */


export function tag(key) {
  return makeTag(key);
}
/**
 * Replaces the service with the required Service Entry, in the specified environment
 */

export const replaceServiceIn = (_, f) => r => ({ ...r,
  [_.key]: f(r[_.key])
});
/**
 * Replaces the service with the required Service Entry, in the specified environment
 */

export const replaceServiceIn_ = (r, _, f) => ({ ...r,
  ..._.has(f(r[_.key]))
});
export function mergeEnvironments(_, r, t) {
  return { ...r,
    ..._.has(t)
  };
}
//# sourceMappingURL=index.mjs.map