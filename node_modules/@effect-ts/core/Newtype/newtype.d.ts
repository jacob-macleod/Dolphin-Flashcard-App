export interface Newtype<URI, A> {
    readonly _URI: URI;
    readonly _A: A;
}
export declare type AnyNewtype = Newtype<any, any>;
export interface Constructor<T, URI> {
    URI: URI;
    wrap: {
        /**
         * @ets_optimize identity
         */
        (_: T): Newtype<URI, T>;
    };
    unwrap: {
        /**
         * @ets_optimize identity
         */
        (_: Newtype<URI, T>): T;
    };
}
export interface GenericConstructor<URI> {
    URI: URI;
    wrap: {
        /**
         * @ets_optimize identity
         */
        <T>(_: T): Newtype<URI, T>;
    };
    unwrap: {
        /**
         * @ets_optimize identity
         */
        <T>(_: Newtype<URI, T>): T;
    };
    of: <T>() => Constructor<T, URI>;
}
export interface ConstructorK<T, URI, K extends Newtype<URI, T>> {
    wrap: {
        /**
         * @ets_optimize identity
         */
        (_: T): K;
    };
    unwrap: {
        /**
         * @ets_optimize identity
         */
        (_: K): T;
    };
}
export declare function typeDef<T>(): <URI extends string>(URI: URI) => Constructor<T, URI>;
export declare function genericDef<URI extends string>(URI: URI): GenericConstructor<URI>;
export declare const newtype: <K extends Newtype<any, any>>() => (_: Constructor<K["_A"], K["_URI"]>) => ConstructorK<K["_A"], K["_URI"], K>;
export declare type TypeOf<T extends Constructor<any, any>> = [T] extends [
    Constructor<infer K, infer URI>
] ? Newtype<URI, K> : never;
export declare type Generic<T, K extends GenericConstructor<any>> = [K] extends [
    GenericConstructor<infer URI>
] ? Newtype<URI, T> : never;
//# sourceMappingURL=newtype.d.ts.map