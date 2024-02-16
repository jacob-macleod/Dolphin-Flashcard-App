import { provideSome_ } from "./provideSome.mjs";
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 *
 * @ets_data_first provide_
 */

export function provide(r, __trace) {
  return next => provide_(next, r, __trace);
}
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 */

export function provide_(next, r, __trace) {
  return provideSome_(next, r0 => ({ ...r0,
    ...r
  }), __trace);
}
//# sourceMappingURL=provide.mjs.map