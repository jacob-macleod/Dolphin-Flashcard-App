import { cachedInvalidate_ } from "./cachedInvalidate.mjs";
import { map_ } from "./map.mjs";
/**
 * Returns an effect that, if evaluated, will return the cached result of
 * this effect. Cached results will expire after `timeToLive` duration.
 *
 * @ets_data_first cached_
 */

export function cached(ttl, __trace) {
  return fa => cached_(fa, ttl);
}
/**
 * Returns an effect that, if evaluated, will return the cached result of
 * this effect. Cached results will expire after `timeToLive` duration.
 */

export function cached_(fa, ttl, __trace) {
  return map_(cachedInvalidate_(fa, ttl, __trace), ({
    tuple: [cachedEffect, _]
  }) => cachedEffect);
}
//# sourceMappingURL=cached.mjs.map