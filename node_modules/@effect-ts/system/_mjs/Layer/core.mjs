// ets_tracing: off
import * as C from "../Cause/index.mjs";
import * as CL from "../Clock/index.mjs";
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import * as E from "../Either/index.mjs";
import { identity as idFn, pipe } from "../Function/index.mjs";
import { build, compose_, fold, fromRawEffect, fromRawFunction, fromRawFunctionM, fromRawManaged, identity, LayerAllPar, LayerAllSeq, LayerChain, LayerFresh, LayerManaged, LayerMap, LayerSuspend, LayerZipWithPar, LayerZipWithSeq } from "./definitions.mjs";
import * as T from "./deps-effect.mjs";
import * as M from "./deps-managed.mjs";
export * from "./definitions.mjs";
/**
 * Lazily constructs a layer. This is useful to avoid infinite recursion when
 * creating layers that refer to themselves.
 */

export function suspend(f) {
  return new LayerSuspend(f);
}
/**
 * Combines this layer with the specified layer, producing a new layer that
 * has the inputs of both layers, and the outputs of both layers combined
 * using the specified function.
 */

export function zipWithPar_(self, that, f) {
  return new LayerZipWithPar(self, that, f);
}
/**
 * Constructs a layer that fails with the specified value.
 */

export function fail(e) {
  return fromRawManaged(M.fail(e));
}
/**
 * Constructs a layer from the specified value.
 */

export function succeed(resource) {
  return fromRawManaged(M.succeed(resource));
}
/**
 * Combines this layer with the specified layer, producing a new layer that
 * has the inputs of both layers, and the outputs of both layers combined
 * using the specified function.
 */

export function zipWithPar(that, f) {
  return self => zipWithPar_(self, that, f);
}
/**
 * Combines this layer with the specified layer, producing a new layer that
 * has the inputs of both layers, and the outputs of both layers combined
 * into a tuple.
 */

export function zipPar_(self, that) {
  return zipWithPar_(self, that, Tp.tuple);
}
/**
 * Combines this layer with the specified layer, producing a new layer that
 * has the inputs of both layers, and the outputs of both layers combined
 * into a tuple.
 */

export function zipPar(that) {
  return self => zipPar_(self, that);
}
/**
 * Construct a service layer from a value
 */

export function fromValue(has) {
  return resource => new LayerManaged(M.fromEffect(T.succeed(has.has(resource)))).setKey(has.key);
}
/**
 * Constructs a layer from the specified effect.
 *
 * @ets_data_first fromEffect_
 */

export function fromEffect(has) {
  return resource => fromEffect_(resource, has);
}
/**
 * Constructs a layer from the specified effect.
 */

export function fromEffect_(resource, has) {
  return new LayerManaged(M.map_(M.fromEffect(resource), has.has)).setKey(has.key);
}
/**
 * Constructs a layer from a managed resource.
 */

export function fromManaged(has) {
  return resource => new LayerManaged(M.map_(resource, has.has)).setKey(has.key);
}
/**
 * Constructs a layer from a managed resource.
 */

export function fromManaged_(resource, has) {
  return new LayerManaged(M.map_(resource, has.has)).setKey(has.key);
}
/**
 * Constructs a layer from the environment using the specified function.
 */

export function fromFunction(tag) {
  return f => fromEffect(tag)(T.access(f));
}
/**
 * Zips layers together
 */

export function zip_(self, that) {
  return new LayerZipWithSeq(self, that, Tp.tuple);
}
/**
 * Zips layers together
 */

export function zip(right) {
  return left => zip_(left, right);
}
/**
 * Merges layers sequentially
 */

export function andSeq(that) {
  return self => andSeq_(self, that);
}
/**
 * Merges layers sequentially
 */

export function andSeq_(self, that) {
  return new LayerZipWithSeq(self, that, (l, r) => ({ ...l,
    ...r
  }));
}
/**
 * Merges all layers in parallel
 */

