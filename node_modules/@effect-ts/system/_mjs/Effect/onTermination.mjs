import { failureOrCause } from "../Cause/index.mjs";
import * as E from "../Either/index.mjs";
import { pipe } from "../Function/index.mjs";
import { bracketExit_ } from "./bracketExit.mjs";
import { unit } from "./core.mjs";
/**
 * Runs the specified effect if this effect is terminated, either because of
 * a defect or because of interruption.
 */

export function onTermination_(self, cleanup, __trace) {
  return bracketExit_(unit, () => self, (_, eb) => {
    switch (eb._tag) {
      case "Success":
        {
          return unit;
        }

      case "Failure":
        {
          return E.fold_(failureOrCause(eb.cause), () => unit, cleanup);
        }
    }
  }, __trace);
}
/**
 * Runs the specified effect if this effect is terminated, either because of
 * a defect or because of interruption.
 *
 * @ets_data_first onTermination_
 */

export function onTermination(cleanup, __trace) {
  return self => onTermination_(self, cleanup, __trace);
}
//# sourceMappingURL=onTermination.mjs.map