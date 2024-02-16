"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectURI = exports.Base = void 0;
exports.instruction = instruction;

var _commons = /*#__PURE__*/require("./commons.js");

const EffectURI = "Effect";
exports.EffectURI = EffectURI;

class Base {}
/**
 * @ets_optimize identity
 */


exports.Base = Base;

function instruction(self) {
  // @ts-expect-error
  return self;
}
//# sourceMappingURL=effect.js.map