import * as T from "../../Effect/index.js";
import * as O from "../../Option/index.js";
import * as ST from "../../Structural/index.js";
import * as PR from "../Primitives/index.js";
export declare const BoolAlgebraTypeId: unique symbol;
export declare const ValueTypeId: unique symbol;
export declare const AndTypeId: unique symbol;
export declare const OrTypeId: unique symbol;
export declare const NotTypeId: unique symbol;
export declare function concrete<A>(_: BoolAlgebra<A>): asserts _ is typeof _[typeof PR._C];
/**
 * A `BoolAlgebra<A>` is a description of logical operations on values of type
 * `A`.
 */
export declare abstract class BoolAlgebra<A> implements ST.HasEquals {
    readonly [BoolAlgebraTypeId]: typeof BoolAlgebraTypeId;
    readonly [PR._A]: () => A;
    readonly [PR._C]: Value<A> | And<A> | Or<A> | Not<A>;
    abstract [ST.equalsSym](that: unknown): boolean;
    get [ST.hashSym](): number;
    ["&&"]<A1>(that: BoolAlgebra<A1>): BoolAlgebra<A | A1>;
    ["||"]<A1>(that: BoolAlgebra<A1>): BoolAlgebra<A | A1>;
    get ["!"](): BoolAlgebra<A>;
}
export declare class Value<A> extends BoolAlgebra<A> {
    readonly value: A;
    readonly typeId: typeof ValueTypeId;
    constructor(value: A);
    [ST.equalsSym](that: unknown): boolean;
    get [ST.hashSym](): number;
    private equal;
}
export declare function isValue<A>(a: BoolAlgebra<A>): a is Value<A>;
export declare class And<A> extends BoolAlgebra<A> {
    readonly left: BoolAlgebra<A>;
    readonly right: BoolAlgebra<A>;
    readonly typeId: typeof AndTypeId;
    constructor(left: BoolAlgebra<A>, right: BoolAlgebra<A>);
    [ST.equalsSym](that: unknown): boolean;
    private equal;
    private static associative;
    private commutative;
    private static distributive;
    private deMorgansLaws;
}
export declare function isAnd<A>(a: BoolAlgebra<A>): a is And<A>;
export declare class Or<A> extends BoolAlgebra<A> {
    readonly left: BoolAlgebra<A>;
    readonly right: BoolAlgebra<A>;
    readonly typeId: typeof OrTypeId;
    constructor(left: BoolAlgebra<A>, right: BoolAlgebra<A>);
    [ST.equalsSym](that: unknown): boolean;
    private equal;
    private static associative;
    private commutative;
    private static distributive;
    private deMorgansLaws;
}
export declare function isOr<A>(a: BoolAlgebra<A>): a is Or<A>;
export declare class Not<A> extends BoolAlgebra<A> {
    readonly result: BoolAlgebra<A>;
    readonly typeId: typeof NotTypeId;
    constructor(result: BoolAlgebra<A>);
    [ST.equalsSym](that: unknown): boolean;
    private equal;
    private deMorgansLaws;
}
export declare function isNot<A>(a: BoolAlgebra<A>): a is Not<A>;
export declare function isBoolAlgebra(a: unknown): a is BoolAlgebra<any>;
/**
 * Returns a new result, with all values mapped to the specified constant.
 */
export declare function as_<A, B>(self: BoolAlgebra<A>, b: B): BoolAlgebra<B>;
/**
 * Returns a new result, with all values mapped to the specified constant.
 */
export declare function as<B>(b: B): <A>(self: BoolAlgebra<A>) => BoolAlgebra<B>;
/**
 * If this result is a success returns `None`. If it is a failure returns a
 * new result containing all failures that are relevant to this result being
 * a failure.
 */
export declare function failures<A>(self: BoolAlgebra<A>): O.Option<BoolAlgebra<A>>;
/**
 * Returns a new result, with all values mapped to new results using the
 * specified function.
 */
export declare function chain_<A, B>(self: BoolAlgebra<A>, f: (a: A) => BoolAlgebra<B>): BoolAlgebra<B>;
/**
 * Returns a new result, with all values mapped to new results using the
 * specified function.
 */
export declare function chain<A, B>(f: (a: A) => BoolAlgebra<B>): (self: BoolAlgebra<A>) => BoolAlgebra<B>;
/**
 * Returns a new result, with all values mapped to new results using the
 * specified effectual function.
 */
export declare function chainM_<R, E, A, B>(self: BoolAlgebra<A>, f: (a: A) => T.Effect<R, E, BoolAlgebra<B>>): T.Effect<R, E, BoolAlgebra<B>>;
/**
 * Returns a new result, with all values mapped to new results using the
 * specified effectual function.
 */
export declare function chainM<R, E, A, B>(f: (a: A) => T.Effect<R, E, BoolAlgebra<B>>): (self: BoolAlgebra<A>) => T.Effect<R, E, BoolAlgebra<B>>;
/**
 * Folds over the result bottom up, first converting values to `B`
 * values, and then combining the `B` values, using the specified functions.
 */
