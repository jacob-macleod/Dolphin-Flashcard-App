"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bind = bind;
exports.do = void 0;
exports.let = let_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var _index2 = /*#__PURE__*/require("../../../Function/index.js");

var Api = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./api/index.js"));

var Core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function bind(tag, f) {
  return mk => Core.chain_(mk, k => Api.map_(f(k), a => ({ ...k,
    [tag]: a
  })));
}

function let_(tag, f) {
  return mk => Api.map_(mk, k => ({ ...k,
    [tag]: f(k)
  }));
}

const do_ = /*#__PURE__*/Core.fromEffect( /*#__PURE__*/T.succeed({}));
exports.do = do_;
//# sourceMappingURL=do.js.map