// ets_tracing: off
let patched = false;
export function patch() {
  if (patched || Object.prototype["|>"]) {
    return;
  }

  Object.defineProperty(Object.prototype, "|>", {
    value(next) {
      return next(this);
    },

    enumerable: false,
    writable: true
  });
  patched = true;
}
patch();
//# sourceMappingURL=index.mjs.map