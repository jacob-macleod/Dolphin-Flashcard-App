"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addIfOpen = addIfOpen;

var _core = /*#__PURE__*/require("../../Collections/Immutable/Map/core.js");

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../deps-core.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./deps-ref.js"));

var _Exited = /*#__PURE__*/require("./Exited.js");

var _next = /*#__PURE__*/require("./next.js");

var _Running = /*#__PURE__*/require("./Running.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function addIfOpen(finalizer) {
  return _ => T.flatten(R.modify_(_.ref, s => {
    switch (s._tag) {
      case "Exited":
        {
          return Tp.tuple(T.map_(finalizer(s.exit), () => O.none), new _Exited.Exited((0, _next.next)(s.nextKey), s.exit));
        }

      case "Running":
        {
          return Tp.tuple(T.succeed(O.some(s.nextKey)), new _Running.Running((0, _next.next)(s.nextKey), (0, _core.insert)(s.nextKey, finalizer)(s.finalizers())));
        }
    }
  }));
}
//# sourceMappingURL=addIfOpen.js.map