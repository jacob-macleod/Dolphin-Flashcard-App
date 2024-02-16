import * as E from "../Either/index.mjs";
import { pipe } from "../Function/index.mjs";
import * as O from "../Option/index.mjs";
import * as S from "../Schedule/index.mjs";
import { chain } from "./core.mjs";
import { fail } from "./fail.mjs";
import { foldM } from "./foldM.mjs";
import * as map from "./map.mjs";
import { orDie } from "./orDie.mjs";
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure, at which point, the failure value
 * and schedule output are passed to the specified handler.
 *
 * Scheduled recurrences are in addition to the first execution, so that
 * `io.repeat(Schedule.once)` yields an effect that executes `io`, and then
 * if that succeeds, executes `io` an additional time.
 */

export function repeatOrElseEither_(self, schedule, orElse, __trace) {
  return chain(driver => {
    function loop(a) {
      return foldM(() => map.map_(orDie(driver.last), E.right), b => foldM(e => map.map_(orElse(e, O.some(b)), E.left), a => loop(a))(self))(driver.next(a));
    }

    return foldM(e => map.map_(orElse(e, O.none), E.left), a => loop(a), __trace)(self);
  })(S.driver(schedule));
}
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure, at which point, the failure value
 * and schedule output are passed to the specified handler.
 *
 * Scheduled recurrences are in addition to the first execution, so that
 * `io.repeat(Schedule.once)` yields an effect that executes `io`, and then
 * if that succeeds, executes `io` an additional time.
 *
 * @ets_data_first repeatOrElseEither_
 */

export function repeatOrElseEither(schedule, orElse, __trace) {
  return self => repeatOrElseEither_(self, schedule, orElse, __trace);
}
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure, at which point, the failure value
 * and schedule output are passed to the specified handler.
 *
 * Scheduled recurrences are in addition to the first execution, so that
 * `io.repeat(Schedule.once)` yields an effect that executes `io`, and then
 * if that succeeds, executes `io` an additional time.
 */

export function repeatOrElse_(self, schedule, orElse, __trace) {
  return map.map_(repeatOrElseEither_(self, schedule, orElse, __trace), E.merge);
}
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure, at which point, the failure value
 * and schedule output are passed to the specified handler.
 *
 * Scheduled recurrences are in addition to the first execution, so that
 * `io.repeat(Schedule.once)` yields an effect that executes `io`, and then
 * if that succeeds, executes `io` an additional time.
 *
 * @ets_data_first repeatOrElse_
 */

export function repeatOrElse(schedule, orElse, __trace) {
  return self => repeatOrElse_(self, schedule, orElse, __trace);
}
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure. Scheduled recurrences are in addition
 * to the first execution, so that `io.repeat(Schedule.once)` yields an
 * effect that executes `io`, and then if that succeeds, executes `io` an
 * additional time.
 */

export function repeat_(self, schedule, __trace) {
  return repeatOrElse_(self, schedule, e => fail(e), __trace);
}
/**
 * Returns a new effect that repeats this effect according to the specified
 * schedule or until the first failure. Scheduled recurrences are in addition
 * to the first execution, so that `io.repeat(Schedule.once)` yields an
 * effect that executes `io`, and then if that succeeds, executes `io` an
 * additional time.
 *
 * @ets_data_first repeat_
 */

export function repeat(schedule, __trace) {
  return self => repeat_(self, schedule, __trace);
}
//# sourceMappingURL=repeat.mjs.map