export function all(...ls) {
  return new LayerAllPar(ls);
}
/**
 * Merges all layers sequentially
 */

export function allSeq(...ls) {
  return new LayerAllSeq(ls);
}
/**
 * Type level bound to make sure a layer is complete
 */

export function main(layer) {
  return layer;
}
/**
 * Converts a layer to a managed runtime
 */

export function toRuntime(_) {
  return M.chain_(build(_), a => M.fromEffect(T.checkPlatform(platform => T.succeedWith(() => T.makeCustomRuntime(a, platform)))));
}
/**
 * Creates a fresh version of this layer that will not be shared.
 */

export function fresh(layer) {
  return new LayerFresh(layer);
}
/**
 * Returns a new layer whose output is mapped by the specified function.
 */

export function map(f) {
  return fa => map_(fa, f);
}
/**
 * Maps the output of the layer using f
 */

export function map_(fa, f) {
  return new LayerMap(fa, f);
}
/**
 * Chains the output of the layer using f
 */

export function chain(f) {
  return fa => chain_(fa, f);
}
/**
 * Chains the output of the layer using f
 */

export function chain_(fa, f) {
  return new LayerChain(fa, f);
}
/**
 * Flatten `Layer< R, E, Layer< R2, E2, A>>`
 */

export function flatten(ffa) {
  return chain_(ffa, idFn);
}
/**
 * Restrict output to only contain the specified services
 */

export function restrict(...ts) {
  return self => compose_(self, fromRawEffect(T.accessServicesT(...ts)((...servises) => servises.map((s, i) => ({
    [ts[i].key]: s
  })).reduce((x, y) => ({ ...x,
    ...y
  })))));
}
/**
 * Builds this layer and uses it until it is interrupted. This is useful when
 * your entire application is a layer, such as an HTTP server.
 */

export function launch(self) {
  return M.useForever(build(self));
}
/**
 * Recovers from all errors.
 */

export function catchAll(handler) {
  return self => {
    return fold(self)(fromRawFunctionM(({
      tuple: [r, cause]
    }) => E.fold_(C.failureOrCause(cause), e => T.succeed(Tp.tuple(r, e)), c => T.halt(c)))[">=>"](handler))(fromRawEffect(T.environment()));
  };
}
/**
 * A layer that passes along the first element of a tuple.
 */

export function first() {
  return fromRawFunction(_ => _.get(0));
}
/**
 * A layer that passes along the second element of a tuple.
 */

export function second() {
  return fromRawFunction(_ => _.get(1));
}
/**
 * Returns a layer with its error channel mapped using the specified
 * function.
 */

export function mapError(f) {
  return catchAll(fromRawFunctionM(_ => T.fail(f(_.get(1)))));
}
/**
 * Translates effect failure into death of the fiber, making all failures
 * unchecked and not a part of the type of the layer.
 */

export function orDie(self) {
  return catchAll(fromRawFunctionM(_ => T.die(_.get(1))))(self);
}
/**
 * Executes this layer and returns its output, if it succeeds, but otherwise
 * executes the specified layer.
 */

export function orElse(that) {
  return catchAll(first()[">=>"](that));
}

function retryLoop(self) {
  const update = fromRawFunctionM(({
    tuple: [{
      tuple: [r, s]
    }, e]
  }) => T.provideAll_(T.chain_(T.orDie(CL.currentTime), now => T.chain_(s(now, e), result => {
    if (result._tag === "Done") {
      return T.fail(e);
    } else {
      return T.as_(CL.sleep(Math.abs(now - result.interval)), Tp.tuple(r, result.next));
    }
  })), r));
  return catchAll(update[">=>"](suspend(() => fresh(retryLoop(self)))))(first()[">=>"](self));
}
/**
 * Retries constructing this layer according to the specified schedule.
 */


export function retry(self, schedule) {
  return zipPar_(identity(), fromRawEffect(T.succeed(schedule.step)))[">=>"](retryLoop(self));
}
//# sourceMappingURL=core.mjs.map