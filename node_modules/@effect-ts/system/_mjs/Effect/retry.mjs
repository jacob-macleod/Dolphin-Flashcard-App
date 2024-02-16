import * as E from "../Either/index.mjs";
import { identity, pipe } from "../Function/index.mjs";
import * as schedule from "../Schedule/index.mjs";
import * as catchAll from "./catchAll.mjs";
import * as core from "./core.mjs";
import * as fail from "./fail.mjs";
import * as foldM from "./foldM.mjs";
import * as map from "./map.mjs";
import * as orDie from "./orDie.mjs";

function loop(self, orElse, driver) {
  return catchAll.catchAll_(map.map_(self, a => E.right(a)), e => foldM.foldM_(driver.next(e), () => core.chain_(orDie.orDie(driver.last), o => map.map_(orElse(e, o), a => E.left(a))), () => loop(self, orElse, driver)));
}
/**
 * Returns an effect that retries this effect with the specified schedule when it fails, until
 * the schedule is done, then both the value produced by the schedule together with the last
 * error are passed to the specified recovery function.
 */


export function retryOrElseEither_(self, policy, orElse, __trace) {
  return core.chain_(schedule.driver(policy), a => loop(self, orElse, a), __trace);
}
/**
 * Returns an effect that retries this effect with the specified schedule when it fails, until
 * the schedule is done, then both the value produced by the schedule together with the last
 * error are passed to the specified recovery function.
 *
 * @ets_data_first retryOrElseEither_
 */

export function retryOrElseEither(policy, orElse, __trace) {
  return self => retryOrElseEither_(self, policy, orElse, __trace);
}
/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 */

export function retryOrElse_(self, policy, orElse, __trace) {
  return map.map_(retryOrElseEither_(self, policy, orElse, __trace), E.fold(identity, identity));
}
/**
 * Retries with the specified schedule, until it fails, and then both the
 * value produced by the schedule together with the last error are passed to
 * the recovery function.
 *
 * @ets_data_first retryOrElse_
 */

export function retryOrElse(policy, orElse, __trace) {
  return self => retryOrElse_(self, policy, orElse, __trace);
}
/**
 * Retries with the specified retry policy.
 * Retries are done following the failure of the original `io` (up to a fixed maximum with
 * `once` or `recurs` for example), so that that `io.retry(Schedule.once)` means
 * "execute `io` and in case of failure, try again once".
 */

export function retry_(self, policy, __trace) {
  return retryOrElse_(self, policy, (e, _) => fail.fail(e), __trace);
}
/**
 * Retries with the specified retry policy.
 * Retries are done following the failure of the original `io` (up to a fixed maximum with
 * `once` or `recurs` for example), so that that `io.retry(Schedule.once)` means
 * "execute `io` and in case of failure, try again once".
 *
 * @ets_data_first retry_
 */

export function retry(policy, __trace) {
  return self => retry_(self, policy, __trace);
}
//# sourceMappingURL=retry.mjs.map