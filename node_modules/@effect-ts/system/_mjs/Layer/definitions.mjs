var _a;

import { reduce as chunkReduce } from "../Collections/Immutable/Chunk/api/reduce.mjs";
import { insert } from "../Collections/Immutable/Map/index.mjs";
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { _E, _RIn, _ROut } from "../Effect/commons.mjs";
import { sequential } from "../Effect/ExecutionStrategy.mjs";
import { pipe } from "../Function/index.mjs";
import { chain as managedChain, chain_ as managedChain_, foldCauseM_ as managedFoldCauseM_, map as managedMap, map_ as managedMap_, provideAll_ as managedProvideAll_, provideSome_ as managedProvideSome_, zipWith_ as managedZipWith_, zipWithPar_ as managedZipWithPar_ } from "../Managed/core.mjs";
import { bind as managedBind, do as managedDo } from "../Managed/do.mjs";
import { forEach_ as managedForEach_, forEachPar_ as managedForEachPar_ } from "../Managed/forEach.mjs";
import { fromEffect as managedFromEffect } from "../Managed/fromEffect.mjs";
import { managedApply } from "../Managed/managed.mjs";
import { environment as managedEnvironment } from "../Managed/methods/environment.mjs";
import * as add from "../Managed/ReleaseMap/add.mjs";
import * as Finalizer from "../Managed/ReleaseMap/finalizer.mjs";
import * as makeReleaseMap from "../Managed/ReleaseMap/makeReleaseMap.mjs";
import * as releaseAll from "../Managed/ReleaseMap/releaseAll.mjs";
import { succeed as succeed_1 } from "../Managed/succeed.mjs";
import { use_ } from "../Managed/use.mjs";
import { await as promiseAwait } from "../Promise/await.mjs";
import { halt } from "../Promise/halt.mjs";
import { make } from "../Promise/make.mjs";
import { succeed } from "../Promise/succeed.mjs";
import * as R from "../Ref/index.mjs";
import * as RM from "../RefM/index.mjs";
import { AtomicReference } from "../Support/AtomicReference/index.mjs";
import * as T from "./deps-effect.mjs";
/**
 * Creates a layer from an effect
 */

export function fromRawEffect(resource) {
  return new LayerManaged(managedFromEffect(resource));
}
/**
 * Creates a layer from a function
 */

export function fromRawFunction(f) {
  return fromRawEffect(T.access(f));
}
/**
 * Creates a layer from an effectful function
 */

export function fromRawFunctionM(f) {
  return fromRawEffect(T.accessM(f));
}
/**
 * Creates a layer from a managed environment
 */

export function fromRawManaged(resource) {
  return new LayerManaged(resource);
}
/**
 * Constructs a layer that passes along the specified environment as an
 * output.
 */

export function identity() {
  return fromRawManaged(managedEnvironment());
}
/**
 * Merge two Layers in parallel without providing any data to each other
 *
 * @param self - first Layer to combine
 * @param that - second Layer to combine
 */

