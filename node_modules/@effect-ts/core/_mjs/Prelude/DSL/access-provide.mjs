// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
export function accessMF(F) {
  return x => F.flatten(F.access(x));
}
export function accessServiceMF(F) {
  return H => f => accessMF(F)(x => f(H.read(x)));
}
export function provideServiceF(F) {
  return H => S => fa => accessMF(F)(r => F.provide({ ...r,
    [H.key]: S
  })(fa));
}
export function provideSomeF(F) {
  return f => fa => accessMF(F)(r0 => F.provide(f(r0))(fa));
}
//# sourceMappingURL=access-provide.mjs.map