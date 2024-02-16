"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropWhile = dropWhile;
exports.dropWhile_ = dropWhile_;

var _core = /*#__PURE__*/require("./core.js");

var _map = /*#__PURE__*/require("./map.js");

/**
 * Drops all elements so long as the effectful predicate returns true.
 *
 * @ets_data_first dropWhile_
 */
function dropWhile(p, __trace) {
  return as => dropWhile_(as, p, __trace);
}
/**
 * Drops all elements so long as the effectful predicate returns true.
 */


function dropWhile_(as, p, __trace) {
  return (0, _core.suspend)(() => {
    let dropping = (0, _core.succeed)(true);
    const r = [];

    for (const a of as) {
      dropping = (0, _core.chain_)(dropping, d => {
        if (d) {
          return p(a);
        } else {
          r.push(a);
          return (0, _core.succeed)(false);
        }
      });
    }

    return (0, _map.map_)(dropping, () => r, __trace);
  });
}
//# sourceMappingURL=dropWhile.js.map