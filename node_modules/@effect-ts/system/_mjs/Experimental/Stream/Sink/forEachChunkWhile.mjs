import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * A sink that executes the provided effectful function for every chunk fed to it
 * until `f` evaluates to `false`.
 */

export function forEachChunkWhile(f) {
  const reader = CH.readWith(_in => CH.chain_(CH.fromEffect(f(_in)), continue_ => continue_ ? reader : CH.end(undefined)), err => CH.fail(err), _ => CH.unit);
  return new C.Sink(reader);
}
//# sourceMappingURL=forEachChunkWhile.mjs.map