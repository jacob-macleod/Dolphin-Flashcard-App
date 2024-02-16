export const TestAspectTypeId = /*#__PURE__*/Symbol.for("@effect-ts/system/Testing/TestAspect");
/**
 * Creates a test aspect by specify the some function
 */

export function aspect(some) {
  const all = spec => some(() => true)(spec);

  return Object.assign(all, {
    [TestAspectTypeId]: TestAspectTypeId,
    some
  });
}
/**
 * An aspect that returns the tests unchanged
 */

export const identity = /*#__PURE__*/aspect(() => self => self);
//# sourceMappingURL=index.mjs.map