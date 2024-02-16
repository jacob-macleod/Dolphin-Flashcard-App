import { currentTime } from "../Clock/index.mjs";
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../Function/index.mjs";
import * as O from "../Option/index.mjs";
import * as Ref from "../RefM/index.mjs";
import * as core from "./core.mjs";
import * as die from "./die.mjs";
import * as Do from "./do.mjs";
import { environment } from "./environment.mjs";
import * as P from "./excl-forEach-promise.mjs";
import * as uninterruptibleMask from "./interruption.mjs";
import * as map from "./map.mjs";
import * as tap from "./tap.mjs";
import * as to from "./to.mjs";
/**
 * Returns an effect that, if evaluated, will return the cached result of
 * this effect. Cached results will expire after `timeToLive` duration. In
 * addition, returns an effect that can be used to invalidate the current
 * cached value before the `timeToLive` duration expires.
 *
 * @ets_data_first cachedInvalidate_
 */

export function cachedInvalidate(ttl, __trace) {
  return fa => cachedInvalidate_(fa, ttl);
}
/**
 * Returns an effect that, if evaluated, will return the cached result of
 * this effect. Cached results will expire after `timeToLive` duration. In
 * addition, returns an effect that can be used to invalidate the current
 * cached value before the `timeToLive` duration expires.
 */

export function cachedInvalidate_(fa, ttl, __trace) {
  return map.map_(Do.bind_(Do.bind_(Do.do, "r", () => environment()), "cache", () => Ref.makeRefM(O.none)), ({
    cache,
    r
  }) => Tp.tuple(core.provideAll_(get(fa, ttl, cache), r), invalidate(cache)), __trace);
}

function invalidate(cache) {
  return cache.set(O.none);
}

function compute(fa, ttl, start) {
  return map.map_(tap.tap_(Do.bind_(Do.do, "p", () => P.make()), ({
    p
  }) => to.to_(fa, p)), ({
    p
  }) => O.some(Tp.tuple(start + ttl, p)));
}

function get(fa, ttl, cache) {
  return uninterruptibleMask.uninterruptibleMask(({
    restore
  }) => core.chain_(currentTime, time => core.chain_(Ref.updateSomeAndGet(o => O.fold_(o, () => O.some(compute(fa, ttl, time)), ({
    tuple: [end]
  }) => end - time <= 0 ? O.some(compute(fa, ttl, time)) : O.none))(cache), a => a._tag === "None" ? die.die("bug") : restore(P.await(a.value.get(1))))));
}
//# sourceMappingURL=cachedInvalidate.mjs.map