export declare function fold_<A, B>(self: BoolAlgebra<A>, caseValue: (a: A) => B, caseAnd: (b1: B, b2: B) => B, caseOr: (b1: B, b2: B) => B, caseNot: (b: B) => B): B;
/**
 * Folds over the result bottom up, first converting values to `B`
 * values, and then combining the `B` values, using the specified functions.
 */
export declare function fold<A, B>(caseValue: (a: A) => B, caseAnd: (b1: B, b2: B) => B, caseOr: (b1: B, b2: B) => B, caseNot: (b: B) => B): (self: BoolAlgebra<A>) => B;
export declare function implies_<A>(self: BoolAlgebra<A>, that: BoolAlgebra<A>): BoolAlgebra<A>;
export declare function implies<A>(that: BoolAlgebra<A>): (self: BoolAlgebra<A>) => BoolAlgebra<A>;
export declare function iff_<A>(self: BoolAlgebra<A>, that: BoolAlgebra<A>): BoolAlgebra<A>;
export declare function iff<A>(that: BoolAlgebra<A>): (self: BoolAlgebra<A>) => BoolAlgebra<A>;
/**
 * Determines whether the result is a failure, where values represent success
 * and are combined using logical conjunction, disjunction, and negation.
 */
export declare function isFailure<A>(self: BoolAlgebra<A>): boolean;
/**
 * Determines whether the result is a success, where values represent success
 * and are combined using logical conjunction, disjunction, and negation.
 */
export declare function isSuccess<A>(self: BoolAlgebra<A>): boolean;
/**
 * Returns a new result, with all values mapped by the specified function.
 */
export declare function map_<A, B>(self: BoolAlgebra<A>, f: (a: A) => B): BoolAlgebra<B>;
/**
 * Returns a new result, with all values mapped by the specified function.
 */
export declare function map<A, B>(f: (a: A) => B): (self: BoolAlgebra<A>) => BoolAlgebra<B>;
/**
 * Returns a new result, with all values mapped by the specified effectual
 * function.
 */
export declare function mapM_<R, E, A, B>(self: BoolAlgebra<A>, f: (a: A) => T.Effect<R, E, B>): T.Effect<R, E, BoolAlgebra<B>>;
/**
 * Returns a new result, with all values mapped by the specified effectual
 * function.
 */
export declare function mapM<R, E, A, B>(f: (a: A) => T.Effect<R, E, B>): (self: BoolAlgebra<A>) => T.Effect<R, E, BoolAlgebra<B>>;
/**
 * Returns a result that is the logical conjunction of all of the results in
 * the specified collection.
 */
export declare function all<A>(as: Iterable<BoolAlgebra<A>>): O.Option<BoolAlgebra<A>>;
/**
 * Constructs a result that is the logical conjunction of two results.
 */
export declare function and_<A, A1>(left: BoolAlgebra<A>, right: BoolAlgebra<A1>): BoolAlgebra<A | A1>;
/**
 * Constructs a result that is the logical conjunction of two results.
 */
export declare function and<A>(right: BoolAlgebra<A>): (left: BoolAlgebra<A>) => BoolAlgebra<A>;
/**
 * Returns a result that is the logical disjunction of all of the results in
 * the specified collection.
 */
export declare function any<A>(as: Iterable<BoolAlgebra<A>>): O.Option<BoolAlgebra<A>>;
/**
 * Combines a collection of results to create a single result that succeeds
 * if all of the results succeed.
 */
export declare function collectAll<A>(as: Iterable<BoolAlgebra<A>>): O.Option<BoolAlgebra<A>>;
/**
 * Constructs a failed result with the specified value.
 */
export declare function failure<A>(a: A): BoolAlgebra<A>;
/**
 * Applies the function `f` to each element of the `Iterable[A]` to produce
 * a collection of results, then combines all of those results to create a
 * single result that is the logical conjunction of all of the results.
 */
export declare function forEach<A, B>(as: Iterable<A>, f: (a: A) => BoolAlgebra<B>): O.Option<BoolAlgebra<B>>;
/**
 * Constructs a result that is the logical negation of the specified result.
 */
export declare function not<A>(result: BoolAlgebra<A>): BoolAlgebra<A>;
/**
 * Constructs a result a that is the logical disjunction of two results.
 */
export declare function or_<A, A1>(left: BoolAlgebra<A>, right: BoolAlgebra<A1>): BoolAlgebra<A | A1>;
/**
 * Constructs a result a that is the logical disjunction of two results.
 */
export declare function or<A>(right: BoolAlgebra<A>): (left: BoolAlgebra<A>) => BoolAlgebra<A>;
/**
 * Constructs a successful result with the specified value.
 */
export declare function success<A>(a: A): BoolAlgebra<A>;
/**
 * A successful result with the unit value.
 */
export declare const unit: BoolAlgebra<void>;
//# sourceMappingURL=index.d.ts.map