export function and_(self, that) {
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

export function and(that) {
  return self => new LayerZipWithPar(self, that, (l, r) => ({ ...l,
    ...r
  }));
}
/**
 * Feeds the error or output services of this layer into the input of either
 * the specified `failure` or `success` layers, resulting in a new layer with
 * the inputs of this layer, and the error or outputs of the specified layer.
 */

export function fold(self) {
  return failure => success => new LayerFold(self, failure, success);
}
/**
 * Use `from` to partially provide environment into `to`
 */

export function using(from) {
  return to => compose_(from["+++"](identity()), to);
}
/**
 * Use `from` to partially provide environment into `to` and merge both
 */

export function usingAnd(from) {
  return to => compose_(from["+++"](identity()), to["+++"](identity()));
}
/**
 * Compose layers
 */

export function compose_(from, to) {
  return fold(from)(fromRawFunctionM(_ => T.halt(_.get(1))))(to);
}
/**
 * Compose layers
 */

export function compose(to) {
  return from => compose_(from, to);
}
export const hashSym = /*#__PURE__*/Symbol();
export class Layer {
  constructor() {
    this[_a] = new AtomicReference(Symbol());
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

export function provideSomeLayer(layer) {
  return self => provideLayer_(self, layer["+++"](identity()));
}
/**
 * Provides a layer to the given effect
 */

export function provideSomeLayer_(self, layer) {
  return provideLayer_(self, layer["+++"](identity()));
}
/**
 * Provides a layer to the given effect
 */

export function provideLayer_(self, layer) {
  return use_(build(layer), p => T.provideAll_(self, p));
}
/**
 * Provides a layer to the given effect
 */

export function provideLayer(layer) {
  return self => provideLayer_(self, layer);
}
export class LayerFold extends Layer {
  constructor(self, failure, success) {
    super();
    this.self = self;
    this.failure = failure;
    this.success = success;
    this._tag = "LayerFold";
  }

}
export class LayerMap extends Layer {
  constructor(self, f) {
    super();
    this.self = self;
    this.f = f;
    this._tag = "LayerMap";
  }

}
export class LayerChain extends Layer {
  constructor(self, f) {
    super();
    this.self = self;
    this.f = f;
    this._tag = "LayerChain";
  }

}
export class LayerFresh extends Layer {
  constructor(self) {
    super();
    this.self = self;
    this._tag = "LayerFresh";
  }

}
export class LayerManaged extends Layer {
  constructor(self) {
    super();
    this.self = self;
    this._tag = "LayerManaged";
  }

}
export class LayerSuspend extends Layer {
  constructor(self) {
    super();
    this.self = self;
    this._tag = "LayerSuspend";
  }

}
export class LayerZipWithPar extends Layer {
  constructor(self, that, f) {
    super();
    this.self = self;
    this.that = that;
    this.f = f;
    this._tag = "LayerZipWithPar";
  }

}
export class LayerAllPar extends Layer {
  constructor(layers) {
    super();
    this.layers = layers;
    this._tag = "LayerAllPar";
  }

}
export class LayerAllSeq extends Layer {
  constructor(layers) {
    super();
    this.layers = layers;
    this._tag = "LayerAllSeq";
  }

}
export class LayerZipWithSeq extends Layer {
  constructor(self, that, f) {
    super();
    this.self = self;
    this.that = that;
    this.f = f;
    this._tag = "LayerZipWithSeq";
  }

}
export function scope(_) {
  const I = _._I();

  switch (I._tag) {
    case "LayerFresh":
      {
        return succeed_1(() => build(I.self));
      }

    case "LayerManaged":
      {
        return succeed_1(() => I.self);
      }

    case "LayerSuspend":
      {
        return succeed_1(memo => memo.getOrElseMemoize(I.self()));
      }

    case "LayerMap":
      {
        return succeed_1(memo => managedMap_(memo.getOrElseMemoize(I.self), I.f));
      }

    case "LayerChain":
      {
        return succeed_1(memo => managedChain_(memo.getOrElseMemoize(I.self), a => memo.getOrElseMemoize(I.f(a))));
      }

    case "LayerZipWithPar":
      {
        return succeed_1(memo => managedZipWithPar_(memo.getOrElseMemoize(I.self), memo.getOrElseMemoize(I.that), I.f));
      }

    case "LayerZipWithSeq":
      {
        return succeed_1(memo => managedZipWith_(memo.getOrElseMemoize(I.self), memo.getOrElseMemoize(I.that), I.f));
      }

    case "LayerAllPar":
      {
        return succeed_1(memo => {
          return managedMap(chunkReduce({}, (b, a) => ({ ...b,
            ...a
          })))(managedForEachPar_(I.layers, memo.getOrElseMemoize));
        });
      }

    case "LayerAllSeq":
      {
        return succeed_1(memo => {
          return managedMap(chunkReduce({}, (b, a) => ({ ...b,
            ...a
          })))(managedForEach_(I.layers, memo.getOrElseMemoize));
        });
      }

    case "LayerFold":
      {
        return succeed_1(memo => managedFoldCauseM_(memo.getOrElseMemoize(I.self), e => managedChain(r => managedProvideSome_(memo.getOrElseMemoize(I.failure), () => Tp.tuple(r, e)))(managedFromEffect(T.environment())), r => managedProvideAll_(memo.getOrElseMemoize(I.success), r)));
      }
  }
}
/**
 * Builds a layer into a managed value.
 */

export function build(_) {
  return managedMap(({
    value
  }) => value)(managedBind("value", ({
    memoMap,
    run
  }) => run(memoMap))(managedBind("run", () => scope(_))(managedBind("memoMap", () => managedFromEffect(makeMemoMap()))(managedDo))));
}
/**
 * Creates a MemoMap
 */

export function makeMemoMap() {
  return T.chain_(RM.makeRefM(new Map()), r => T.succeedWith(() => new MemoMap(r)));
}
/**
 * A `MemoMap` memoizes dependencies.
 */

export class MemoMap {
  constructor(ref) {
    this.ref = ref;
    /**
     * Checks the memo map to see if a dependency exists. If it is, immediately
     * returns it. Otherwise, obtains the dependency, stores it in the memo map,
     * and adds a finalizer to the outer `Managed`.
     */

    this.getOrElseMemoize = layer => {
      return managedApply(T.flatten(RM.modify(m => {
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
          return T.map_(T.let_(T.let_(T.bind_(T.bind_(T.bind_(T.do, "observers", () => R.makeRef(0)), "promise", () => make()), "finalizerRef", () => R.makeRef(Finalizer.noopFinalizer)), "resource", ({
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
          }) => restore(T.chain_(T.result(T.provideAll_(managedChain(_ => _(this))(scope(layer)).effect, Tp.tuple(a, innerReleaseMap))), e => {
            switch (e._tag) {
              case "Failure":
                {
                  return T.chain_(T.chain_(halt(e.cause)(promise), () => releaseAll.releaseAll(e, sequential)(innerReleaseMap)), () => T.halt(e.cause));
                }

              case "Success":
                {
                  return T.map_(T.tap_(T.bind_(T.tap_(T.tap_(T.do, () => finalizerRef.set(e => T.whenM_(releaseAll.releaseAll(e, sequential)(innerReleaseMap), R.modify_(observers, n => Tp.tuple(n === 1, n - 1))))), () => R.update_(observers, n => n + 1)), "outerFinalizer", () => add.add(e => T.chain_(finalizerRef.get, f => f(e)))(outerReleaseMap)), () => succeed(e.value.get(1))(promise)), ({
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
          }) => Tp.tuple(T.onExit_(promiseAwait(promise), e => {
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
          }) => Tp.tuple(resource, insert(layer[hashSym].get, memoized)(m)));
        }
      })(this.ref)));
    };
  }

}
/**
 * Empty layer, useful for init cases
 */

export const Empty = /*#__PURE__*/new LayerSuspend(() => identity());
//# sourceMappingURL=definitions.mjs.map