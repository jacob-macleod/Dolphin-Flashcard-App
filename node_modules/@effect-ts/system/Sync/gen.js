"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenSync = void 0;
exports.gen = gen;

var _commons = /*#__PURE__*/require("../Effect/commons.js");

var _index = /*#__PURE__*/require("../Function/index.js");

var _index2 = /*#__PURE__*/require("../GlobalExceptions/index.js");

var _index3 = /*#__PURE__*/require("../Utils/index.js");

var _core = /*#__PURE__*/require("./core.js");

var _has = /*#__PURE__*/require("./has.js");

// ets_tracing: off

/**
 * inspired by https://github.com/tusharmath/qio/pull/22 (revised)
 */
class GenSync {
  constructor(effect) {
    this.effect = effect;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}

exports.GenSync = GenSync;

const adapter = (_, __) => {
  if ((0, _index3.isTag)(_)) {
    return new GenSync((0, _has.accessService)(_)(_index.identity));
  }

  if ((0, _index3.isEither)(_)) {
    return new GenSync(_._tag === "Left" ? (0, _core.fail)(_.left) : (0, _core.succeed)(_.right));
  }

  if ((0, _index3.isOption)(_)) {
    return new GenSync(_._tag === "None" ? (0, _core.fail)(__ ? __() : new _index2.NoSuchElementException()) : (0, _core.succeed)(_.value));
  }

  return new GenSync(_);
};

function gen(f) {
  return (0, _core.suspend)(() => {
    const iterator = f(adapter);
    const state = iterator.next();

    function run(state) {
      if (state.done) {
        return (0, _core.succeed)(state.value);
      }

      return (0, _core.chain_)(state.value["effect"], val => {
        const next = iterator.next(val);
        return run(next);
      });
    }

    return run(state);
  });
}
//# sourceMappingURL=gen.js.map