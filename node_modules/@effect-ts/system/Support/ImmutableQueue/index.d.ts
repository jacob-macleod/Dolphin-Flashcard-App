import "../../Operator/index.js";
import * as L from "../../Collections/Immutable/List/index.js";
import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import * as O from "../../Option/index.js";
export declare class ImmutableQueue<A> {
    private readonly backing;
    constructor(backing: L.List<A>);
    push(a: A): ImmutableQueue<A>;
    prepend(a: A): ImmutableQueue<A>;
    get size(): number;
    dequeue(): O.Option<Tp.Tuple<[NonNullable<A>, ImmutableQueue<A>]>>;
    find(f: (a: A) => boolean): O.Option<A>;
    filter(f: (a: A) => boolean): ImmutableQueue<A>;
    static single<A>(a: A): ImmutableQueue<A>;
    [Symbol.iterator](): IterableIterator<A>;
}
//# sourceMappingURL=index.d.ts.map