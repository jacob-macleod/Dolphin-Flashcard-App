"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestAspectTypeId = void 0;
exports.aspect = aspect;
exports.identity = void 0;
const TestAspectTypeId = /*#__PURE__*/Symbol.for("@effect-ts/system/Testing/TestAspect");
/**
 * Creates a test aspect by specify the some function
 */

exports.TestAspectTypeId = TestAspectTypeId;

function aspect(some) {
  const all = spec => some(() => true)(spec);

  return Object.assign(all, {
    [TestAspectTypeId]: TestAspectTypeId,
    some
  });
}
/**
 * An aspect that returns the tests unchanged
 */


const identity = /*#__PURE__*/aspect(() => self => self);
exports.identity = identity;
//# sourceMappingURL=index.js.map