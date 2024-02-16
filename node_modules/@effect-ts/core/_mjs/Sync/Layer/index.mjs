// ets_tracing: off
import "../../Operator/index.mjs";
import { _A, _E, _R } from "@effect-ts/system/Effect";
import { AtomicReference } from "@effect-ts/system/Support/AtomicReference";
import * as A from "../../Collections/Immutable/Array/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as Sy from "../_internal/index.mjs";
export class SyncLayer {
  constructor() {
    this.hash = new AtomicReference(Symbol());
  }

  setKey(key) {
    this.hash.set(key);
    return this;
  }

  ["+++"](that) {
    return new Both(this, that);
  }

  ["<<<"](that) {
    return new From(that, this);
  }

  [">>>"](that) {
    return new From(this, that);
  }

  ["<+<"](that) {
    return new Using(that, this);
  }

  [">+>"](that) {
    return new Using(this, that);
  }

  build() {
    const scope = () => this.scope();

    return Sy.gen(function* (_) {
      const memo = yield* _(Sy.succeedWith(() => new Map()));
      const scoped = yield* _(scope());
      return yield* _(scoped(memo));
    });
  }

}
export class Of extends SyncLayer {
  constructor(sync) {
    super();
    this.sync = sync;
    this._tag = "FromSync";
  }

  scope() {
    return Sy.succeed(_ => this.sync);
  }

}
export class Fresh extends SyncLayer {
  constructor(sync) {
    super();
    this.sync = sync;
    this._tag = "Fresh";
  }

  scope() {
    return Sy.succeed(_ => this.sync.build());
  }

}
export class Suspended extends SyncLayer {
  constructor(sync) {
    super();
    this.sync = sync;
    this._tag = "Suspended";
  }

  scope() {
    return Sy.succeed(getMemoOrElseCreate(this.sync()));
  }

}
export class Both extends SyncLayer {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
    this._tag = "Both";
  }

  scopeBoth(self) {
    return Sy.succeed(map => Sy.gen(function* (_) {
      const l = yield* _(getMemoOrElseCreate(self.left)(map));
      const r = yield* _(getMemoOrElseCreate(self.right)(map));
      return { ...l,
        ...r
      };
    }));
  }

  scope() {
    return this.scopeBoth(this);
  }

}
export class Using extends SyncLayer {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
    this._tag = "Using";
  }

  scope() {
    return Sy.succeed(_ => Sy.chain_(getMemoOrElseCreate(this.left)(_), l => Sy.provide(l)(Sy.map_(getMemoOrElseCreate(this.right)(_), r => ({ ...l,
      ...r
    })))));
  }

}
export class From extends SyncLayer {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
    this._tag = "From";
  }

  scope() {
    return Sy.succeed(_ => Sy.chain_(getMemoOrElseCreate(this.left)(_), l => Sy.provide(l)(getMemoOrElseCreate(this.right)(_))));
  }

}
export class All extends SyncLayer {
  constructor(layers) {
    super();
    this.layers = layers;
    this._tag = "All";
  }

  scope() {
    return Sy.succeed(_ => A.reduce_(this.layers, Sy.succeed({}), (b, a) => Sy.chain_(getMemoOrElseCreate(a)(_), x => Sy.map_(b, k => ({ ...k,
      ...x
    })))));
  }

}
export function getMemoOrElseCreate(layer) {
  return m => Sy.gen(function* (_) {
    const inMap = yield* _(Sy.succeedWith(() => m.get(layer.hash.get)));

    if (inMap) {
      return yield* _(Sy.succeed(inMap));
    } else {
      return yield* _(Sy.gen(function* (_) {
        const f = yield* _(layer.scope());
        const a = yield* _(f(m));
        yield* _(Sy.succeedWith(() => {
          m.set(layer.hash.get, a);
        }));
        return a;
      }));
    }
  });
}
export function fromRawSync(_) {
  return new Of(_);
}
export function fresh(layer) {
  return new Fresh(layer);
}
export function suspended(layer) {
  return new Suspended(layer);
}
export function fromSync(tag) {
  return _ => new Of(Sy.map_(_, tag.has));
}
export function fromFunction(tag) {
  return _ => new Of(Sy.map_(Sy.access(_), tag.has));
}
export function fromValue(tag) {
  return _ => new Of(Sy.succeed(tag.has(_)));
}
export function and(left) {
  return right => new Both(left, right);
}
export function andTo(left) {
  return right => new Using(right, left);
}
export function to(left) {
  return right => new From(right, left);
}
export function using(left) {
  return right => new Using(left, right);
}
export function from(left) {
  return right => new From(left, right);
}
export function provideSyncLayer(layer) {
  return _ => Sy.chain_(layer.build(), a => Sy.provide(a)(_));
}
export function all(...ls) {
  return new All(ls);
}
//# sourceMappingURL=index.mjs.map