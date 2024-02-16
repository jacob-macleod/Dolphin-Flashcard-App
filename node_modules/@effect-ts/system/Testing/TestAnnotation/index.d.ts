import * as Chunk from "../../Collections/Immutable/Chunk/index.js";
import * as List from "../../Collections/Immutable/List/index.js";
import type * as SS from "../../Collections/Immutable/SortedSet/index.js";
import * as E from "../../Either/index.js";
import type * as Fiber from "../../Fiber/index.js";
import * as St from "../../Structural/index.js";
import type { AtomicReference } from "../../Support/AtomicReference/index.js";
import { Int } from "../Int/index.js";
/**
 * A type of annotation.
 */
export declare class TestAnnotation<V> implements St.HasHash, St.HasEquals {
    readonly identifier: string;
    readonly initial: V;
    readonly combine: (x: V, y: V) => V;
    constructor(identifier: string, initial: V, combine: (x: V, y: V) => V);
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
}
export declare type FibersAnnotation = E.Either<Int, Chunk.Chunk<AtomicReference<SS.SortedSet<Fiber.Runtime<unknown, unknown>>>>>;
export declare const fibers: TestAnnotation<FibersAnnotation>;
export declare type LocationAnnotation = List.List<Fiber.SourceLocation>;
export declare const location: TestAnnotation<LocationAnnotation>;
//# sourceMappingURL=index.d.ts.map