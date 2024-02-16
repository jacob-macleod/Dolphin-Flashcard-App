"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoMap = exports.LayerZipWithSeq = exports.LayerZipWithPar = exports.LayerSuspend = exports.LayerMap = exports.LayerManaged = exports.LayerFresh = exports.LayerFold = exports.LayerChain = exports.LayerAllSeq = exports.LayerAllPar = exports.Layer = exports.Empty = void 0;
exports.and = and;
exports.and_ = and_;
exports.build = build;
exports.compose = compose;
exports.compose_ = compose_;
exports.fold = fold;
exports.fromRawEffect = fromRawEffect;
exports.fromRawFunction = fromRawFunction;
exports.fromRawFunctionM = fromRawFunctionM;
exports.fromRawManaged = fromRawManaged;
exports.hashSym = void 0;
exports.identity = identity;
exports.makeMemoMap = makeMemoMap;
exports.provideLayer = provideLayer;
exports.provideLayer_ = provideLayer_;
exports.provideSomeLayer = provideSomeLayer;
exports.provideSomeLayer_ = provideSomeLayer_;
exports.scope = scope;
exports.using = using;
exports.usingAnd = usingAnd;

var _reduce = /*#__PURE__*/require("../Collections/Immutable/Chunk/api/reduce.js");

var _index = /*#__PURE__*/require("../Collections/Immutable/Map/index.js");

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var _commons = /*#__PURE__*/require("../Effect/commons.js");

var _ExecutionStrategy = /*#__PURE__*/require("../Effect/ExecutionStrategy.js");

var _index3 = /*#__PURE__*/require("../Function/index.js");

var _core = /*#__PURE__*/require("../Managed/core.js");

var _do = /*#__PURE__*/require("../Managed/do.js");

var _forEach = /*#__PURE__*/require("../Managed/forEach.js");

var _fromEffect = /*#__PURE__*/require("../Managed/fromEffect.js");

var _managed = /*#__PURE__*/require("../Managed/managed.js");

var _environment = /*#__PURE__*/require("../Managed/methods/environment.js");

var add = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Managed/ReleaseMap/add.js"));

var Finalizer = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Managed/ReleaseMap/finalizer.js"));

var makeReleaseMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Managed/ReleaseMap/makeReleaseMap.js"));

var releaseAll = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Managed/ReleaseMap/releaseAll.js"));

var _succeed = /*#__PURE__*/require("../Managed/succeed.js");

var _use = /*#__PURE__*/require("../Managed/use.js");

var _await = /*#__PURE__*/require("../Promise/await.js");

var _halt = /*#__PURE__*/require("../Promise/halt.js");

var _make = /*#__PURE__*/require("../Promise/make.js");

var _succeed2 = /*#__PURE__*/require("../Promise/succeed.js");

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Ref/index.js"));

var RM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../RefM/index.js"));

