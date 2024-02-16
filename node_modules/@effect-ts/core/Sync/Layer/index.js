"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Using = exports.SyncLayer = exports.Suspended = exports.Of = exports.From = exports.Fresh = exports.Both = exports.All = void 0;
exports.all = all;
exports.and = and;
exports.andTo = andTo;
exports.fresh = fresh;
exports.from = from;
exports.fromFunction = fromFunction;
exports.fromRawSync = fromRawSync;
exports.fromSync = fromSync;
exports.fromValue = fromValue;
exports.getMemoOrElseCreate = getMemoOrElseCreate;
exports.provideSyncLayer = provideSyncLayer;
exports.suspended = suspended;
exports.to = to;
exports.using = using;

require("../../Operator/index.js");

var _Effect = /*#__PURE__*/require("@effect-ts/system/Effect");

var _AtomicReference = /*#__PURE__*/require("@effect-ts/system/Support/AtomicReference");

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Array/index.js"));

var _index3 = /*#__PURE__*/require("../../Function/index.js");

var Sy = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class SyncLayer {
  constructor() {
    this.hash = new _AtomicReference.AtomicReference(Symbol());
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

exports.SyncLayer = SyncLayer;

class Of extends SyncLayer {
  constructor(sync) {
    super();
    this.sync = sync;
    this._tag = "FromSync";
  }

  scope() {
    return Sy.succeed(_ => this.sync);
  }

}

exports.Of = Of;

class Fresh extends SyncLayer {
  constructor(sync) {
    super();
    this.sync = sync;
    this._tag = "Fresh";
  }

  scope() {
    return Sy.succeed(_ => this.sync.build());
  }

}

exports.Fresh = Fresh;

class Suspended extends SyncLayer {
  constructor(sync) {
    super();
    this.sync = sync;
    this._tag = "Suspended";
  }

  scope() {
    return Sy.succeed(getMemoOrElseCreate(this.sync()));
  }

}

exports.Suspended = Suspended;

class Both extends SyncLayer {
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

exports.Both = Both;

class Using extends SyncLayer {
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

exports.Using = Using;

class From extends SyncLayer {
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

exports.From = From;

class All extends SyncLayer {
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

exports.All = All;

function getMemoOrElseCreate(layer) {
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

function fromRawSync(_) {
  return new Of(_);
}

function fresh(layer) {
  return new Fresh(layer);
}

function suspended(layer) {
  return new Suspended(layer);
}

function fromSync(tag) {
  return _ => new Of(Sy.map_(_, tag.has));
}

function fromFunction(tag) {
  return _ => new Of(Sy.map_(Sy.access(_), tag.has));
}

function fromValue(tag) {
  return _ => new Of(Sy.succeed(tag.has(_)));
}

function and(left) {
  return right => new Both(left, right);
}

function andTo(left) {
  return right => new Using(right, left);
}

function to(left) {
  return right => new From(right, left);
}

function using(left) {
  return right => new Using(left, right);
}

function from(left) {
  return right => new From(left, right);
}

function provideSyncLayer(layer) {
  return _ => Sy.chain_(layer.build(), a => Sy.provide(a)(_));
}

function all(...ls) {
  return new All(ls);
}
//# sourceMappingURL=index.js.map