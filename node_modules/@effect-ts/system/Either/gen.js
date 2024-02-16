"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenEither = void 0;
exports.gen = gen;

var _commons = /*#__PURE__*/require("../Effect/commons.js");

var _index = /*#__PURE__*/require("../GlobalExceptions/index.js");

var Utils = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Utils/index.js"));

var _core = /*#__PURE__*/require("./core.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class GenEither {
  constructor(effect) {
    this.effect = effect;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}

exports.GenEither = GenEither;

function adapter(_, __) {
  return Utils.isOption(_) ? new GenEither(_._tag === "Some" ? (0, _core.right)(_.value) : (0, _core.left)(__ ? __() : new _index.NoSuchElementException())) : new GenEither(_);
}

function gen(f) {
  const iterator = f(adapter);
  const state = iterator.next();

  function run(state) {
    if (state.done) {
      return (0, _core.right)(state.value);
    }

    return (0, _core.chain_)(state.value["effect"], val => {
      const next = iterator.next(val);
      return run(next);
    });
  }

  return run(state);
}
//# sourceMappingURL=gen.js.map