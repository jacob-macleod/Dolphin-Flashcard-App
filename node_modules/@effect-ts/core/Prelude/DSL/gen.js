"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenLazyHKT = exports.GenHKT = void 0;
exports.genF = genF;
exports.genWithHistoryF = genWithHistoryF;

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Collections/Immutable/List"));

var _GlobalExceptions = /*#__PURE__*/require("@effect-ts/system/GlobalExceptions");

var _index = /*#__PURE__*/require("../../Function/index.js");

var _chain = /*#__PURE__*/require("./chain.js");

var _succeed = /*#__PURE__*/require("./succeed.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class GenHKT {
  constructor(effect) {
    this.effect = effect;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}

exports.GenHKT = GenHKT;

class GenLazyHKT {
  constructor(effect) {
    this.effect = effect;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}

exports.GenLazyHKT = GenLazyHKT;

const adapter = _ => {
  return new GenHKT(_);
};

const adapterLazy = _ => {
  return new GenHKT(_);
};

function genWithHistoryF(F, config) {
  const chain = (0, _chain.chainF)(F);
  const succeed = (0, _succeed.succeedF)(F);
  return f => {
    return chain(() => {
      function run(replayStack) {
        const iterator = f((config === null || config === void 0 ? void 0 : config.adapter) ? config.adapter : adapterLazy);
        let state = iterator.next();

        for (const a of replayStack) {
          if (state.done) {
            throw new _GlobalExceptions.PrematureGeneratorExit();
          }

          state = iterator.next(a);
        }

        if (state.done) {
          return succeed(state.value);
        }

        return chain(val => {
          return run(L.append_(replayStack, val));
        })(state.value["effect"]());
      }

      return run(L.empty());
    })(succeed({}));
  };
}

function genF(F, config) {
  const chain = (0, _chain.chainF)(F);
  const succeed = (0, _succeed.succeedF)(F);
  return f => {
    return chain(() => {
      const iterator = f((config === null || config === void 0 ? void 0 : config.adapter) ? config.adapter : adapter);
      const state = iterator.next();

      function run(state) {
        if (state.done) {
          return succeed(state.value);
        }

        return chain(val => {
          const next = iterator.next(val);
          return run(next);
        })(state.value["effect"]);
      }

      return run(state);
    })(succeed({}));
  };
}
//# sourceMappingURL=gen.js.map