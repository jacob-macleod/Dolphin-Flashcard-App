import { left, right } from "../Either/index.mjs";
import * as E from "../Either/index.mjs";
import { accessM, provideAll_ } from "./core.mjs";
import { map_ } from "./map.mjs";
/**
 * Depending on provided environment returns either this one or the other effect.
 *
 * @ets_data_first join_
 */

export function join(that, __trace) {
  return self => {
    return join_(self, that, __trace);
  };
}
/**
 * Depending on provided environment returns either this one or the other effect.
 */

export function join_(self, that, __trace) {
  return accessM(_ => E.fold_(_, r => provideAll_(self, r), r1 => provideAll_(that, r1)), __trace);
}
/**
 * Depending on provided environment returns either this one or the other effect.
 */

export function joinEither_(self, that, __trace) {
  return accessM(_ => E.fold_(_, r => map_(provideAll_(self, r), left), r1 => map_(provideAll_(that, r1), right)), __trace);
}
/**
 * Depending on provided environment returns either this one or the other effect.
 */

export function joinEither(that, __trace) {
  return self => joinEither_(self, that, __trace);
}
//# sourceMappingURL=join.mjs.map