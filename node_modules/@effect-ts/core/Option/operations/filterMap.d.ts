import * as O from "@effect-ts/system/Option";
/**
 * Filter + Map
 *
 * @ets_data_first filterMap_
 */
export declare function filterMap<A, B>(f: (a: A) => O.Option<B>): (fa: O.Option<A>) => O.Option<B>;
/**
 * Filter + Map
 */
export declare function filterMap_<A, B>(fa: O.Option<A>, f: (a: A) => O.Option<B>): O.Option<B>;
//# sourceMappingURL=filterMap.d.ts.map