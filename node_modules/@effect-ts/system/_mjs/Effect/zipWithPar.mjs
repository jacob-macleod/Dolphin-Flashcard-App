// ets_tracing: off
// ets_tracing: off
import { combinePar } from "../Cause/cause.mjs";
import { join } from "../Fiber/core.mjs";
import { chain_, descriptorWith, halt } from "./core.mjs";
import { raceWith_, transplant } from "./core-scope.mjs";
import { map_ } from "./map.mjs";
/**
 * Sequentially zips this effect with the specified effect using the
 * specified combiner function.
 */

export function zipWithPar_(a, b, f, __trace) {
  const g = (b, a) => f(a, b);

  return transplant(graft => descriptorWith(d => raceWith_(graft(a), graft(b), (ex, fi) => coordinateZipPar(d.id, f, true, ex, fi), (ex, fi) => coordinateZipPar(d.id, g, false, ex, fi), __trace)));
}

function coordinateZipPar(fiberId, f, leftWinner, winner, loser) {
  switch (winner._tag) {
    case "Success":
      {
        return map_(join(loser), y => f(winner.value, y));
      }

    case "Failure":
      {
        return chain_(loser.interruptAs(fiberId), e => {
          switch (e._tag) {
            case "Success":
              {
                return halt(winner.cause);
              }

            case "Failure":
              {
                return leftWinner ? halt(combinePar(winner.cause, e.cause)) : halt(combinePar(e.cause, winner.cause));
              }
          }
        });
      }
  }
}
/**
 * Sequentially zips this effect with the specified effect using the
 * specified combiner function.
 */


export function zipWithPar(b, f, __trace) {
  return a => zipWithPar_(a, b, f, __trace);
}
//# sourceMappingURL=zipWithPar.mjs.map