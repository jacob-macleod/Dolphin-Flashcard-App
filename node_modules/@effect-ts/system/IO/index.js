"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IoURI = exports.GenIO = void 0;
exports.chain = chain;
exports.chain_ = chain_;
exports.gen = gen;
exports.map = map;
exports.map_ = map_;
exports.run = run;
exports.succeed = succeed;
exports.succeedWith = succeedWith;
exports.suspend = suspend;
exports.tap = tap;
exports.tap_ = tap_;
exports.unit = void 0;
exports.zip = zip;
exports.zipWith = zipWith;
exports.zipWith_ = zipWith_;
exports.zip_ = zip_;

require("../Operator/index.js");

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var _commons = /*#__PURE__*/require("../Effect/commons.js");

var _index3 = /*#__PURE__*/require("../Stack/index.js");

var _index4 = /*#__PURE__*/require("../Utils/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/* eslint-disable prefer-const */
const IoURI = /*#__PURE__*/Symbol();
exports.IoURI = IoURI;

class Base {}

class Succeed extends Base {
  constructor(a) {
    super();
    this.a = a;
    this._iotag = "Succeed";
  }

}

class Suspend extends Base {
  constructor(f) {
    super();
    this.f = f;
    this._iotag = "Suspend";
  }

}

class FlatMap extends Base {
  constructor(value, cont) {
    super();
    this.value = value;
    this.cont = cont;
    this._iotag = "FlatMap";
  }

}
/**
 * Runs this computation
 */


function run(self) {
  let stack = undefined;
  let a = undefined;
  let curIO = self;

  while (curIO != null) {
    switch (curIO._iotag) {
      case "FlatMap":
        {
          switch (curIO.value._iotag) {
            case "Succeed":
              {
                curIO = curIO.cont(curIO.value.a);
                break;
              }

            default:
              {
                stack = new _index3.Stack(curIO.cont, stack);
                curIO = curIO.value;
              }
          }

          break;
        }

      case "Suspend":
        {
          curIO = curIO.f();
          break;
        }

      case "Succeed":
        {
          a = curIO.a;

          if (stack) {
            curIO = stack.value(a);
            stack = stack.previous;
          } else {
            curIO = undefined;
          }

          break;
        }
    }
  }

  return a;
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first chain_
 */


function chain(f) {
  return self => new FlatMap(self, f);
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */


function chain_(self, f) {
  return new FlatMap(self, f);
}
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 *
 * @ets_data_first tap_
 */


function tap(f) {
  return self => tap_(self, f);
}
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */


function tap_(self, f) {
  return chain_(self, a => map_(f(a), () => a));
}
/**
 * Constructs a computation that always succeeds with the specified value.
 */


function succeed(a) {
  return new Succeed(a);
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */


function map_(self, f) {
  return chain_(self, a => succeed(f(a)));
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first map_
 */


function map(f) {
  return self => map_(self, f);
}
/**
 * Constructs a computation that always returns the `Unit` value.
 */


const unit = /*#__PURE__*/new Succeed(undefined);
/**
 * Combines this computation with the specified computation combining the
 * results of both using the specified function.
 *
 * @ets_data_first zipWith_
 */

exports.unit = unit;

function zipWith(that, f) {
  return self => zipWith_(self, that, f);
}
/**
 * Combines this computation with the specified computation combining the
 * results of both using the specified function.
 */


function zipWith_(self, that, f) {
  return chain_(self, a => map_(that, b => f(a, b)));
}
/**
 * Combines this computation with the specified computation, combining the
 * results of both into a tuple.
 *
 * @ets_data_first zip_
 */


function zip(that) {
  return self => zip_(self, that);
}
/**
 * Combines this computation with the specified computation combining the
 * results of both into a tuple.
 */


function zip_(self, that) {
  return zipWith_(self, that, Tp.tuple);
}
/**
 * Suspend a computation, useful in recursion
 */


function suspend(f) {
  return new Suspend(f);
}
/**
 * Lift a sync (non failable) computation
 */


function succeedWith(f) {
  return suspend(() => succeed(f()));
}

class GenIO {
  constructor(effect) {
    this.effect = effect;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}

exports.GenIO = GenIO;

function adapter(_) {
  return new GenIO(_);
}

function run_(state, iterator) {
  if (state.done) {
    return succeed(state.value);
  }

  return chain_(state.value["effect"], val => {
    const next = iterator.next(val);
    return run_(next, iterator);
  });
}
/**
 * Generator
 */


function gen(f) {
  return suspend(() => {
    const iterator = f(adapter);
    const state = iterator.next();
    return run_(state, iterator);
  });
}
//# sourceMappingURL=index.js.map