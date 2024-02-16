"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.join = join;
exports.join_ = join_;

var _reduce = /*#__PURE__*/require("./reduce.js");

/**
 * joins the elements together with "sep" in the middle
 */
function join_(self, sep) {
  return (0, _reduce.reduce_)(self, "", (s, a) => s.length > 0 ? `${s}${sep}${a}` : a);
}
/**
 * joins the elements together with "sep" in the middle
 *
 * @ets_data_first join_
 */


function join(sep) {
  return self => join_(self, sep);
}
//# sourceMappingURL=join.js.map