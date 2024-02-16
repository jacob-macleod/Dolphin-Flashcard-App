"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Monad = exports.ForEach = exports.Foldable = exports.Applicative = void 0;
exports.ap = ap;
exports.apFirst = apFirst;
exports.apFirst_ = apFirst_;
exports.apSecond = apSecond;
exports.apSecond_ = apSecond_;
exports.ap_ = ap_;
exports.bind = void 0;
exports.chain = chain;
exports.chain_ = chain_;
exports.do = void 0;
exports.drawForest = drawForest;
exports.drawTree = drawTree;
exports.duplicate = duplicate;
exports.elem = elem;
exports.elem_ = elem_;
exports.extend = extend;
exports.extend_ = extend_;
exports.extract = extract;
exports.flatten = flatten;
exports.fold = fold;
exports.foldMap = foldMap;
exports.foldMap_ = foldMap_;
exports.gen = exports.forEachF = void 0;
exports.getEqual = getEqual;
exports.getShow = getShow;
exports.if_ = exports.if = void 0;
exports.make = make;
exports.map = map;
exports.map_ = map_;
exports.matchTagIn = exports.matchTag = exports.matchMorph = exports.matchIn = exports.match = void 0;
exports.of = of;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.reduceRight_ = reduceRight_;
exports.reduce_ = reduce_;
exports.struct = exports.sequence = void 0;
exports.tap = tap;
exports.tap_ = tap_;
exports.tuple = void 0;
exports.unfoldForest = unfoldForest;
exports.unfoldForestM = unfoldForestM;
exports.unfoldForestSafe = unfoldForestSafe;
exports.unfoldTree = unfoldTree;
exports.unfoldTreeM = unfoldTreeM;
exports.unfoldTreeSafe = unfoldTreeSafe;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Array/index.js"));

var _index2 = /*#__PURE__*/require("../Equal/index.js");

var _index3 = /*#__PURE__*/require("../Function/index.js");

var IO = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../IO/index.js"));

var DSL = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Prelude/DSL/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Prelude/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/* adapted from https://github.com/gcanti/fp-ts */

/**
 * Multi-way trees (aka rose trees) and forests, where a forest is
 *
 * ```ts
 * type Forest<A> = Array<Tree<A>>
 * ```
 */
function make(value, forest = A.empty()) {
  return {
    value,
    forest
  };
}

function getShow(S) {
  function showSafe(t) {
    if (t.forest === A.empty() || t.forest.length === 0) {
      return IO.succeed(`make(${S.show(t.value)})`);
    }

    return IO.map_(IO.forEachArray(showSafe)(t.forest), forest => `make(${S.show(t.value)}, [${forest.join(", ")}])`);
  }

  return {
    show: x => IO.run(showSafe(x))
  };
}

function getEqual(E) {
  function equalsForestSafe(x, y, i = 0) {
    if (i === x.length) {
      return IO.succeed(true);
    }

    return IO.chain_(IO.suspend(() => equalsSafe(x[i], y[i])), b => b ? equalsForestSafe(x, y, i + 1) : IO.succeed(false));
  }

  function equalsSafe(x, y) {
    return !E.equals(x.value, y.value) ? IO.succeed(false) : x.forest.length !== y.forest.length ? IO.succeed(false) : equalsForestSafe(x.forest, y.forest);
  }

  return (0, _index2.makeEqual)((x, y) => IO.run(equalsSafe(x, y)));
}

function draw(indentation, forest) {
  return IO.gen(function* (_) {
    let r = "";
    const len = forest.length;
    let tree;

    for (let i = 0; i < len; i++) {
      tree = forest[i];
      const isLast = i === len - 1;
      r += indentation + (isLast ? "└" : "├") + "─ " + tree.value;
      r += yield* _(draw(indentation + (len > 1 && !isLast ? "│  " : "   "), tree.forest));
    }

    return r;
  });
}
/**
 * Neat 2-dimensional drawing of a forest
 */


function drawForest(forest) {
  return IO.run(draw("\n", forest));
}
/**
 * Neat 2-dimensional drawing of a tree
 */


function drawTree(tree) {
  return tree.value + drawForest(tree.forest);
}
/**
 * Build a tree from a seed value
 */


function unfoldTree(b, f) {
  return IO.run(unfoldTreeSafe(b, f));
}
/**
 * Build a tree from a seed value
 */


function unfoldTreeSafe(b, f) {
  const [a, bs] = f(b);
  return IO.map_(IO.suspend(() => unfoldForestSafe(bs, f)), forest => ({
    value: a,
    forest
  }));
}
/**
 * Build a tree from a seed value
 */


function unfoldForest(bs, f) {
  return IO.run(unfoldForestSafe(bs, f));
}
/**
 * Build a tree from a seed value
 */


function unfoldForestSafe(bs, f) {
  return IO.forEachArray(b => unfoldTreeSafe(b, f))(bs);
}

function unfoldTreeM(M) {
  const unfoldForestMM = unfoldForestM(M);
  const chain = DSL.chainF(M);
  const succeed = DSL.succeedF(M);
  return (b, f) => chain(([a, bs]) => chain(ts => succeed({
    value: a,
    forest: ts
  }))(unfoldForestMM(bs, f)))(f(b));
}

function unfoldForestM(M) {
  const traverseM = A.forEachF(M);
  return (bs, f) => traverseM(b => unfoldTreeM(M)(b, f))(bs);
}

function elem_(E) {
  function goForest(forest, a, i = 0) {
    if (i === forest.length) {
      return IO.succeed(false);
    }

    return IO.chain_(IO.suspend(() => go(forest[i], a)), b => b ? IO.succeed(true) : goForest(forest, a, i + 1));
  }

  function go(fa, a) {
    if (E.equals(a, fa.value)) {
      return IO.succeed(true);
    }

    return IO.suspend(() => goForest(fa.forest, a));
  }

  return (fa, a) => IO.run(go(fa, a));
}

