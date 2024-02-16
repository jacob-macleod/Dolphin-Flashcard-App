// ets_tracing: off
import * as CatchAll from "./catchAll.mjs";
import * as Fail from "./fail.mjs";
/**
 * Recovers from specified error.
 *
 * @ets_data_first catchTag_
 */

export function catchTag(k, f) {
  return self => catchTag_(self, k, f);
}
/**
 * Recovers from specified error.
 */

export function catchTag_(self, k, f) {
  return CatchAll.catchAll_(self, e => {
    if ("_tag" in e && e["_tag"] === k) {
      return f(e);
    }

    return Fail.fail(e);
  });
}
//# sourceMappingURL=catchTag.mjs.map