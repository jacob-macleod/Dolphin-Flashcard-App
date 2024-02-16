"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  suspend: true,
  zipWithPar_: true,
  fail: true,
  succeed: true,
  zipWithPar: true,
  zipPar_: true,
  zipPar: true,
  fromValue: true,
  fromEffect: true,
  fromEffect_: true,
  fromManaged: true,
  fromManaged_: true,
  fromFunction: true,
  zip_: true,
  zip: true,
  andSeq: true,
  andSeq_: true,
  all: true,
  allSeq: true,
  main: true,
  toRuntime: true,
  fresh: true,
  map: true,
  map_: true,
  chain: true,
  chain_: true,
  flatten: true,
  restrict: true,
  launch: true,
  catchAll: true,
  first: true,
  second: true,
  mapError: true,
  orDie: true,
  orElse: true,
  retry: true
};
exports.all = all;
exports.allSeq = allSeq;
exports.andSeq = andSeq;
exports.andSeq_ = andSeq_;
exports.catchAll = catchAll;
exports.chain = chain;
exports.chain_ = chain_;
exports.fail = fail;
exports.first = first;
exports.flatten = flatten;
exports.fresh = fresh;
exports.fromEffect = fromEffect;
exports.fromEffect_ = fromEffect_;
exports.fromFunction = fromFunction;
exports.fromManaged = fromManaged;
exports.fromManaged_ = fromManaged_;
exports.fromValue = fromValue;
exports.launch = launch;
exports.main = main;
exports.map = map;
exports.mapError = mapError;
exports.map_ = map_;
exports.orDie = orDie;
exports.orElse = orElse;
exports.restrict = restrict;
exports.retry = retry;
exports.second = second;
exports.succeed = succeed;
exports.suspend = suspend;
exports.toRuntime = toRuntime;
exports.zip = zip;
exports.zipPar = zipPar;
exports.zipPar_ = zipPar_;
exports.zipWithPar = zipWithPar;
exports.zipWithPar_ = zipWithPar_;
exports.zip_ = zip_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Cause/index.js"));

var CL = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Clock/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _index5 = /*#__PURE__*/require("../Function/index.js");

var _definitions = /*#__PURE__*/require("./definitions.js");

Object.keys(_definitions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _definitions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _definitions[key];
    }
  });
});

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./deps-effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./deps-managed.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Lazily constructs a layer. This is useful to avoid infinite recursion when
 * creating layers that refer to themselves.
 */
function suspend(f) {
  return new _definitions.LayerSuspend(f);
}
/**
 * Combines this layer with the specified layer, producing a new layer that
 * has the inputs of both layers, and the outputs of both layers combined
 * using the specified function.
 */


function zipWithPar_(self, that, f) {
  return new _definitions.LayerZipWithPar(self, that, f);
}
/**
 * Constructs a layer that fails with the specified value.
 */


function fail(e) {
  return (0, _definitions.fromRawManaged)(M.fail(e));
}
/**
 * Constructs a layer from the specified value.
 */


function succeed(resource) {
  return (0, _definitions.fromRawManaged)(M.succeed(resource));
}
/**
 * Combines this layer with the specified layer, producing a new layer that
 * has the inputs of both layers, and the outputs of both layers combined
 * using the specified function.
 */


function zipWithPar(that, f) {
  return self => zipWithPar_(self, that, f);
}
/**
 * Combines this layer with the specified layer, producing a new layer that
 * has the inputs of both layers, and the outputs of both layers combined
 * into a tuple.
 */


function zipPar_(self, that) {
  return zipWithPar_(self, that, Tp.tuple);
}
/**
 * Combines this layer with the specified layer, producing a new layer that
 * has the inputs of both layers, and the outputs of both layers combined
 * into a tuple.
 */


function zipPar(that) {
  return self => zipPar_(self, that);
}
/**
 * Construct a service layer from a value
 */


function fromValue(has) {
  return resource => new _definitions.LayerManaged(M.fromEffect(T.succeed(has.has(resource)))).setKey(has.key);
}
/**
 * Constructs a layer from the specified effect.
 *
 * @ets_data_first fromEffect_
 */


function fromEffect(has) {
  return resource => fromEffect_(resource, has);
}
/**
 * Constructs a layer from the specified effect.
 */


function fromEffect_(resource, has) {
  return new _definitions.LayerManaged(M.map_(M.fromEffect(resource), has.has)).setKey(has.key);
}
/**
 * Constructs a layer from a managed resource.
 */


function fromManaged(has) {
  return resource => new _definitions.LayerManaged(M.map_(resource, has.has)).setKey(has.key);
}
/**
 * Constructs a layer from a managed resource.
 */


