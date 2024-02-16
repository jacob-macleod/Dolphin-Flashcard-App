import * as T from "../../../Effect/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as SK from "../Sink/core.mjs";
/**
 * A sink that executes the provided effectful function for every element fed to it.
 */

export function forEach(f) {
  const process = CH.readWithCause(in_ => CH.zipRight_(CH.fromEffect(T.forEachUnit_(in_, f)), process), halt => CH.failCause(halt), _ => CH.end(undefined));
  return new SK.Sink(process);
}
//# sourceMappingURL=forEach.mjs.map