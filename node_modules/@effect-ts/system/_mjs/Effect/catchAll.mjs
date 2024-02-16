// ets_tracing: off
import { succeed } from "./core.mjs";
import { fail } from "./fail.mjs";
import { foldM_ } from "./foldM.mjs";
/**
 * Recovers from all errors.
 */

export function catchAll_(effect, f, __trace) {
  return foldM_(effect, f, succeed, __trace);
}
/**
 * Recovers from all errors.
 *
 * @ets_data_first catchAll_
 */

export function catchAll(f, __trace) {
  return effect => catchAll_(effect, f, __trace);
}
/**
 * Recovers from specified error.
 *
 * @ets_data_first catch_
 */

function _catch(tag, k, f, __trace) {
  return self => catchAll_(self, e => {
    if (tag in e && e[tag] === k) {
      return f(e);
    }

    return fail(e);
  }, __trace);
}
/**
 * Recovers from specified error.
 */


export function catch_(self, tag, k, f, __trace) {
  return catchAll_(self, e => {
    if (tag in e && e[tag] === k) {
      return f(e);
    }

    return fail(e);
  }, __trace);
}
/**
 * Recovers from specified error.
 *
 * @ets_data_first catchTag_
 */

export function catchTag(k, f, __trace) {
  return self => catchTag_(self, k, f, __trace);
}
/**
 * Recovers from specified error.
 */

export function catchTag_(self, k, f, __trace) {
  return catchAll_(self, e => {
    if ("_tag" in e && e["_tag"] === k) {
      return f(e);
    }

    return fail(e);
  }, __trace);
}
export { _catch as catch };
//# sourceMappingURL=catchAll.mjs.map