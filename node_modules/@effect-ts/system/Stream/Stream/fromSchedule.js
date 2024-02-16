"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromSchedule = void 0;

var _index = /*#__PURE__*/require("../../Function/index.js");

var SC = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Schedule/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var _repeatEffectOption = /*#__PURE__*/require("./repeatEffectOption.js");

var _unwrap = /*#__PURE__*/require("./unwrap.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Creates a stream from a `Schedule` that does not require any further
 * input. The stream will emit an element for each value output from the
 * schedule, continuing for as long as the schedule continues.
 */
const fromSchedule = x => (0, _unwrap.unwrap)(T.map_(SC.driver(x), driver => (0, _repeatEffectOption.repeatEffectOption)(driver.next((0, _index.constVoid)()))));

exports.fromSchedule = fromSchedule;
//# sourceMappingURL=fromSchedule.js.map