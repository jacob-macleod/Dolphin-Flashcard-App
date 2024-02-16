"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWithPar = zipWithPar;
exports.zipWithPar_ = zipWithPar_;

var _cause = /*#__PURE__*/require("../Cause/cause.js");

var _core = /*#__PURE__*/require("../Fiber/core.js");

var _core2 = /*#__PURE__*/require("./core.js");

var _coreScope = /*#__PURE__*/require("./core-scope.js");

var _map = /*#__PURE__*/require("./map.js");

// ets_tracing: off
// ets_tracing: off

/**
 * Sequentially zips this effect with the specified effect using the
 * specified combiner function.
 */
function zipWithPar_(a, b, f, __trace) {
  const g = (b, a) => f(a, b);

  return (0, _coreScope.transplant)(graft => (0, _core2.descriptorWith)(d => (0, _coreScope.raceWith_)(graft(a), graft(b), (ex, fi) => coordinateZipPar(d.id, f, true, ex, fi), (ex, fi) => coordinateZipPar(d.id, g, false, ex, fi), __trace)));
}

function coordinateZipPar(fiberId, f, leftWinner, winner, loser) {
  switch (winner._tag) {
    case "Success":
      {
        return (0, _map.map_)((0, _core.join)(loser), y => f(winner.value, y));
      }

    case "Failure":
      {
        return (0, _core2.chain_)(loser.interruptAs(fiberId), e => {
          switch (e._tag) {
            case "Success":
              {
                return (0, _core2.halt)(winner.cause);
              }

            case "Failure":
              {
                return leftWinner ? (0, _core2.halt)((0, _cause.combinePar)(winner.cause, e.cause)) : (0, _core2.halt)((0, _cause.combinePar)(e.cause, winner.cause));
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


function zipWithPar(b, f, __trace) {
  return a => zipWithPar_(a, b, f, __trace);
}
//# sourceMappingURL=zipWithPar.js.map