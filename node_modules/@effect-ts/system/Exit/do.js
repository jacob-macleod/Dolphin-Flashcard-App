"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bind = bind;
exports.do = void 0;
exports.let = let_;

var _index = /*#__PURE__*/require("../Function/index.js");

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off
function bind(tag, f) {
  return mk => (0, _core.chain)(k => (0, _core.map)(a => ({ ...k,
    [tag]: a
  }))(f(k)))(mk);
}

function let_(tag, f) {
  return mk => (0, _core.map)(k => ({ ...k,
    [tag]: f(k)
  }))(mk);
}

const do_ = /*#__PURE__*/(0, _core.succeed)({});
exports.do = do_;
//# sourceMappingURL=do.js.map