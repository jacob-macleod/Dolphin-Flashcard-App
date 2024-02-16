import { halt, succeed } from "./core.mjs";
/**
 * Returns an effect from a `Exit` value.
 */

export function done(exit, __trace) {
  switch (exit._tag) {
    case "Success":
      {
        return succeed(exit.value, __trace);
      }

    case "Failure":
      {
        return halt(exit.cause, __trace);
      }
  }
}
//# sourceMappingURL=done.mjs.map