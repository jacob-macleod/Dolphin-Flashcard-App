// ets_tracing: off
import * as E from "../../../Either/index.mjs";
import { identity } from "../../../Function/index.mjs";
import * as Map from "./map.mjs";
import * as RaceBoth from "./raceBoth.mjs";
/**
 * Runs both sinks in parallel on the input, returning the result or the error from the
 * one that finishes first.
 */

export function race_(self, that) {
  return Map.map_(RaceBoth.raceBoth_(self, that), E.fold(identity, identity));
}
/**
 * Runs both sinks in parallel on the input, returning the result or the error from the
 * one that finishes first.
 */

export function race(that) {
  return self => race_(self, that);
}
//# sourceMappingURL=race.mjs.map