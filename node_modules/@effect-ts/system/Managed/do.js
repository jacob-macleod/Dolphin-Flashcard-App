"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bind = bind;
exports.bind_ = bind_;
exports.do = void 0;
exports.let = let__;
exports.let_ = let_;

var _core = /*#__PURE__*/require("./core.js");

var _succeed = /*#__PURE__*/require("./succeed.js");

// ets_tracing: off

/**
 * Binds an effectful value in a `do` scope
 *
 * @ets_data_first bind_
 */
function bind(tag, f, __trace) {
  return mk => bind_(mk, tag, f, __trace);
}
/**
 * Binds an effectful value in a `do` scope
 */


function bind_(mk, tag, f, __trace) {
  return (0, _core.chain_)(mk, k => (0, _core.map_)(f(k), a => ({ ...k,
    [tag]: a
  }), __trace));
}
/**
 * Binds a value in a `do` scope
 *
 * @ets_data_first let_
 */


function let__(tag, f, __trace) {
  return mk => (0, _core.map_)(mk, k => ({ ...k,
    [tag]: f(k)
  }), __trace);
}
/**
 * Binds a value in a `do` scope
 */


function let_(mk, tag, f) {
  return (0, _core.map_)(mk, k => ({ ...k,
    [tag]: f(k)
  }));
}
/**
 * Begin a `do` scope
 */


const do_ = /*#__PURE__*/(0, _succeed.succeed)({});
exports.do = do_;
//# sourceMappingURL=do.js.map