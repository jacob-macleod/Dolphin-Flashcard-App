"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAndSet = getAndSet;
exports.getAndUpdate = getAndUpdate;
exports.getAndUpdateSome = getAndUpdateSome;
exports.modify = modify;
exports.modifySome = modifySome;
exports.unsafeUpdate = unsafeUpdate;
exports.update = update;
exports.updateAndGet = updateAndGet;
exports.updateSome = updateSome;
exports.updateSomeAndGet = updateSomeAndGet;

var _core = /*#__PURE__*/require("../Effect/core.js");

function getAndSet(self, a) {
  return (0, _core.succeedWith)(() => {
    const v = self.value.get;
    self.value.set(a);
    return v;
  });
}

function getAndUpdate(self, f) {
  return (0, _core.succeedWith)(() => {
    const v = self.value.get;
    self.value.set(f(v));
    return v;
  });
}

function getAndUpdateSome(self, f) {
  return (0, _core.succeedWith)(() => {
    const v = self.value.get;
    const o = f(v);

    if (o._tag === "Some") {
      self.value.set(o.value);
    }

    return v;
  });
}

function modify(self, f) {
  return (0, _core.succeedWith)(() => {
    const v = self.value.get;
    const o = f(v);
    self.value.set(o.get(1));
    return o.get(0);
  });
}

function modifySome(self, def, f) {
  return (0, _core.succeedWith)(() => {
    const v = self.value.get;
    const o = f(v);

    if (o._tag === "Some") {
      self.value.set(o.value.get(1));
      return o.value.get(0);
    }

    return def;
  });
}

function update(self, f) {
  return (0, _core.succeedWith)(() => {
    self.value.set(f(self.value.get));
  });
}

function updateAndGet(self, f) {
  return (0, _core.succeedWith)(() => {
    self.value.set(f(self.value.get));
    return self.value.get;
  });
}

function updateSome(self, f) {
  return (0, _core.succeedWith)(() => {
    const o = f(self.value.get);

    if (o._tag === "Some") {
      self.value.set(o.value);
    }
  });
}

function updateSomeAndGet(self, f) {
  return (0, _core.succeedWith)(() => {
    const o = f(self.value.get);

    if (o._tag === "Some") {
      self.value.set(o.value);
    }

    return self.value.get;
  });
}

function unsafeUpdate(self, f) {
  self.value.set(f(self.value.get));
}
//# sourceMappingURL=atomic.js.map