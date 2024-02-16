"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenEffect = void 0;
exports.gen = gen;
exports.genM = genM;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var _managed = /*#__PURE__*/require("../Managed/managed.js");

var _makeReleaseMap = /*#__PURE__*/require("../Managed/ReleaseMap/makeReleaseMap.js");

var _releaseAll = /*#__PURE__*/require("../Managed/ReleaseMap/releaseAll.js");

var Utils = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Utils/index.js"));

var _bracketExit = /*#__PURE__*/require("./bracketExit.js");

var _commons = /*#__PURE__*/require("./commons.js");

var _core = /*#__PURE__*/require("./core.js");

var _ExecutionStrategy = /*#__PURE__*/require("./ExecutionStrategy.js");

var _fail = /*#__PURE__*/require("./fail.js");

var _fromEither = /*#__PURE__*/require("./fromEither.js");

var _getOrFail = /*#__PURE__*/require("./getOrFail.js");

var _has = /*#__PURE__*/require("./has.js");

var _map = /*#__PURE__*/require("./map.js");

var _provideSome = /*#__PURE__*/require("./provideSome.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * inspired by https://github.com/tusharmath/qio/pull/22 (revised)
 */
class GenEffect {
  constructor(effect, trace) {
    this.effect = effect;
    this.trace = trace;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}

exports.GenEffect = GenEffect;

function adapter(_, __, ___) {
  if (Utils.isEither(_)) {
    return new GenEffect((0, _fromEither.fromEither)(() => _), __);
  }

  if (Utils.isOption(_)) {
    if (__ && typeof __ === "function") {
      return new GenEffect(_._tag === "None" ? (0, _fail.fail)(__()) : (0, _core.succeed)(_.value), ___);
    }

    return new GenEffect((0, _getOrFail.getOrFail)(_), __);
  }

  if (Utils.isTag(_)) {
    return new GenEffect((0, _has.service)(_), __);
  }

  return new GenEffect(_, __);
}

function genM(f, __trace) {
  return (0, _core.suspend)(() => {
    const iterator = f(adapter);
    const state = iterator.next();

    function run(rm, state) {
      if (state.done) {
        return (0, _core.succeed)(state.value);
      }

      return (0, _core.chain_)((0, _core.suspend)(() => state.value.trace ? state.value["effect"] instanceof _managed.ManagedImpl ? (0, _map.map_)((0, _provideSome.provideSome_)(state.value["effect"]["effect"], r0 => Tp.tuple(r0, rm)), _ => _.get(1)) : state.value["effect"] : state.value["effect"] instanceof _managed.ManagedImpl ? (0, _map.map_)((0, _provideSome.provideSome_)(state.value["effect"]["effect"], r0 => Tp.tuple(r0, rm)), _ => _.get(1)) : state.value["effect"], state.value.trace), val => {
        const next = iterator.next(val);
        return run(rm, next);
      });
    }

    return (0, _core.chain_)(_makeReleaseMap.makeReleaseMap, rm => (0, _bracketExit.bracketExit_)(_core.unit, () => run(rm, state), (_, e) => (0, _releaseAll.releaseAll)(e, _ExecutionStrategy.sequential)(rm)));
  }, __trace);
}

function gen(f, __trace) {
  return (0, _core.suspend)(() => {
    const iterator = f(adapter);
    const state = iterator.next();

    function run(state) {
      if (state.done) {
        return (0, _core.succeed)(state.value);
      }

      return (0, _core.chain_)((0, _core.suspend)(() => state.value["effect"], state.value.trace), val => run(iterator.next(val)));
    }

    return run(state);
  }, __trace);
}
//# sourceMappingURL=gen.js.map