import * as Chain from "./chain.mjs";
import * as Empty from "./empty.mjs";
import * as FromEffect from "./fromEffect.mjs";
/**
 * Returns this stream if the specified condition is satisfied, otherwise returns an empty stream.
 */

export function whenEffect_(self, b) {
  return Chain.chain_(FromEffect.fromEffect(b), _ => _ ? self : Empty.empty);
}
/**
 * Returns this stream if the specified condition is satisfied, otherwise returns an empty stream.
 *
 * @ets_data_first whenEffect_
 */

export function whenEffect(b) {
  return self => whenEffect_(self, b);
}
//# sourceMappingURL=whenEffect.mjs.map