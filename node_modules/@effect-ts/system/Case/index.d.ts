import type { IsEqualTo } from "../Utils/index.js";
export declare const CaseBrand: unique symbol;
export interface CaseBrand {
    [CaseBrand]: string[];
}
export declare function hasCaseBrand(self: unknown): self is CaseBrand;
export interface Copy<T> {
    copy(args: IsEqualTo<T, {}> extends true ? void : Partial<T>): this;
}
export interface CaseConstructor {
    readonly make: <X extends CaseConstructor>(this: X, ...args: X extends new (...args: infer R) => any ? R : never) => X extends new (...args: any) => any ? InstanceType<X> : never;
    new <T>(args: IsEqualTo<T, {}> extends true ? void : T): T & Copy<T>;
}
export declare const caseArgs: unique symbol;
export declare const caseKeys: unique symbol;
export declare const Case: CaseConstructor;
export interface CaseConstructorTagged<Tag extends PropertyKey, K extends PropertyKey> {
    readonly _tag: Tag;
    readonly make: <X extends Omit<CaseConstructorTagged<Tag, K>, "new">>(this: X, ...args: X extends new (...args: infer R) => any ? R : never) => X extends new (...args: any[]) => any ? InstanceType<X> : never;
    new <T>(args: IsEqualTo<T, {}> extends true ? void : T): T & Copy<T> & {
        readonly [k in K]: Tag;
    };
}
export interface CaseConstructorADT<Y, Tag extends PropertyKey, K extends PropertyKey> {
    readonly _tag: Tag;
    readonly make: <X extends Omit<CaseConstructorADT<Y, Tag, K>, "new">>(this: X, ...args: X extends new (...args: infer R) => any ? R : never) => X extends new (...args: any) => any ? InstanceType<X> extends Y ? Y : InstanceType<X> : Y;
    new <T>(args: IsEqualTo<T, {}> extends true ? void : T): T & Copy<T> & {
        readonly [k in K]: Tag;
    };
}
export declare function TaggedADT<X>(): {
    <Tag extends string | symbol>(tag: Tag): CaseConstructorADT<X, Tag, "_tag">;
    <Tag extends string | symbol, Key extends string | symbol>(tag: Tag, key: Key): CaseConstructorADT<X, Tag, Key>;
};
export declare function Tagged<Tag extends string | symbol, Key extends string | symbol>(tag: Tag, key: Key): CaseConstructorTagged<Tag, Key>;
export declare function Tagged<Tag extends PropertyKey>(tag: Tag): CaseConstructorTagged<Tag, "_tag">;
//# sourceMappingURL=index.d.ts.map