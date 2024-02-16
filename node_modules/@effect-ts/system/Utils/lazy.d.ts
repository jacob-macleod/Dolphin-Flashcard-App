/** Signifies that the modified property descriptor can be reset to its original state */
interface ResettableDescriptor {
    /**
     * Restore the property descriptor on the given class instance or prototype and re-apply the lazy getter.
     * @param on The class instance or prototype
     */
    reset(on: any): void;
}
/** A filter function that must return true for the value to cached */
declare type ResultSelectorFn = (v: any) => boolean;
/**
 * Evaluate the getter function and cache the result
 * @param [setProto=false] Set the value on the class prototype as well. Only applies to non-static getters.
 * @param [makeNonConfigurable=false] Set to true to make the resolved property non-configurable
 * @param [resultSelector] A filter function that must return true for the value to cached
 * @return A decorator function
 */
declare function LazyGetter(setProto?: boolean, makeNonConfigurable?: boolean, resultSelector?: ResultSelectorFn): MethodDecorator & ResettableDescriptor;
export { LazyGetter, ResultSelectorFn };
//# sourceMappingURL=lazy.d.ts.map