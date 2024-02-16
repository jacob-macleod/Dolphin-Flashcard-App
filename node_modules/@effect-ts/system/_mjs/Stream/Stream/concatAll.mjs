// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";

function go(streams, chunkSize, currIndex, currStream, switchStream) {
  return T.catchAllCause_(T.flatten(currStream.get), x => O.fold_(C.sequenceCauseOption(x), () => T.chain_(Ref.getAndUpdate_(currIndex, x => x + 1), i => i >= chunkSize ? Pull.end : T.zipRight_(T.chain_(switchStream(A.unsafeGet_(streams, i).proc), currStream.set), go(streams, chunkSize, currIndex, currStream, switchStream))), Pull.halt));
}
/**
 * Concatenates all of the streams in the chunk to one stream.
 */


export function concatAll(streams) {
  const chunkSize = A.size(streams);
  return new Stream(M.map_(M.bind_(M.bind_(M.bind_(M.do, "currIndex", () => Ref.makeManagedRef(0)), "currStream", () => Ref.makeManagedRef(Pull.end)), "switchStream", () => M.switchable()), ({
    currIndex,
    currStream,
    switchStream
  }) => go(streams, chunkSize, currIndex, currStream, switchStream)));
}
//# sourceMappingURL=concatAll.mjs.map