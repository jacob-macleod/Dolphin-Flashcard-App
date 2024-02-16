"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenStream = void 0;
exports.gen = gen;

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/List/index.js"));

var _index2 = /*#__PURE__*/require("../../GlobalExceptions/index.js");

var _index3 = /*#__PURE__*/require("../../Utils/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var _chain = /*#__PURE__*/require("./chain.js");

var _definitions = /*#__PURE__*/require("./definitions.js");

var _fail = /*#__PURE__*/require("./fail.js");

var _fromEffect = /*#__PURE__*/require("./fromEffect.js");

var _succeed = /*#__PURE__*/require("./succeed.js");

var _suspend = /*#__PURE__*/require("./suspend.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class GenStream {
  constructor(effect) {
    this.effect = effect;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}

exports.GenStream = GenStream;

const adapter = (_, __) => {
  return new GenStream(() => {
    const x = _();

    if ((0, _index3.isOption)(x)) {
      return x._tag === "None" ? (0, _fail.fail)(__ ? __() : new _index2.NoSuchElementException()) : (0, _succeed.succeed)(x.value);
    } else if ((0, _index3.isEither)(x)) {
      return (0, _fromEffect.fromEffect)(T.fromEither(() => x));
    } else if (x instanceof _definitions.Stream) {
      return x;
    } else if ((0, _index3.isTag)(x)) {
      return (0, _fromEffect.fromEffect)(T.service(x));
    }

    return (0, _fromEffect.fromEffect)(x);
  });
};

function gen(...args) {
  function gen_(f) {
    return (0, _suspend.suspend)(() => {
      function run(replayStack) {
        const iterator = f(adapter);
        let state = iterator.next();

        for (const a of replayStack) {
          if (state.done) {
            return (0, _fromEffect.fromEffect)(T.die(new _index2.PrematureGeneratorExit()));
          }

          state = iterator.next(a);
        }

        if (state.done) {
          return (0, _succeed.succeed)(state.value);
        }

        return (0, _chain.chain_)(state.value["effect"](), val => {
          return run(L.append_(replayStack, val));
        });
      }

      return run(L.empty());
    });
  }

  if (args.length === 0) {
    return f => gen_(f);
  }

  return gen_(args[0]);
}
//# sourceMappingURL=gen.js.map