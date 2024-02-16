// ets_tracing: off
function decorateNew(inp, setProto, makeNonConfigurable, resultSelector) {
  const out = Object.assign({}, inp);

  if (out.descriptor) {
    out.descriptor = Object.assign({}, out.descriptor);
  }

  const actualDesc = out.descriptor ||
  /* istanbul ignore next */
  out;
  const originalMethod = validateAndExtractMethodFromDescriptor(actualDesc);
  const isStatic = inp.placement === "static";

  actualDesc.get = function () {
    return getterCommon(isStatic ? this : Object.getPrototypeOf(this), out.key, isStatic, !!actualDesc.enumerable, originalMethod, this, // eslint-disable-next-line prefer-rest-params
    arguments, setProto, makeNonConfigurable, resultSelector);
  };

  return out;
}

function decorateLegacy(target, key, descriptor, setProto, makeNonConfigurable, //tslint:enable:bool-param-default
resultSelector) {
  /* istanbul ignore if */
  if (!descriptor) {
    descriptor = Object.getOwnPropertyDescriptor(target, key);

    if (!descriptor) {
      const e = new Error("@LazyGetter is unable to determine the property descriptor");
      e.$target = target;
      e.$key = key;
      throw e;
    }
  }

  const originalMethod = validateAndExtractMethodFromDescriptor(descriptor);
  return Object.assign({}, descriptor, {
    get() {
      return getterCommon(target, key, Object.getPrototypeOf(target) === Function.prototype, !!descriptor.enumerable, originalMethod, this, // eslint-disable-next-line prefer-rest-params
      arguments, setProto, makeNonConfigurable, resultSelector);
    }

  });
}

function defaultFilter() {
  return true;
}

function validateAndExtractMethodFromDescriptor(desc) {
  const originalMethod = desc.get;

  if (!originalMethod) {
    throw new Error("@LazyGetter can only decorate getters!");
  } else if (!desc.configurable) {
    throw new Error("@LazyGetter target must be configurable");
  }

  return originalMethod;
}

function getterCommon( //tslint:disable-line:parameters-max-number
target, key, isStatic, enumerable, originalMethod, thisArg, args, setProto, makeNonConfigurable, resultSelector) {
  const value = originalMethod.apply(thisArg, args);

  if (resultSelector(value)) {
    const newDescriptor = {
      configurable: !makeNonConfigurable,
      enumerable,
      value
    };

    if (isStatic || setProto) {
      Object.defineProperty(target, key, newDescriptor);
    }

    if (!isStatic) {
      Object.defineProperty(thisArg, key, newDescriptor);
    }
  }

  return value;
}
/**
 * Evaluate the getter function and cache the result
 * @param [setProto=false] Set the value on the class prototype as well. Only applies to non-static getters.
 * @param [makeNonConfigurable=false] Set to true to make the resolved property non-configurable
 * @param [resultSelector] A filter function that must return true for the value to cached
 * @return A decorator function
 */


function LazyGetter(setProto = false, makeNonConfigurable = false, resultSelector = defaultFilter) {
  let desc;
  let prop;
  let args = null;
  let isLegacy;

  function decorator(targetOrDesc, key, descriptor) {
    // eslint-disable-next-line prefer-rest-params
    args = arguments;

    if (key === undefined) {
      if (typeof desc === "undefined") {
        isLegacy = false;
        prop = targetOrDesc.key;
        desc = Object.assign({}, targetOrDesc.descriptor ||
        /* istanbul ignore next */
        targetOrDesc);
      }

      return decorateNew(targetOrDesc, setProto, makeNonConfigurable, resultSelector);
    } else {
      if (typeof desc === "undefined") {
        isLegacy = true;
        prop = key;
        desc = Object.assign({}, descriptor ||
        /* istanbul ignore next */
        Object.getOwnPropertyDescriptor(targetOrDesc, key));
      }

      return decorateLegacy(targetOrDesc, key, descriptor, setProto, makeNonConfigurable, resultSelector);
    }
  }

  decorator.reset = setProto ? thrower : on => {
    if (!on) {
      throw new Error("Unable to restore descriptor on an undefined target");
    }

    if (!desc) {
      throw new Error("Unable to restore descriptor. Did you remember to apply your decorator to a method?");
    } // Restore descriptor to its original state


    Object.defineProperty(on, prop, desc); // eslint-disable-next-line prefer-spread

    const ret = decorator.apply(null, args);
    Object.defineProperty(on, prop, isLegacy ? ret : ret.descriptor || ret);
  };
  return decorator;
}

function thrower() {
  throw new Error("This decoration modifies the class prototype and cannot be reset.");
}

export { LazyGetter };
//# sourceMappingURL=lazy.mjs.map