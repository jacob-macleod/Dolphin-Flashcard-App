"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.summarized = summarized;
exports.summarized_ = summarized_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Tuple/index.js"));

var _index2 = /*#__PURE__*/require("../../../Function/index.js");

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Summarize a sink by running an effect when the sink starts and again when it completes
 */
function summarized_(self, summary, f) {
  return new C.Sink(CH.map_(CH.bind("end", () => CH.fromEffect(summary))(CH.bind("done", () => self.channel)(CH.bind("start", () => CH.fromEffect(summary))(CH.do))), ({
    done,
    end,
    start
  }) => Tp.tuple(done, f(start, end))));
}
/**
 * Summarize a sink by running an effect when the sink starts and again when it completes
 * @ets_data_first summarized_
 */


function summarized(summary, f) {
  return self => summarized_(self, summary, f);
}
//# sourceMappingURL=summarized.js.map