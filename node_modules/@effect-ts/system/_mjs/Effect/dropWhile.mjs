import { chain_, succeed, suspend } from "./core.mjs";
import { map_ } from "./map.mjs";
/**
 * Drops all elements so long as the effectful predicate returns true.
 *
 * @ets_data_first dropWhile_
 */

export function dropWhile(p, __trace) {
  return as => dropWhile_(as, p, __trace);
}
/**
 * Drops all elements so long as the effectful predicate returns true.
 */

export function dropWhile_(as, p, __trace) {
  return suspend(() => {
    let dropping = succeed(true);
    const r = [];

    for (const a of as) {
      dropping = chain_(dropping, d => {
        if (d) {
          return p(a);
        } else {
          r.push(a);
          return succeed(false);
        }
      });
    }

    return map_(dropping, () => r, __trace);
  });
}
//# sourceMappingURL=dropWhile.mjs.map