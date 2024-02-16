"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onTermination = onTermination;
exports.onTermination_ = onTermination_;

var _index = /*#__PURE__*/require("../Cause/index.js");

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _index3 = /*#__PURE__*/require("../Function/index.js");

var _bracketExit = /*#__PURE__*/require("./bracketExit.js");

var _core = /*#__PURE__*/require("./core.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Runs the specified effect if this effect is terminated, either because of
 * a defect or because of interruption.
 */
function onTermination_(self, cleanup, __trace) {
  return (0, _bracketExit.bracketExit_)(_core.unit, () => self, (_, eb) => {
    switch (eb._tag) {
      case "Success":
        {
          return _core.unit;
        }

      case "Failure":
        {
          return E.fold_((0, _index.failureOrCause)(eb.cause), () => _core.unit, cleanup);
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


function onTermination(cleanup, __trace) {
  return self => onTermination_(self, cleanup, __trace);
}
//# sourceMappingURL=onTermination.js.map