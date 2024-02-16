import type { Chunk } from "../Collections/Immutable/Chunk/index.js";
import type { UIO } from "./_internal/effect.js";
import * as T from "./_internal/effect-api.js";
import type { Runtime } from "./core.js";
import { FiberDump } from "./dump.js";
export declare function dump<E, A>(fiber: Runtime<E, A>): T.UIO<FiberDump>;
export declare function dumpFibers(fibers: Iterable<Runtime<any, any>>): UIO<Chunk<FiberDump>>;
export declare function dumpStr(fibers: Iterable<Runtime<any, any>>, withTrace: false): UIO<string>;
export declare function prettyPrintM(dump: FiberDump): UIO<string>;
export declare function collectTraces(dumps: Iterable<FiberDump>, now: number): Iterable<string>;
//# sourceMappingURL=fiberRenderer.d.ts.map