function fromManaged_(resource, has) {
  return new _definitions.LayerManaged(M.map_(resource, has.has)).setKey(has.key);
}
/**
 * Constructs a layer from the environment using the specified function.
 */


function fromFunction(tag) {
  return f => fromEffect(tag)(T.access(f));
}
/**
 * Zips layers together
 */


function zip_(self, that) {
  return new _definitions.LayerZipWithSeq(self, that, Tp.tuple);
}
/**
 * Zips layers together
 */


function zip(right) {
  return left => zip_(left, right);
}
/**
 * Merges layers sequentially
 */


function andSeq(that) {
  return self => andSeq_(self, that);
}
/**
 * Merges layers sequentially
 */


function andSeq_(self, that) {
  return new _definitions.LayerZipWithSeq(self, that, (l, r) => ({ ...l,
    ...r
  }));
}
/**
 * Merges all layers in parallel
 */


function all(...ls) {
  return new _definitions.LayerAllPar(ls);
}
/**
 * Merges all layers sequentially
 */


function allSeq(...ls) {
  return new _definitions.LayerAllSeq(ls);
}
/**
 * Type level bound to make sure a layer is complete
 */


function main(layer) {
  return layer;
}
/**
 * Converts a layer to a managed runtime
 */


function toRuntime(_) {
  return M.chain_((0, _definitions.build)(_), a => M.fromEffect(T.checkPlatform(platform => T.succeedWith(() => T.makeCustomRuntime(a, platform)))));
}
/**
 * Creates a fresh version of this layer that will not be shared.
 */


function fresh(layer) {
  return new _definitions.LayerFresh(layer);
}
/**
 * Returns a new layer whose output is mapped by the specified function.
 */


function map(f) {
  return fa => map_(fa, f);
}
/**
 * Maps the output of the layer using f
 */


function map_(fa, f) {
  return new _definitions.LayerMap(fa, f);
}
/**
 * Chains the output of the layer using f
 */


function chain(f) {
  return fa => chain_(fa, f);
}
/**
 * Chains the output of the layer using f
 */


function chain_(fa, f) {
  return new _definitions.LayerChain(fa, f);
}
/**
 * Flatten `Layer< R, E, Layer< R2, E2, A>>`
 */


function flatten(ffa) {
  return chain_(ffa, _index5.identity);
}
/**
 * Restrict output to only contain the specified services
 */


function restrict(...ts) {
  return self => (0, _definitions.compose_)(self, (0, _definitions.fromRawEffect)(T.accessServicesT(...ts)((...servises) => servises.map((s, i) => ({
    [ts[i].key]: s
  })).reduce((x, y) => ({ ...x,
    ...y
  })))));
}
/**
 * Builds this layer and uses it until it is interrupted. This is useful when
 * your entire application is a layer, such as an HTTP server.
 */


function launch(self) {
  return M.useForever((0, _definitions.build)(self));
}
/**
 * Recovers from all errors.
 */


function catchAll(handler) {
  return self => {
    return (0, _definitions.fold)(self)((0, _definitions.fromRawFunctionM)(({
      tuple: [r, cause]
    }) => E.fold_(C.failureOrCause(cause), e => T.succeed(Tp.tuple(r, e)), c => T.halt(c)))[">=>"](handler))((0, _definitions.fromRawEffect)(T.environment()));
  };
}
/**
 * A layer that passes along the first element of a tuple.
 */


function first() {
  return (0, _definitions.fromRawFunction)(_ => _.get(0));
}
/**
 * A layer that passes along the second element of a tuple.
 */


function second() {
  return (0, _definitions.fromRawFunction)(_ => _.get(1));
}
/**
 * Returns a layer with its error channel mapped using the specified
 * function.
 */


function mapError(f) {
  return catchAll((0, _definitions.fromRawFunctionM)(_ => T.fail(f(_.get(1)))));
}
/**
 * Translates effect failure into death of the fiber, making all failures
 * unchecked and not a part of the type of the layer.
 */


function orDie(self) {
  return catchAll((0, _definitions.fromRawFunctionM)(_ => T.die(_.get(1))))(self);
}
/**
 * Executes this layer and returns its output, if it succeeds, but otherwise
 * executes the specified layer.
 */


function orElse(that) {
  return catchAll(first()[">=>"](that));
}

function retryLoop(self) {
  const update = (0, _definitions.fromRawFunctionM)(({
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


function retry(self, schedule) {
  return zipPar_((0, _definitions.identity)(), (0, _definitions.fromRawEffect)(T.succeed(schedule.step)))[">=>"](retryLoop(self));
}
//# sourceMappingURL=core.js.map