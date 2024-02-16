let patched = false;
export function patch() {
  if (patched || Object.prototype["|>"]) {
    return;
  }

  Object.defineProperty(Object.prototype, "unify", {
    value() {
      return this;
    },

    enumerable: false,
    writable: true
  });
  patched = true;
}
patch();
//# sourceMappingURL=unification.mjs.map