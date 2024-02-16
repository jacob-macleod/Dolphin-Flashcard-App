// ets_tracing: off
import * as T from "../effect.mjs";
export class Done {
  constructor(out) {
    this.out = out;
    this._tag = "Done";
  }

}
export class Continue {
  constructor(out, interval, next) {
    this.out = out;
    this.interval = interval;
    this.next = next;
    this._tag = "Continue";
  }

}
export function makeDone(o) {
  return new Done(o);
}
export function makeContinue(out, interval, next) {
  return new Continue(out, interval, next);
}
export function toDone(self) {
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
export function map(f) {
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
export function contramap(f) {
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
export function as(o) {
  return self => map(() => o)(self);
}
export function done(a) {
  return () => T.succeed(new Done(a));
}
//# sourceMappingURL=index.mjs.map