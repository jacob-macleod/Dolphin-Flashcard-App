export declare const hashSym: unique symbol;
export interface HasHash {
    readonly [hashSym]: number;
}
export declare function hasHash(u: unknown): u is HasHash;
export declare function opt(n: number): number;
export declare function hash(arg: any): number;
export declare function hashUnknown(arg: unknown): number;
export declare function hashArray(arr: readonly any[]): number;
export declare function hashArgs(...args: any[]): number;
export declare function combineHash(a: number, b: number): number;
export declare function hashObject(value: object): number;
export declare function hashMiscRef(o: Object): number;
export declare function hashIterator(it: Iterator<any>): number;
export declare function hashPlainObject(o: object): number;
export declare function hashNumber(n: number): number;
export declare function hashString(str: string): number;
export declare function randomInt(): number;
export declare function _hash(arg: any): number;
export declare function _hashArray(arr: readonly any[]): number;
export declare function _combineHash(a: number, b: number): number;
export declare function isDefined<T>(value: T | undefined): value is T;
export declare function isIterable(value: object): value is Iterable<unknown>;
export declare function _hashObject(value: object): number;
export declare function _hashMiscRef(o: Object): number;
export declare function _hashIterator(it: Iterator<any>): number;
export declare function _hashPlainObject(o: object): number;
export declare function _hashNumber(n: number): number;
export declare function _hashString(str: string): number;
//# sourceMappingURL=index.d.ts.map