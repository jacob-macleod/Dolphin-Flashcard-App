"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.provide = provide;
exports.provideAll = provideAll;
exports.provideAll_ = provideAll_;

var _provideSome = /*#__PURE__*/require("./provideSome.js");

/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 */
function provide(r) {
  return next => (0, _provideSome.provideSome_)(next, r0 => ({ ...r0,
    ...r
  }));
}
/**
 * Provides the stream with its required environment, which eliminates
 * its dependency on `R`.
 */


function provideAll(r) {
  return self => provideAll_(self, r);
}
/**
 * Provides the stream with its required environment, which eliminates
 * its dependency on `R`.
 */


function provideAll_(self, r) {
  return (0, _provideSome.provideSome_)(self, () => r);
}
//# sourceMappingURL=provide.js.map