var _index6 = /*#__PURE__*/require("../Support/AtomicReference/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./deps-effect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _a;

/**
 * Creates a layer from an effect
 */
function fromRawEffect(resource) {
  return new LayerManaged((0, _fromEffect.fromEffect)(resource));
}
/**
 * Creates a layer from a function
 */


function fromRawFunction(f) {
  return fromRawEffect(T.access(f));
}
/**
 * Creates a layer from an effectful function
 */


function fromRawFunctionM(f) {
  return fromRawEffect(T.accessM(f));
}
/**
 * Creates a layer from a managed environment
 */


function fromRawManaged(resource) {
  return new LayerManaged(resource);
}
/**
 * Constructs a layer that passes along the specified environment as an
 * output.
 */


function identity() {
  return fromRawManaged((0, _environment.environment)());
}
/**
 * Merge two Layers in parallel without providing any data to each other
 *
 * @param self - first Layer to combine
 * @param that - second Layer to combine
 */


function and_(self, that) {
  return new LayerZipWithPar(self, that, (l, r) => ({ ...l,
    ...r
  }));
}
/**
 * Merge two Layers in parallel without providing any data to each other
 *
 * @param that - second Layer to combine
 * @param self - first Layer to combine
 */


function and(that) {
  return self => new LayerZipWithPar(self, that, (l, r) => ({ ...l,
    ...r
  }));
}
/**
 * Feeds the error or output services of this layer into the input of either
 * the specified `failure` or `success` layers, resulting in a new layer with
 * the inputs of this layer, and the error or outputs of the specified layer.
 */


function fold(self) {
  return failure => success => new LayerFold(self, failure, success);
}
/**
 * Use `from` to partially provide environment into `to`
 */


function using(from) {
  return to => compose_(from["+++"](identity()), to);
}
/**
 * Use `from` to partially provide environment into `to` and merge both
 */


function usingAnd(from) {
  return to => compose_(from["+++"](identity()), to["+++"](identity()));
}
/**
 * Compose layers
 */


function compose_(from, to) {
  return fold(from)(fromRawFunctionM(_ => T.halt(_.get(1))))(to);
}
/**
 * Compose layers
 */


function compose(to) {
  return from => compose_(from, to);
}

const hashSym = /*#__PURE__*/Symbol();
exports.hashSym = hashSym;

class Layer {
  constructor() {
    this[_a] = new _index6.AtomicReference(Symbol());
  }
  /**
   * Set the hash key for memoization
   */


  setKey(hash) {
    this[hashSym].set(hash);
    return this;
  }

  [(_a = hashSym, "_I")]() {
    return this;
  }
  /**
   * Use that Layer to provide data to this
   */


  ["<=<"](that) {
    return that[">=>"](this);
  }
  /**
   * Use this Layer to provide data to that
   */


  [">=>"](that) {
    return compose_(this, that);
  }
  /**
   * Use that Layer to partially provide data to this
   */


  ["<<<"](that) {
    return that[">>>"](this);
  }

  [">>>"](that) {
    return this["+++"](identity())[">=>"](that);
  }
  /**
   * Create a Layer with the data from both Layers, while providing the data from this to that
   */


  [">+>"](that) {
    return this[">>>"](that["+++"](identity()));
  }
  /**
   * Create a Layer with the data from both Layers, while providing the data from that to this
   */


  ["<+<"](that) {
    return that[">+>"](this);
  }
  /**
   * Combine both layers in parallel
   */


  ["+++"](from) {
    return and_(from, this);
  }
  /**
   * Use the layer to provide partial environment to an effect
   */


  use(effect) {
    return provideSomeLayer(this)(effect);
  }
  /**
   * Use the layer to provide the full environment to an effect
   */


  useAll(effect) {
    return provideLayer(this)(effect);
  }
  /**
   * Use the layer to provide the full environment to an effect
   */


  get useForever() {
    return provideLayer(this)(T.never);
  }

}
/**
 * Provides a layer to the given effect
 */


exports.Layer = Layer;

function provideSomeLayer(layer) {
  return self => provideLayer_(self, layer["+++"](identity()));
}
/**
 * Provides a layer to the given effect
 */


function provideSomeLayer_(self, layer) {
  return provideLayer_(self, layer["+++"](identity()));
}
/**
 * Provides a layer to the given effect
 */


function provideLayer_(self, layer) {
  return (0, _use.use_)(build(layer), p => T.provideAll_(self, p));
}
/**
 * Provides a layer to the given effect
 */


function provideLayer(layer) {
  return self => provideLayer_(self, layer);
}

class LayerFold extends Layer {
  constructor(self, failure, success) {
    super();
    this.self = self;
    this.failure = failure;
    this.success = success;
    this._tag = "LayerFold";
  }

}

exports.LayerFold = LayerFold;

class LayerMap extends Layer {
  constructor(self, f) {
    super();
    this.self = self;
    this.f = f;
    this._tag = "LayerMap";
  }

}

exports.LayerMap = LayerMap;

class LayerChain extends Layer {
  constructor(self, f) {
    super();
    this.self = self;
    this.f = f;
    this._tag = "LayerChain";
  }

}

exports.LayerChain = LayerChain;

class LayerFresh extends Layer {
  constructor(self) {
    super();
    this.self = self;
    this._tag = "LayerFresh";
  }

}

exports.LayerFresh = LayerFresh;

class LayerManaged extends Layer {
  constructor(self) {
    super();
    this.self = self;
    this._tag = "LayerManaged";
  }

}

exports.LayerManaged = LayerManaged;

class LayerSuspend extends Layer {
  constructor(self) {
    super();
    this.self = self;
    this._tag = "LayerSuspend";
  }

}

exports.LayerSuspend = LayerSuspend;

class LayerZipWithPar extends Layer {
  constructor(self, that, f) {
    super();
    this.self = self;
    this.that = that;
    this.f = f;
    this._tag = "LayerZipWithPar";
  }

}

exports.LayerZipWithPar = LayerZipWithPar;

class LayerAllPar extends Layer {
  constructor(layers) {
    super();
    this.layers = layers;
    this._tag = "LayerAllPar";
  }

}

exports.LayerAllPar = LayerAllPar;

class LayerAllSeq extends Layer {
  constructor(layers) {
    super();
    this.layers = layers;
    this._tag = "LayerAllSeq";
  }

}

exports.LayerAllSeq = LayerAllSeq;

class LayerZipWithSeq extends Layer {
  constructor(self, that, f) {
    super();
    this.self = self;
    this.that = that;
    this.f = f;
    this._tag = "LayerZipWithSeq";
  }

}

exports.LayerZipWithSeq = LayerZipWithSeq;

function scope(_) {
  const I = _._I();

  switch (I._tag) {
    case "LayerFresh":
      {
        return (0, _succeed.succeed)(() => build(I.self));
      }

    case "LayerManaged":
      {
        return (0, _succeed.succeed)(() => I.self);
      }

    case "LayerSuspend":
      {
        return (0, _succeed.succeed)(memo => memo.getOrElseMemoize(I.self()));
      }

    case "LayerMap":
      {
        return (0, _succeed.succeed)(memo => (0, _core.map_)(memo.getOrElseMemoize(I.self), I.f));
      }

    case "LayerChain":
      {
        return (0, _succeed.succeed)(memo => (0, _core.chain_)(memo.getOrElseMemoize(I.self), a => memo.getOrElseMemoize(I.f(a))));
      }

    case "LayerZipWithPar":
      {
        return (0, _succeed.succeed)(memo => (0, _core.zipWithPar_)(memo.getOrElseMemoize(I.self), memo.getOrElseMemoize(I.that), I.f));
      }

    case "LayerZipWithSeq":
      {
        return (0, _succeed.succeed)(memo => (0, _core.zipWith_)(memo.getOrElseMemoize(I.self), memo.getOrElseMemoize(I.that), I.f));
      }

    case "LayerAllPar":
      {
        return (0, _succeed.succeed)(memo => {
          return (0, _core.map)((0, _reduce.reduce)({}, (b, a) => ({ ...b,
            ...a
          })))((0, _forEach.forEachPar_)(I.layers, memo.getOrElseMemoize));
        });
      }

    case "LayerAllSeq":
      {
        return (0, _succeed.succeed)(memo => {
          return (0, _core.map)((0, _reduce.reduce)({}, (b, a) => ({ ...b,
            ...a
          })))((0, _forEach.forEach_)(I.layers, memo.getOrElseMemoize));
        });
      }

    case "LayerFold":
      {
        return (0, _succeed.succeed)(memo => (0, _core.foldCauseM_)(memo.getOrElseMemoize(I.self), e => (0, _core.chain)(r => (0, _core.provideSome_)(memo.getOrElseMemoize(I.failure), () => Tp.tuple(r, e)))((0, _fromEffect.fromEffect)(T.environment())), r => (0, _core.provideAll_)(memo.getOrElseMemoize(I.success), r)));
      }
  }
}
/**
 * Builds a layer into a managed value.
 */


function build(_) {
  return (0, _core.map)(({
    value
  }) => value)((0, _do.bind)("value", ({
    memoMap,
    run
  }) => run(memoMap))((0, _do.bind)("run", () => scope(_))((0, _do.bind)("memoMap", () => (0, _fromEffect.fromEffect)(makeMemoMap()))(_do.do))));
}
/**
 * Creates a MemoMap
 */


function makeMemoMap() {
  return T.chain_(RM.makeRefM(new Map()), r => T.succeedWith(() => new MemoMap(r)));
}
/**
 * A `MemoMap` memoizes dependencies.
 */


class MemoMap {
  constructor(ref) {
    this.ref = ref;
    /**
     * Checks the memo map to see if a dependency exists. If it is, immediately
     * returns it. Otherwise, obtains the dependency, stores it in the memo map,
     * and adds a finalizer to the outer `Managed`.
     */

    this.getOrElseMemoize = layer => {
      return (0, _managed.managedApply)(T.flatten(RM.modify(m => {
        const inMap = m.get(layer[hashSym].get);

        if (inMap) {
          const {
            tuple: [acquire, release]
          } = inMap;
          const cached = T.accessM(({
            tuple: [_, rm]
          }) => T.map_(T.onExit_(acquire, ex => {
            switch (ex._tag) {
              case "Success":
                {
                  return add.add(release)(rm);
                }

              case "Failure":
                {
                  return T.unit;
                }
            }
          }), x => Tp.tuple(release, x)));
          return T.succeed(Tp.tuple(cached, m));
        } else {
          return T.map_(T.let_(T.let_(T.bind_(T.bind_(T.bind_(T.do, "observers", () => R.makeRef(0)), "promise", () => (0, _make.make)()), "finalizerRef", () => R.makeRef(Finalizer.noopFinalizer)), "resource", ({
            finalizerRef,
            observers,
            promise
          }) => T.uninterruptibleMask(({
            restore
          }) => T.map_(T.bind_(T.bind_(T.let_(T.let_(T.bind_(T.do, "env", () => T.environment()), "a", ({
            env: {
              tuple: [a]
            }
          }) => a), "outerReleaseMap", ({
            env: {
              tuple: [_, outerReleaseMap]
            }
          }) => outerReleaseMap), "innerReleaseMap", () => makeReleaseMap.makeReleaseMap), "tp", ({
            a,
            innerReleaseMap,
            outerReleaseMap
          }) => restore(T.chain_(T.result(T.provideAll_((0, _core.chain)(_ => _(this))(scope(layer)).effect, Tp.tuple(a, innerReleaseMap))), e => {
            switch (e._tag) {
              case "Failure":
                {
                  return T.chain_(T.chain_((0, _halt.halt)(e.cause)(promise), () => releaseAll.releaseAll(e, _ExecutionStrategy.sequential)(innerReleaseMap)), () => T.halt(e.cause));
                }

              case "Success":
                {
                  return T.map_(T.tap_(T.bind_(T.tap_(T.tap_(T.do, () => finalizerRef.set(e => T.whenM_(releaseAll.releaseAll(e, _ExecutionStrategy.sequential)(innerReleaseMap), R.modify_(observers, n => Tp.tuple(n === 1, n - 1))))), () => R.update_(observers, n => n + 1)), "outerFinalizer", () => add.add(e => T.chain_(finalizerRef.get, f => f(e)))(outerReleaseMap)), () => (0, _succeed2.succeed)(e.value.get(1))(promise)), ({
                    outerFinalizer
                  }) => Tp.tuple(outerFinalizer, e.value.get(1)));
                }
            }
          }))), ({
            tp
          }) => tp))), "memoized", ({
            finalizerRef,
            observers,
            promise
          }) => Tp.tuple(T.onExit_((0, _await.await)(promise), e => {
            switch (e._tag) {
              case "Failure":
                {
                  return T.unit;
                }

              case "Success":
                {
                  return R.update_(observers, n => n + 1);
                }
            }
          }), e => T.chain_(finalizerRef.get, f => f(e)))), ({
            memoized,
            resource
          }) => Tp.tuple(resource, (0, _index.insert)(layer[hashSym].get, memoized)(m)));
        }
      })(this.ref)));
    };
  }

}
/**
 * Empty layer, useful for init cases
 */


exports.MemoMap = MemoMap;
const Empty = /*#__PURE__*/new LayerSuspend(() => identity());
exports.Empty = Empty;
//# sourceMappingURL=definitions.js.map