import * as A from "../../Collections/Immutable/Array/index.js";
import type { FiberID } from "../../Fiber/id.js";
import type { Trace } from "../../Fiber/tracing.js";
import * as S from "../../IO/index.js";
import * as O from "../../Option/index.js";
import type { Cause } from "../cause.js";
export declare type Segment = Sequential | Parallel | Failure;
export declare type Step = Parallel | Failure;
export interface Failure {
    _tag: "Failure";
    lines: string[];
}
export interface Parallel {
    _tag: "Parallel";
    all: Sequential[];
}
export interface Sequential {
    _tag: "Sequential";
    all: Step[];
}
export declare function Failure(lines: string[]): Failure;
export declare function Sequential(all: Step[]): Sequential;
export declare function Parallel(all: Sequential[]): Parallel;
export declare type TraceRenderer = (_: Trace) => string;
export interface Renderer<E = unknown> {
    renderError: (error: E) => string[];
    renderTrace: TraceRenderer;
    renderUnknown: (error: unknown) => string[];
}
export declare function headTail<A>(a: readonly A[] & {
    0: A;
}): [A, A[]];
export declare function prefixBlock(values: readonly string[], p1: string, p2: string): string[];
export declare function renderInterrupt(fiberId: FiberID, trace: O.Option<Trace>, traceRenderer: TraceRenderer): Sequential;
export declare function renderError(error: Error): string[];
export declare function renderDie(error: string[], trace: O.Option<Trace>, traceRenderer: TraceRenderer): Sequential;
export declare function renderFail(error: string[], trace: O.Option<Trace>, traceRenderer: TraceRenderer): Sequential;
export declare function lines(s: string): string[];
export declare function linearSegments<E>(cause: Cause<E>, renderer: Renderer<E>): S.IO<Step[]>;
export declare function parallelSegments<E>(cause: Cause<E>, renderer: Renderer<E>): S.IO<Sequential[]>;
export declare function renderToString(u: unknown): string;
export declare function causeToSequential<E>(cause: Cause<E>, renderer: Renderer<E>): S.IO<Sequential>;
export declare function renderTrace(o: O.Option<Trace>, renderTrace: TraceRenderer): string[];
export declare function times(s: string, n: number): string;
export declare function format(segment: Segment): readonly string[];
export declare function prettyLines<E>(cause: Cause<E>, renderer: Renderer<E>): S.IO<A.Array<string>>;
export declare function prettyM<E1>(cause: Cause<E1>, renderer: Renderer<E1>): S.IO<string>;
export declare function defaultErrorToLines(error: unknown): string[];
export declare const defaultRenderer: Renderer;
/**
 * Returns a `String` with the cause pretty-printed.
 */
export declare const pretty: <E1>(cause: Cause<E1>, renderer?: Renderer<E1>) => string;
//# sourceMappingURL=index.d.ts.map