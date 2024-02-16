/** from ts-toolbelt, minimal port of Compute */
export declare type Depth = "flat" | "deep";
declare type Errors = Error;
declare type Numeric = Date;
declare type Textual = RegExp;
declare type Arrays = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
declare type Maps = ReadonlyMap<unknown, unknown> | ReadonlySet<unknown> | WeakMap<object, unknown> | WeakSet<object>;
declare type Structures = ArrayBuffer | DataView;
declare type Abstractions = Function | Promise<unknown> | Generator;
declare type WebAssembly = never;
export declare type BuiltInObject = Errors | Numeric | Textual | Arrays | Maps | Structures | Abstractions | WebAssembly;
export declare type ComputeRaw<A> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export declare type ComputeFlat<A> = A extends BuiltInObject ? A : {
    [K in keyof A]: A[K];
} & {};
export declare type ComputeDeep<A> = A extends BuiltInObject ? A : {
    [K in keyof A]: ComputeDeep<A[K]>;
} & {};
export declare type Compute<A, depth extends Depth = "deep"> = {
    flat: ComputeFlat<A>;
    deep: ComputeDeep<A>;
}[depth];
export {};
//# sourceMappingURL=tool.d.ts.map