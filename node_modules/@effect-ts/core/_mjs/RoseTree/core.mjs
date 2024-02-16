// ets_tracing: off

/* adapted from https://github.com/gcanti/fp-ts */

/**
 * Multi-way trees (aka rose trees) and forests, where a forest is
 *
 * ```ts
 * type Forest<A> = Array<Tree<A>>
 * ```
 */
import * as A from "../Collections/Immutable/Array/index.mjs";
import { makeEqual } from "../Equal/index.mjs";
import { pipe } from "../Function/index.mjs";
import * as IO from "../IO/index.mjs";
import * as DSL from "../Prelude/DSL/index.mjs";
import { getApplicativeF } from "../Prelude/DSL/index.mjs";
import * as P from "../Prelude/index.mjs";
import { sequenceF } from "../Prelude/index.mjs";
export function make(value, forest = A.empty()) {
  return {
    value,
    forest
  };
}
export function getShow(S) {
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
export function getEqual(E) {
  function equalsForestSafe(x, y, i = 0) {
    if (i === x.length) {
      return IO.succeed(true);
    }

    return IO.chain_(IO.suspend(() => equalsSafe(x[i], y[i])), b => b ? equalsForestSafe(x, y, i + 1) : IO.succeed(false));
  }

  function equalsSafe(x, y) {
    return !E.equals(x.value, y.value) ? IO.succeed(false) : x.forest.length !== y.forest.length ? IO.succeed(false) : equalsForestSafe(x.forest, y.forest);
  }

  return makeEqual((x, y) => IO.run(equalsSafe(x, y)));
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


export function drawForest(forest) {
  return IO.run(draw("\n", forest));
}
/**
 * Neat 2-dimensional drawing of a tree
 */

export function drawTree(tree) {
  return tree.value + drawForest(tree.forest);
}
/**
 * Build a tree from a seed value
 */

export function unfoldTree(b, f) {
  return IO.run(unfoldTreeSafe(b, f));
}
/**
 * Build a tree from a seed value
 */

export function unfoldTreeSafe(b, f) {
  const [a, bs] = f(b);
  return IO.map_(IO.suspend(() => unfoldForestSafe(bs, f)), forest => ({
    value: a,
    forest
  }));
}
/**
 * Build a tree from a seed value
 */

export function unfoldForest(bs, f) {
  return IO.run(unfoldForestSafe(bs, f));
}
/**
 * Build a tree from a seed value
 */

export function unfoldForestSafe(bs, f) {
  return IO.forEachArray(b => unfoldTreeSafe(b, f))(bs);
}
export function unfoldTreeM(M) {
  const unfoldForestMM = unfoldForestM(M);
  const chain = DSL.chainF(M);
  const succeed = DSL.succeedF(M);
  return (b, f) => chain(([a, bs]) => chain(ts => succeed({
    value: a,
    forest: ts
  }))(unfoldForestMM(bs, f)))(f(b));
}
export function unfoldForestM(M) {
  const traverseM = A.forEachF(M);
  return (bs, f) => traverseM(b => unfoldTreeM(M)(b, f))(bs);
}
export function elem_(E) {
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
export function elem(E) {
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

export function fold(f) {
  function go(tree) {
    return IO.map_(IO.forEachArray(go)(tree.forest), bs => f(tree.value, bs));
  }

  return tree => IO.run(go(tree));
}
export function map_(fa, f) {
  function go(node) {
    return IO.map_(IO.forEachArray(go)(node.forest), forest => ({
      value: f(node.value),
      forest
    }));
  }

  return IO.run(go(fa));
}
export function of(a) {
  return {
    value: a,
    forest: A.empty()
  };
}
export function ap_(fab, fa) {
  return chain_(fab, f => map_(fa, f));
}
export function chain_(fa, f) {
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
export function reduce_(fa, b, f) {
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
export function foldMap_(M) {
  return (fa, f) => reduce_(fa, M.identity, (acc, a) => M.combine(acc, f(a)));
}
export function reduceRight_(fa, b, f) {
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
export const forEachF = /*#__PURE__*/P.implementForEachF()(_ => G => {
  const traverseF = A.forEachF(G);

  const r = f => ta => DSL.apF(G)(traverseF(t => r(f)(t))(ta.forest))(G.map(value => forest => ({
    value,
    forest
  }))(f(ta.value)));

  return r;
});
export const ForEach = {
  forEachF,
  map
};
export const sequence = /*#__PURE__*/sequenceF(ForEach);
export function extract(wa) {
  return wa.value;
}
export function extend_(wa, f) {
  function go(node) {
    return IO.map_(IO.forEachArray(go)(node.forest), forest => ({
      value: f(node),
      forest
    }));
  }

  return IO.run(go(wa));
}
export function extend(f) {
  return ma => extend_(ma, f);
}
export function ap(fa) {
  return fab => ap_(fab, fa);
}
export function apFirst(fb) {
  return fa => ap_(map_(fa, a => () => a), fb);
}
export function apFirst_(fa, fb) {
  return ap_(map_(fa, a => () => a), fb);
}
export function apSecond(fb) {
  return fa => ap_(map_(fa, () => b => b), fb);
}
export function apSecond_(fa, fb) {
  return ap_(map_(fa, () => b => b), fb);
}
export function chain(f) {
  return ma => chain_(ma, f);
}
export function tap(f) {
  return ma => chain_(ma, x => map_(f(x), () => x));
}
export function tap_(ma, f) {
  return chain_(ma, x => map_(f(x), () => x));
}
export function duplicate(ma) {
  return extend_(ma, x => x);
}
export function flatten(mma) {
  return chain_(mma, x => x);
}
export function foldMap(M) {
  return f => fa => foldMap_(M)(fa, f);
}
export function map(f) {
  return fa => map_(fa, f);
}
export function reduce(b, f) {
  return fa => reduce_(fa, b, f);
}
export function reduceRight(b, f) {
  return fa => reduceRight_(fa, b, f);
}
export const Foldable = {
  foldMap,
  reduce,
  reduceRight
};
export const Monad = {
  any: () => of({}),
  flatten,
  map
};
export const Applicative = /*#__PURE__*/getApplicativeF(Monad);
export const gen = /*#__PURE__*/DSL.genF(Monad);
export const bind = /*#__PURE__*/DSL.bindF(Monad);
const do_ = /*#__PURE__*/DSL.doF(Monad);
export { do_ as do };
export { branch as if, branch_ as if_ };
export const struct = /*#__PURE__*/DSL.structF(Applicative);
export const tuple = /*#__PURE__*/DSL.tupleF(Applicative);
/**
 * Matchers
 */

export const {
  match,
  matchIn,
  matchMorph,
  matchTag,
  matchTagIn
} = /*#__PURE__*/DSL.matchers(Monad);
/**
 * Conditionals
 */

const branch = /*#__PURE__*/DSL.conditionalF(Monad);
const branch_ = /*#__PURE__*/DSL.conditionalF_(Monad);
//# sourceMappingURL=core.mjs.map