import * as L from "../Collections/Immutable/List/core.js";
import * as O from "../Option/index.js";
import * as S from "../Sync/index.js";
import type { FiberID } from "./id.js";
export declare type TraceElement = NoLocation | SourceLocation;
export declare class NoLocation {
    readonly _tag = "NoLocation";
}
export declare class SourceLocation {
    readonly location: string;
    readonly _tag = "SourceLocation";
    constructor(location: string);
}
export declare function traceLocation(k: string | undefined): TraceElement;
export declare class Trace {
    readonly fiberId: FiberID;
    readonly executionTrace: L.List<TraceElement>;
    readonly stackTrace: L.List<TraceElement>;
    readonly parentTrace: O.Option<Trace>;
    constructor(fiberId: FiberID, executionTrace: L.List<TraceElement>, stackTrace: L.List<TraceElement>, parentTrace: O.Option<Trace>);
}
export declare function ancestryLengthSafe(trace: Trace, i: number): S.UIO<number>;
export declare function ancestryLength(trace: Trace): number;
export declare function parents(trace: Trace): L.List<Trace>;
export declare function truncatedParentTrace(trace: Trace, maxAncestors: number): O.Option<Trace>;
export declare function prettyTrace(trace: Trace): string;
export declare function prettyTraceSafe(trace: Trace): S.UIO<string>;
//# sourceMappingURL=tracing.d.ts.map