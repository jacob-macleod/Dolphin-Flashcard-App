"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.State = State;
exports.makeState = makeState;

var _index = /*#__PURE__*/require("../../Has/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../index.js"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Layer/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Ref/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function makeState(initial) {
  return T.map_(Ref.makeRef(initial), ref => ({
    get: Ref.get(ref),
    modify: f => Ref.modify_(ref, f),
    set: s => Ref.set_(ref, s),
    update: f => Ref.update_(ref, f)
  }));
}

function State(S) {
  const Tag = (0, _index.tag)(S);
  const derived = T.deriveLifted(Tag)(["set", "update"], ["get"], []);
  return {
    Tag,
    modify: f => T.accessServiceM(Tag)(_ => _.modify(f)),
    runState: s => T.provideServiceM(Tag)(makeState(s)),
    Live: s => L.fromEffect_(makeState(s), Tag),
    ...derived
  };
}
//# sourceMappingURL=index.js.map