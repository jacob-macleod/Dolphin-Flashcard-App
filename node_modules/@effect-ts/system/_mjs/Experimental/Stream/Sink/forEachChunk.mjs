import * as CH from "../Channel/index.mjs";
import * as SK from "../Sink/core.mjs";
/**
 * A sink that executes the provided effectful function for every chunk fed to it.
 */

export function forEachChunk(f) {
  const process = CH.readWithCause(in_ => CH.zipRight_(CH.fromEffect(f(in_)), process), halt => CH.failCause(halt), _ => CH.end(undefined));
  return new SK.Sink(process);
}
//# sourceMappingURL=forEachChunk.mjs.map