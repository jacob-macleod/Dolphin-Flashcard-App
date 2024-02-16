"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenManaged = void 0;
exports.gen = gen;

var _fromEither = /*#__PURE__*/require("../../Effect/fromEither.js");

var _getOrFail = /*#__PURE__*/require("../../Effect/getOrFail.js");

var _index = /*#__PURE__*/require("../../Effect/index.js");

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var _index3 = /*#__PURE__*/require("../../Utils/index.js");

var _core = /*#__PURE__*/require("../core.js");

var _fromEffect = /*#__PURE__*/require("../fromEffect.js");

var _managed = /*#__PURE__*/require("../managed.js");

var _succeed = /*#__PURE__*/require("../succeed.js");

var _suspend = /*#__PURE__*/require("./suspend.js");

class GenManaged {
  constructor(effect, trace) {
    this.effect = effect;
    this.trace = trace;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}

exports.GenManaged = GenManaged;

const adapter = (_, __, ___) => {
  if ((0, _index3.isTag)(_)) {
    return new GenManaged((0, _fromEffect.fromEffect)((0, _index.accessService)(_)(_index2.identity)), __);
  }

  if ((0, _index3.isEither)(_)) {
    return new GenManaged((0, _fromEffect.fromEffect)((0, _fromEither.fromEither)(() => _)), __);
  }

  if ((0, _index3.isOption)(_)) {
    if (typeof __ === "function") {
      return new GenManaged(__ ? _._tag === "None" ? (0, _core.fail)(__()) : (0, _succeed.succeed)(_.value) : (0, _fromEffect.fromEffect)((0, _getOrFail.getOrFail)(_)), ___);
    }

    return new GenManaged((0, _fromEffect.fromEffect)((0, _getOrFail.getOrFail)(_)), __);
  }

  if (_ instanceof _managed.ManagedImpl) {
    return new GenManaged(_, __);
  }

  return new GenManaged((0, _fromEffect.fromEffect)(_), __);
};

function gen(f) {
  return (0, _suspend.suspend)(() => {
    const iterator = f(adapter);
    const state = iterator.next();

    function run(state) {
      if (state.done) {
        return (0, _succeed.succeed)(state.value);
      }

      return (0, _core.chain_)((0, _suspend.suspend)(() => state.value["effect"], state.value.trace), val => {
        const next = iterator.next(val);
        return run(next);
      });
    }

    return run(state);
  });
}
//# sourceMappingURL=gen.js.map