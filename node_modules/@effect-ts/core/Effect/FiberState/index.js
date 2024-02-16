"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FiberState = FiberState;
exports.makeFiberState = makeFiberState;

var _index = /*#__PURE__*/require("../../Has/index.js");

var FRef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../FiberRef/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../index.js"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Layer/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function makeFiberState(initial) {
  return T.map_(FRef.make(initial), ref => ({
    get: FRef.get(ref),
    modify: f => FRef.modify_(ref, f),
    set: s => FRef.set_(ref, s),
    update: f => FRef.update_(ref, f)
  }));
}

function FiberState(S) {
  const Tag = (0, _index.tag)(S);
  const derived = T.deriveLifted(Tag)(["set", "update"], ["get"], []);
  return {
    Tag,
    modify: f => T.accessServiceM(Tag)(_ => _.modify(f)),
    runState: s => T.provideServiceM(Tag)(makeFiberState(s)),
    Live: s => L.fromEffect_(makeFiberState(s), Tag),
    ...derived
  };
}
//# sourceMappingURL=index.js.map