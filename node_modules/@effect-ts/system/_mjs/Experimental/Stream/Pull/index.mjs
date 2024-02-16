import * as A from "../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../Effect/index.mjs";
import * as O from "../../../Option/index.mjs";
import * as Q from "../../../Queue/index.mjs";
import * as Take from "../Take/index.mjs";
export function emit(a) {
  return T.succeed(A.single(a));
}
export function emitChunk(as) {
  return T.succeed(as);
}
export function fromQueue(d) {
  return T.chain_(Q.take(d), _ => Take.done(_));
}
export function fail(e) {
  return T.fail(O.some(e));
}
export function failCause(c) {
  return T.mapError_(T.halt(c), O.some);
}
export function empty() {
  return T.succeed(A.empty());
}
export const end = /*#__PURE__*/T.fail(O.none);
//# sourceMappingURL=index.mjs.map