import { succeedWith } from "../Effect/core.mjs";
export function getAndSet(self, a) {
  return succeedWith(() => {
    const v = self.value.get;
    self.value.set(a);
    return v;
  });
}
export function getAndUpdate(self, f) {
  return succeedWith(() => {
    const v = self.value.get;
    self.value.set(f(v));
    return v;
  });
}
export function getAndUpdateSome(self, f) {
  return succeedWith(() => {
    const v = self.value.get;
    const o = f(v);

    if (o._tag === "Some") {
      self.value.set(o.value);
    }

    return v;
  });
}
export function modify(self, f) {
  return succeedWith(() => {
    const v = self.value.get;
    const o = f(v);
    self.value.set(o.get(1));
    return o.get(0);
  });
}
export function modifySome(self, def, f) {
  return succeedWith(() => {
    const v = self.value.get;
    const o = f(v);

    if (o._tag === "Some") {
      self.value.set(o.value.get(1));
      return o.value.get(0);
    }

    return def;
  });
}
export function update(self, f) {
  return succeedWith(() => {
    self.value.set(f(self.value.get));
  });
}
export function updateAndGet(self, f) {
  return succeedWith(() => {
    self.value.set(f(self.value.get));
    return self.value.get;
  });
}
export function updateSome(self, f) {
  return succeedWith(() => {
    const o = f(self.value.get);

    if (o._tag === "Some") {
      self.value.set(o.value);
    }
  });
}
export function updateSomeAndGet(self, f) {
  return succeedWith(() => {
    const o = f(self.value.get);

    if (o._tag === "Some") {
      self.value.set(o.value);
    }

    return self.value.get;
  });
}
export function unsafeUpdate(self, f) {
  self.value.set(f(self.value.get));
}
//# sourceMappingURL=atomic.mjs.map