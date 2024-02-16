import "../../Operator/index.js";
import { _A, _E, _R } from "@effect-ts/system/Effect";
import { AtomicReference } from "@effect-ts/system/Support/AtomicReference";
import type { Has, Tag } from "../../Has/index.js";
import type { Erase, UnionToIntersection } from "../../Utils/index.js";
import * as Sy from "../_internal/index.js";
export declare abstract class SyncLayer<R, E, A> {
    readonly hash: AtomicReference<PropertyKey>;
    readonly [_R]: (_: R) => void;
    readonly [_E]: () => E;
    readonly [_A]: () => A;
    setKey(key: symbol): this;
    ["+++"]<R2, E2, A2>(that: SyncLayer<R2, E2, A2>): SyncLayer<R & R2, E | E2, A & A2>;
    ["<<<"]<R2, E2, A2>(that: SyncLayer<R2, E2, A2>): SyncLayer<Erase<R, A2> & R2, E | E2, A>;
    [">>>"]<R2, E2, A2>(that: SyncLayer<R2, E2, A2>): SyncLayer<Erase<R2, A> & R, E | E2, A2>;
    ["<+<"]<R2, E2, A2>(that: SyncLayer<R2, E2, A2>): SyncLayer<Erase<R, A2> & R2, E | E2, A & A2>;
    [">+>"]<R2, E2, A2>(that: SyncLayer<R2, E2, A2>): SyncLayer<Erase<R2, A> & R, E | E2, A & A2>;
    abstract scope(): Sy.Sync<unknown, never, (_: SyncMemoMap) => Sy.Sync<R, E, A>>;
    build(): Sy.Sync<R, E, A>;
}
export declare class Of<R, E, A> extends SyncLayer<R, E, A> {
    readonly sync: Sy.Sync<R, E, A>;
    readonly _tag = "FromSync";
    constructor(sync: Sy.Sync<R, E, A>);
    scope(): Sy.Sync<unknown, never, (_: SyncMemoMap) => Sy.Sync<R, E, A>>;
}
export declare class Fresh<R, E, A> extends SyncLayer<R, E, A> {
    readonly sync: SyncLayer<R, E, A>;
    readonly _tag = "Fresh";
    constructor(sync: SyncLayer<R, E, A>);
    scope(): Sy.Sync<unknown, never, (_: SyncMemoMap) => Sy.Sync<R, E, A>>;
}
export declare class Suspended<R, E, A> extends SyncLayer<R, E, A> {
    readonly sync: () => SyncLayer<R, E, A>;
    readonly _tag = "Suspended";
    constructor(sync: () => SyncLayer<R, E, A>);
    scope(): Sy.Sync<unknown, never, (_: SyncMemoMap) => Sy.Sync<R, E, A>>;
}
export declare class Both<R, E, A, R2, E2, A2> extends SyncLayer<R & R2, E | E2, A & A2> {
    readonly left: SyncLayer<R, E, A>;
    readonly right: SyncLayer<R2, E2, A2>;
    readonly _tag = "Both";
    constructor(left: SyncLayer<R, E, A>, right: SyncLayer<R2, E2, A2>);
    scopeBoth(self: Both<R, E, A, R2, E2, A2>): Sy.Sync<unknown, never, (map: SyncMemoMap) => Sy.Sync<R & R2, E | E2, A & A2>>;
    scope(): Sy.Sync<unknown, never, (_: SyncMemoMap) => Sy.Sync<R & R2, E | E2, A & A2>>;
}
export declare class Using<R, E, A, R2, E2, A2> extends SyncLayer<R & Erase<R2, A>, E | E2, A & A2> {
    readonly left: SyncLayer<R, E, A>;
    readonly right: SyncLayer<R2, E2, A2>;
    readonly _tag = "Using";
    constructor(left: SyncLayer<R, E, A>, right: SyncLayer<R2, E2, A2>);
    scope(): Sy.Sync<unknown, never, (_: SyncMemoMap) => Sy.Sync<R & Erase<R2, A>, E | E2, A & A2>>;
}
export declare class From<R, E, A, R2, E2, A2> extends SyncLayer<R & Erase<R2, A>, E | E2, A2> {
    readonly left: SyncLayer<R, E, A>;
    readonly right: SyncLayer<R2, E2, A2>;
    readonly _tag = "From";
    constructor(left: SyncLayer<R, E, A>, right: SyncLayer<R2, E2, A2>);
    scope(): Sy.Sync<unknown, never, (_: SyncMemoMap) => Sy.Sync<R & Erase<R2, A>, E | E2, A2>>;
}
export declare class All<Layers extends SyncLayer<any, any, any>[]> extends SyncLayer<MergeR<Layers>, MergeE<Layers>, MergeA<Layers>> {
    readonly layers: Layers & {
        0: SyncLayer<any, any, any>;
    };
    readonly _tag = "All";
    constructor(layers: Layers & {
        0: SyncLayer<any, any, any>;
    });
    scope(): Sy.Sync<unknown, never, (_: SyncMemoMap) => Sy.Sync<MergeR<Layers>, MergeE<Layers>, MergeA<Layers>>>;
}
export declare type MergeR<Ls extends SyncLayer<any, any, any>[]> = UnionToIntersection<{
    [k in keyof Ls]: [Ls[k]] extends [SyncLayer<infer X, any, any>] ? unknown extends X ? never : X : never;
}[number]>;
export declare type MergeE<Ls extends SyncLayer<any, any, any>[]> = {
    [k in keyof Ls]: [Ls[k]] extends [SyncLayer<any, infer X, any>] ? X : never;
}[number];
export declare type MergeA<Ls extends SyncLayer<any, any, any>[]> = UnionToIntersection<{
    [k in keyof Ls]: [Ls[k]] extends [SyncLayer<any, any, infer X>] ? unknown extends X ? never : X : never;
}[number]>;
export declare type SyncMemoMap = Map<PropertyKey, any>;
export declare function getMemoOrElseCreate<R, E, A>(layer: SyncLayer<R, E, A>): (m: SyncMemoMap) => Sy.Sync<R, E, A>;
export declare function fromRawSync<R, E, T>(_: Sy.Sync<R, E, T>): SyncLayer<R, E, T>;
export declare function fresh<R, E, A>(layer: SyncLayer<R, E, A>): Fresh<R, E, A>;
export declare function suspended<R, E, A>(layer: () => SyncLayer<R, E, A>): Suspended<R, E, A>;
export declare function fromSync<T>(tag: Tag<T>): <R, E>(_: Sy.Sync<R, E, T>) => SyncLayer<R, E, Has<T>>;
export declare function fromFunction<T>(tag: Tag<T>): <R>(_: (_: R) => T) => SyncLayer<R, never, Has<T>>;
export declare function fromValue<T>(tag: Tag<T>): (_: T) => SyncLayer<unknown, never, Has<T>>;
export declare function and<R2, E2, A2>(left: SyncLayer<R2, E2, A2>): <R, E, A>(right: SyncLayer<R, E, A>) => SyncLayer<R & R2, E2 | E, A & A2>;
export declare function andTo<R2, E2, A2>(left: SyncLayer<R2, E2, A2>): <R, E, A>(right: SyncLayer<R, E, A>) => SyncLayer<R & Erase<R2, A>, E2 | E, A & A2>;
export declare function to<R2, E2, A2>(left: SyncLayer<R2, E2, A2>): <R, E, A>(right: SyncLayer<R, E, A>) => SyncLayer<R & Erase<R2, A>, E2 | E, A2>;
export declare function using<R2, E2, A2>(left: SyncLayer<R2, E2, A2>): <R, E, A>(right: SyncLayer<R, E, A>) => SyncLayer<Erase<R, A2> & R2, E2 | E, A & A2>;
export declare function from<R2, E2, A2>(left: SyncLayer<R2, E2, A2>): <R, E, A>(right: SyncLayer<R, E, A>) => SyncLayer<Erase<R, A2> & R2, E2 | E, A>;
export declare function provideSyncLayer<R, E, A>(layer: SyncLayer<R, E, A>): <R2, E2, A2>(_: Sy.Sync<R2 & A, E2, A2>) => Sy.Sync<R & R2, E | E2, A2>;
export declare function all<Ls extends SyncLayer<any, any, any>[]>(...ls: Ls & {
    0: SyncLayer<any, any, any>;
}): SyncLayer<MergeR<Ls>, MergeE<Ls>, MergeA<Ls>>;
//# sourceMappingURL=index.d.ts.map