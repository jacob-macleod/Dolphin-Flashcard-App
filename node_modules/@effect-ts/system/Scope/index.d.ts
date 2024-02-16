import "../Operator/index.js";
import type { UIO } from "../Effect/effect.js";
import * as E from "../Either/index.js";
import { AtomicNumber } from "../Support/AtomicNumber/index.js";
import { AtomicReference } from "../Support/AtomicReference/index.js";
/**
 * Represent Common Ops between Global | Local<A>
 */
export interface CommonScope<A> {
    /**
     * Determines if the scope is closed at the instant the effect executes.
     * Returns an effect that will succeed with `true` if the scope is closed,
     * and `false` otherwise.
     */
    readonly closed: UIO<boolean>;
    /**
     * Prevents a previously added finalizer from being executed when the scope
     * is closed. The returned effect will succeed with `true` if the finalizer
     * will not be run by this scope, and `false` otherwise.
     */
    readonly deny: (key: Key) => UIO<boolean>;
    /**
     * Determines if the scope is empty (has no finalizers) at the instant the
     * effect executes. The returned effect will succeed with `true` if the scope
     * is empty, and `false` otherwise.
     */
    readonly empty: UIO<boolean>;
    /**
     * Adds a finalizer to the scope. If successful, this ensures that when the
     * scope exits, the finalizer will be run
     *
     * The returned effect will succeed with a key if the finalizer was added
     * to the scope, and `None` if the scope is already closed.
     */
    readonly ensure: (finalizer: (a: A) => UIO<any>) => UIO<E.Either<A, Key>>;
    /**
     * Extends the specified scope so that it will not be closed until this
     * scope is closed. Note that extending a scope into the global scope
     * will result in the scope *never* being closed!
     *
     * Scope extension does not result in changes to the scope contract: open
     * scopes must *always* be closed.
     */
    readonly extend: (that: Scope<any>) => UIO<boolean>;
    /**
     * Determines if the scope is open at the moment the effect is executed.
     * Returns an effect that will succeed with `true` if the scope is open,
     * and `false` otherwise.
     */
    readonly open: UIO<boolean>;
    /**
     * Determines if the scope has been released at the moment the effect is
     * executed. A scope can be closed yet unreleased, if it has been
     * extended by another scope which is not yet released.
     */
    readonly released: UIO<boolean>;
    readonly unsafeEnsure: (finalizer: (_: A) => UIO<any>) => E.Either<A, Key>;
    readonly unsafeExtend: (that: Scope<any>) => boolean;
    readonly unsafeDeny: (key: Key) => boolean;
}
/**
 * Represents a key in a scope, which is associated with a single finalizer.
 */
export declare class Key {
    /**
     * Attempts to remove the finalizer associated with this key from the
     * scope. The returned effect will succeed with a boolean, which indicates
     * whether the attempt was successful. A value of `true` indicates the
     * finalizer will not be executed, while a value of `false` indicates the
     * finalizer was already executed.
     */
    remove: UIO<boolean>;
    constructor(remove?: UIO<boolean>);
    setRemove(remove: UIO<boolean>): void;
}
/**
 * A `Scope<A>` is a value that allows adding finalizers identified by a key.
 * Scopes are closed with a value of type `A`, which is provided to all the
 * finalizers when the scope is released.
 *
 * For safety reasons, this interface has no method to close a scope. Rather,
 * an open scope may be required with `makeScope`, which returns a function
 * that can close a scope. This allows scopes to be safely passed around
 * without fear they will be accidentally closed.
 */
export declare type Scope<A> = Global | Local<A>;
/**
 * The global scope, which is entirely stateless. Finalizers added to the
 * global scope will never be executed (nor kept in memory).
 */
export declare class Global implements CommonScope<never> {
    readonly _tag = "Global";
    constructor();
    private unsafeEnsureResult;
    private ensureResult;
    get closed(): UIO<boolean>;
    deny(_key: Key): UIO<boolean>;
    get empty(): UIO<boolean>;
    ensure(_finalizer: (a: never) => UIO<any>): UIO<E.Either<never, Key>>;
    extend(that: Scope<any>): UIO<boolean>;
    get open(): UIO<boolean>;
    get released(): UIO<boolean>;
    unsafeEnsure(_finalizer: (_: never) => UIO<any>): E.Either<never, Key>;
    unsafeExtend(that: Scope<any>): boolean;
    unsafeDeny(): boolean;
}
export declare class OrderedFinalizer {
    readonly order: number;
    readonly finalizer: (_: any) => UIO<any>;
    constructor(order: number, finalizer: (_: any) => UIO<any>);
}
export declare class Local<A> implements CommonScope<A> {
    readonly finalizerCount: AtomicNumber;
    readonly exitValue: AtomicReference<A | null>;
    readonly references: AtomicNumber;
    readonly finalizers: Map<Key, OrderedFinalizer>;
    readonly _tag = "Local";
    constructor(finalizerCount: AtomicNumber, exitValue: AtomicReference<A | null>, references: AtomicNumber, finalizers: Map<Key, OrderedFinalizer>);
    get closed(): UIO<boolean>;
    get open(): UIO<boolean>;
    deny(key: Key): UIO<boolean>;
    get empty(): UIO<boolean>;
    ensure(finalizer: (a: A) => UIO<any>): UIO<E.Either<A, Key>>;
    extend(that: Scope<any>): UIO<boolean>;
    get released(): UIO<boolean>;
    unsafeExtend(that: Scope<any>): boolean;
    get release(): UIO<boolean>;
    unsafeReleased(): boolean;
    unsafeEnsure(finalizer: (_: A) => UIO<any>): E.Either<A, Key>;
    unsafeAddRef(): boolean;
    get unsafeClosed(): boolean;
    unsafeDeny(key: Key): boolean;
    unsafeClose(a: A): UIO<any> | null;
    unsafeRelease(): UIO<any> | null;
    get unsafeEmpty(): boolean;
}
/**
 * The global scope, which is entirely stateless. Finalizers added to the
 * global scope will never be executed (nor kept in memory).
 */
export declare const globalScope: Global;
/**
 * A tuple that contains an open scope, together with a function that closes
 * the scope.
 */
export declare class Open<A> {
    readonly close: (_: A) => UIO<boolean>;
    readonly scope: Local<A>;
    constructor(close: (_: A) => UIO<boolean>, scope: Local<A>);
}
export declare function unsafeMakeScope<A>(): Open<A>;
export declare function makeScope<A>(): UIO<Open<A>>;
//# sourceMappingURL=index.d.ts.map