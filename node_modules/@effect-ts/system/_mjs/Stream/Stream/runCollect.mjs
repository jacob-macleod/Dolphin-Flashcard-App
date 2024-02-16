// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as SK from "../Sink/index.mjs";
import { run } from "./run.mjs";
/**
 * Runs the stream and collects all of its elements to an array.
 */

export const runCollect = self => T.map_(run(SK.collectAll())(self), A.toArray);
/**
 * Runs the stream and collects all of its elements to an array.
 */

export const runList = self => run(SK.collectAllToList())(self);
//# sourceMappingURL=runCollect.mjs.map