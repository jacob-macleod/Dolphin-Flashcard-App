import * as Cause from "../../../Cause/core.js";
import * as O from "../../../Option/index.js";
import * as Tp from "../Tuple/index.js";
import type { ParSeq } from "./primitives.js";
/**
 * Returns the first event in this collection of events. If multiple events
 * occur in parallel and before any other events then any of these events
 * may be returned.
 */
export declare function first<A>(self: ParSeq<A>): O.Option<A>;
/**
 * Folds over the events in this collection of events using the specified
 * functions.
 */
export declare function fold_<A, B>(self: ParSeq<A>, emptyCase: B, singleCase: (a: A) => B, thenCase: (l: B, r: B) => B, bothCase: (l: B, r: B) => B): B;
/**
 * Folds over the events in this collection of events using the specified
 * functions.
 *
 * @ets_data_first fold_
 */
export declare function fold<A, B>(emptyCase: B, singleCase: (a: A) => B, thenCase: (l: B, r: B) => B, bothCase: (l: B, r: B) => B): (self: ParSeq<A>) => B;
/**
 * Constructs a new collection of events for each event in this collection of
 * events, collecting them back into a single collection of events.
 */
export declare function chain_<A, B>(self: ParSeq<A>, f: (a: A) => ParSeq<B>): ParSeq<B>;
/**
 * Constructs a new collection of events for each event in this collection of
 * events, collecting them back into a single collection of events.
 *
 * @ets_data_first chain_
 */
export declare function chain<A, B>(f: (a: A) => ParSeq<B>): (self: ParSeq<A>) => ParSeq<B>;
/**
 * Flattens a collection of collections of events into a single collection
 * of events.
 */
export declare function flatten<A>(self: ParSeq<ParSeq<A>>): ParSeq<A>;
/**
 * Converts a ParSeq to a Cause
 */
export declare function toCause<A>(self: ParSeq<A>): Cause.Cause<A>;
/**
 * Transforms the type of events in this collection of events with the
 * specified function.
 */
export declare function map_<A, B>(self: ParSeq<A>, f: (a: A) => B): ParSeq<B>;
/**
 * Transforms the type of events in this collection of events with the
 * specified function.
 *
 * @ets_data_first map_
 */
export declare function map<A, B>(f: (a: A) => B): (self: ParSeq<A>) => ParSeq<B>;
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events using the specified function.
 */
export declare function zipWith_<A, B, C>(self: ParSeq<A>, that: ParSeq<B>, f: (a: A, b: B) => C): ParSeq<C>;
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events using the specified function.
 *
 * @ets_data_first zipWith_
 */
export declare function zipWith<A, B, C>(that: ParSeq<B>, f: (a: A, b: B) => C): (self: ParSeq<A>) => ParSeq<C>;
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, combining the elements into a
 * tuple.
 */
export declare function zip_<A, B>(self: ParSeq<A>, that: ParSeq<B>): ParSeq<Tp.Tuple<[A, B]>>;
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, combining the elements into a
 * tuple.
 *
 * @ets_data_first zip_
 */
export declare function zip<B>(that: ParSeq<B>): <A>(self: ParSeq<A>) => ParSeq<Tp.Tuple<[A, B]>>;
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from this
 * collection.
 */
export declare function zipLeft_<A, B>(self: ParSeq<A>, that: ParSeq<B>): ParSeq<A>;
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from this
 * collection.
 *
 * @ets_data_first zipLeft_
 */
export declare function zipLeft<B>(that: ParSeq<B>): <A>(self: ParSeq<A>) => ParSeq<A>;
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from that
 * collection.
 */
export declare function zipRight_<A, B>(self: ParSeq<A>, that: ParSeq<B>): ParSeq<B>;
/**
 * Combines this collection of events with that collection of events to
 * return the Cartesian product of events, keeping only the events from that
 * collection.
 *
 * @ets_data_first zipRight_
 */
export declare function zipRight<B>(that: ParSeq<B>): <A>(self: ParSeq<A>) => ParSeq<B>;
//# sourceMappingURL=core.d.ts.map