function elem(E) {
  const el = elem_(E);
  return a => fa => el(fa, a);
}
/**
 * Fold a tree into a "summary" value in depth-first order.
 *
 * For each node in the tree, apply `f` to the `value` and the result of applying `f` to each `forest`.
 *
 * This is also known as the catamorphism on trees.
 */


function fold(f) {
  function go(tree) {
    return IO.map_(IO.forEachArray(go)(tree.forest), bs => f(tree.value, bs));
  }

  return tree => IO.run(go(tree));
}

function map_(fa, f) {
  function go(node) {
    return IO.map_(IO.forEachArray(go)(node.forest), forest => ({
      value: f(node.value),
      forest
    }));
  }

  return IO.run(go(fa));
}

function of(a) {
  return {
    value: a,
    forest: A.empty()
  };
}

function ap_(fab, fa) {
  return chain_(fab, f => map_(fa, f));
}

function chain_(fa, f) {
  function go(node) {
    const {
      forest,
      value
    } = f(node.value);
    return IO.map_(IO.forEachArray(go)(node.forest), x => ({
      value,
      forest: [...forest, ...x]
    }));
  }

  return IO.run(go(fa));
}

function reduce_(fa, b, f) {
  function go(node, b) {
    return IO.gen(function* (_) {
      let r = f(b, node.value);
      const len = fa.forest.length;

      for (let i = 0; i < len; i++) {
        r = yield* _(go(node.forest[i], r));
      }

      return r;
    });
  }

  return IO.run(go(fa, b));
}

function foldMap_(M) {
  return (fa, f) => reduce_(fa, M.identity, (acc, a) => M.combine(acc, f(a)));
}

function reduceRight_(fa, b, f) {
  function go(node, b) {
    return IO.gen(function* (_) {
      let r = b;
      const len = node.forest.length;

      for (let i = len - 1; i >= 0; i--) {
        r = yield* _(go(node.forest[i], r));
      }

      return f(node.value, r);
    });
  }

  return IO.run(go(fa, b));
}

const forEachF = /*#__PURE__*/P.implementForEachF()(_ => G => {
  const traverseF = A.forEachF(G);

  const r = f => ta => DSL.apF(G)(traverseF(t => r(f)(t))(ta.forest))(G.map(value => forest => ({
    value,
    forest
  }))(f(ta.value)));

  return r;
});
exports.forEachF = forEachF;
const ForEach = {
  forEachF,
  map
};
exports.ForEach = ForEach;
const sequence = /*#__PURE__*/(0, P.sequenceF)(ForEach);
exports.sequence = sequence;

function extract(wa) {
  return wa.value;
}

function extend_(wa, f) {
  function go(node) {
    return IO.map_(IO.forEachArray(go)(node.forest), forest => ({
      value: f(node),
      forest
    }));
  }

  return IO.run(go(wa));
}

function extend(f) {
  return ma => extend_(ma, f);
}

function ap(fa) {
  return fab => ap_(fab, fa);
}

function apFirst(fb) {
  return fa => ap_(map_(fa, a => () => a), fb);
}

function apFirst_(fa, fb) {
  return ap_(map_(fa, a => () => a), fb);
}

function apSecond(fb) {
  return fa => ap_(map_(fa, () => b => b), fb);
}

function apSecond_(fa, fb) {
  return ap_(map_(fa, () => b => b), fb);
}

function chain(f) {
  return ma => chain_(ma, f);
}

function tap(f) {
  return ma => chain_(ma, x => map_(f(x), () => x));
}

function tap_(ma, f) {
  return chain_(ma, x => map_(f(x), () => x));
}

function duplicate(ma) {
  return extend_(ma, x => x);
}

function flatten(mma) {
  return chain_(mma, x => x);
}

function foldMap(M) {
  return f => fa => foldMap_(M)(fa, f);
}

function map(f) {
  return fa => map_(fa, f);
}

function reduce(b, f) {
  return fa => reduce_(fa, b, f);
}

function reduceRight(b, f) {
  return fa => reduceRight_(fa, b, f);
}

const Foldable = {
  foldMap,
  reduce,
  reduceRight
};
exports.Foldable = Foldable;
const Monad = {
  any: () => of({}),
  flatten,
  map
};
exports.Monad = Monad;
const Applicative = /*#__PURE__*/(0, DSL.getApplicativeF)(Monad);
exports.Applicative = Applicative;
const gen = /*#__PURE__*/DSL.genF(Monad);
exports.gen = gen;
const bind = /*#__PURE__*/DSL.bindF(Monad);
exports.bind = bind;
const do_ = /*#__PURE__*/DSL.doF(Monad);
exports.do = do_;
const struct = /*#__PURE__*/DSL.structF(Applicative);
exports.struct = struct;
const tuple = /*#__PURE__*/DSL.tupleF(Applicative);
/**
 * Matchers
 */

exports.tuple = tuple;
const {
  match,
  matchIn,
  matchMorph,
  matchTag,
  matchTagIn
} = /*#__PURE__*/DSL.matchers(Monad);
/**
 * Conditionals
 */

exports.matchTagIn = matchTagIn;
exports.matchTag = matchTag;
exports.matchMorph = matchMorph;
exports.matchIn = matchIn;
exports.match = match;
const branch = /*#__PURE__*/DSL.conditionalF(Monad);
exports.if = branch;
const branch_ = /*#__PURE__*/DSL.conditionalF_(Monad);
exports.if_ = branch_;
//# sourceMappingURL=core.js.map