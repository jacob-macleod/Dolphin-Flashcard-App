import { bracketExit_ } from "./bracketExit.mjs";
import { unit } from "./core.mjs";
/**
 * Execute a cleanup function when the effect completes
 */

export function onExit_(self, cleanup, __trace) {
  return bracketExit_(unit, () => self, (_, e) => cleanup(e), __trace);
}
/**
 * Execute a cleanup function when the effect completes
 *
 * @ets_data_first onExit_
 */

export function onExit(cleanup, __trace) {
  return self => onExit_(self, cleanup, __trace);
}
/**
 * Execute a cleanup function when the effect errors
 *
 * @ets_data_first onError_
 */

export function onError(cleanup, __trace) {
  return self => onError_(self, cleanup, __trace);
}
/**
 * Execute a cleanup function when the effect errors
 */

export function onError_(self, cleanup, __trace) {
  return onExit_(self, e => {
    switch (e._tag) {
      case "Failure":
        {
          return cleanup(e.cause);
        }

      case "Success":
        {
          return unit;
        }
    }
  }, __trace);
}
//# sourceMappingURL=onExit.mjs.map