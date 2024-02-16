"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Done = exports.Continue = void 0;
exports.as = as;
exports.contramap = contramap;
exports.done = done;
exports.makeContinue = makeContinue;
exports.makeDone = makeDone;
exports.map = map;
exports.toDone = toDone;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../effect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class Done {
  constructor(out) {
    this.out = out;
    this._tag = "Done";
  }

}

exports.Done = Done;

class Continue {
  constructor(out, interval, next) {
    this.out = out;
    this.interval = interval;
    this.next = next;
    this._tag = "Continue";
  }

}

exports.Continue = Continue;

function makeDone(o) {
  return new Done(o);
}

function makeContinue(out, interval, next) {
  return new Continue(out, interval, next);
}

function toDone(self) {
  switch (self._tag) {
    case "Done":
      {
        return self;
      }

    case "Continue":
      {
        return new Done(self.out);
      }
  }
}

function map(f) {
  return self => {
    switch (self._tag) {
      case "Done":
        {
          return new Done(f(self.out));
        }

      case "Continue":
        {
          return new Continue(f(self.out), self.interval, (n, i) => T.map_(self.next(n, i), map(f)));
        }
    }
  };
}

function contramap(f) {
  return self => {
    switch (self._tag) {
      case "Done":
        {
          return self;
        }

      case "Continue":
        {
          return new Continue(self.out, self.interval, (n, i) => T.map_(self.next(n, f(i)), contramap(f)));
        }
    }
  };
}

function as(o) {
  return self => map(() => o)(self);
}

function done(a) {
  return () => T.succeed(new Done(a));
}
//# sourceMappingURL=index.js.map