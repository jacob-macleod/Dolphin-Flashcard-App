import { _A } from "../../../Effect/commons.js";
import * as IO from "../../../IO/index.js";
import * as St from "../../../Structural/index.js";
export declare const _ParSeqBrand: unique symbol;
export declare type _ParSeqBrand = typeof _ParSeqBrand;
export declare function isParSeq(u: unknown): u is ParSeq<unknown>;
/**
 * `ParSeq` is a data type that represents some notion of "events" that can
 * take place in parallel or in sequence. For example, a `ParSeq`
 * parameterized on some error type could be used to model the potentially
 * multiple ways that an application can fail. On the other hand, a ParSeq`
 * parameterized on some request type could be used to model a collection of
 * requests to external data sources, some of which could be executed in
 * parallel and some of which must be executed sequentially.
 */
export declare type ParSeq<A> = Empty | Single<A> | Then<A> | Both<A>;
export declare class Empty implements St.HasEquals, St.HasHash {
    readonly _tag = "Empty";
    readonly [_A]: () => never;
    readonly [_ParSeqBrand]: _ParSeqBrand;
    [St.equalsSym](that: unknown): boolean;
    get [St.hashSym](): number;
    equalsSafe(that: ParSeq<unknown>): IO.IO<boolean>;
}
export declare class Then<A> implements St.HasEquals, St.HasHash {
    readonly left: ParSeq<A>;
    readonly right: ParSeq<A>;
    readonly _tag = "Then";
    readonly [_A]: () => never;
    readonly [_ParSeqBrand]: _ParSeqBrand;
    constructor(left: ParSeq<A>, right: ParSeq<A>);
    [St.equalsSym](that: unknown): boolean;
    get [St.hashSym](): number;
    equalsSafe(that: ParSeq<unknown>): IO.IO<boolean>;
    private eq;
}
export declare class Both<A> implements St.HasEquals, St.HasHash {
    readonly left: ParSeq<A>;
    readonly right: ParSeq<A>;
    readonly _tag = "Both";
    readonly [_A]: () => never;
    readonly [_ParSeqBrand]: _ParSeqBrand;
    constructor(left: ParSeq<A>, right: ParSeq<A>);
    [St.equalsSym](that: unknown): boolean;
    get [St.hashSym](): number;
    equalsSafe(that: ParSeq<unknown>): IO.IO<boolean>;
    private eq;
}
export declare class Single<A> implements St.HasEquals, St.HasHash {
    readonly a: A;
    readonly _tag = "Single";
    readonly [_A]: () => never;
    readonly [_ParSeqBrand]: _ParSeqBrand;
    constructor(a: A);
    [St.equalsSym](that: unknown): boolean;
    get [St.hashSym](): number;
    equalsSafe(that: ParSeq<unknown>): IO.IO<boolean>;
}
/**
 * Combines this collection of events with that collection of events to
 * return a new collection of events that represents this collection of
 * events in parallel with that collection of events.
 */
export declare function combinePar_<A, A1>(left: ParSeq<A>, right: ParSeq<A1>): ParSeq<A | A1>;
/**
 * Combines this collection of events with that collection of events to
 * return a new collection of events that represents this collection of
 * events in parallel with that collection of events.
 *
 * @ets_data_first combinePar_
 */
export declare function combinePar<A1>(right: ParSeq<A1>): <A>(left: ParSeq<A>) => ParSeq<A | A1>;
/**
 * Combines this collection of events with that collection of events to
 * return a new collection of events that represents this collection of
 * events followed by that collection of events.
 */
export declare function combineSeq_<A, A1>(left: ParSeq<A>, right: ParSeq<A1>): ParSeq<A | A1>;
/**
 * Combines this collection of events with that collection of events to
 * return a new collection of events that represents this collection of
 * events followed by that collection of events.
 *
 * @ets_data_first combineSeq_
 */
export declare function combineSeq<A1>(right: ParSeq<A1>): <A>(left: ParSeq<A>) => ParSeq<A | A1>;
/**
 * Constructs a new collection of events that contains the specified event.
 */
export declare function single<A>(a: A): ParSeq<A>;
/**
 * Empty collection of events
 */
export declare const empty: ParSeq<never>;
/**
 * Checks if the ParSeq is empty
 */
export declare function isEmpty<A>(self: ParSeq<A>): boolean;
//# sourceMappingURL=primitives.d.ts.map