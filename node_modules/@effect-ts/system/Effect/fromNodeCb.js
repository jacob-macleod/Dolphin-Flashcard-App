"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromNodeCb = fromNodeCb;

var _core = /*#__PURE__*/require("./core.js");

var _effectAsync = /*#__PURE__*/require("./effectAsync.js");

var _fail = /*#__PURE__*/require("./fail.js");

// ets_tracing: off
function fromNodeCb(f, __trace) {
  return function () {
    // eslint-disable-next-line prefer-rest-params
    const args = Array.prototype.slice.call(arguments);
    return (0, _effectAsync.effectAsync)(cb => {
      const cbResolver = (e, r) => e != null ? cb((0, _fail.fail)(e)) : cb((0, _core.succeed)(r)); // eslint-disable-next-line prefer-spread


      f.apply(null, args.concat(cbResolver));
    }, __trace);
  };
}
//# sourceMappingURL=fromNodeCb.js.map