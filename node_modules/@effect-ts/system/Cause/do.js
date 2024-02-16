"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.let = exports.do = exports.bind = void 0;

var _index = /*#__PURE__*/require("../Function/index.js");

var _cause = /*#__PURE__*/require("./cause.js");

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off
const bind = (tag, f) => mk => (0, _core.chain)(k => (0, _core.map)(a => ({ ...k,
  [tag]: a
}))(f(k)))(mk);

exports.bind = bind;

const let_ = (tag, f) => mk => (0, _core.map)(k => ({ ...k,
  [tag]: f(k)
}))(mk);

exports.let = let_;
const do_ = /*#__PURE__*/(0, _cause.fail)({});
exports.do = do_;
//# sourceMappingURL=do.js.map