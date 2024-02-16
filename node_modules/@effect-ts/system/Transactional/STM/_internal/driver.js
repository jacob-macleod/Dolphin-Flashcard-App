"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STMDriver = void 0;

var _index = /*#__PURE__*/require("../../../Stack/index.js");

var TExit = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../TExit/index.js"));

var STM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./primitives.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class STMDriver {
  constructor(self, journal, fiberId, r0) {
    this.self = self;
    this.journal = journal;
    this.fiberId = fiberId;
    this.envStack = new _index.Stack(r0);
  }

  unwindStack(error, isRetry) {
    let result = undefined;

    while (this.contStack && !result) {
      const cont = this.contStack.value;
      this.contStack = this.contStack.previous;

      if (cont._typeId === STM.STMOnFailureTypeId) {
        if (!isRetry) {
          result = cont.onFailure(error);
        }
      }

      if (cont._typeId === STM.STMOnRetryTypeId) {
        if (isRetry) {
          result = cont.onRetry;
        }
      }
    }

    return result;
  }

  run() {
    let curr = this.self;
    let exit = undefined;

    while (!exit && curr) {
      const k = curr;
      ;

      switch (k._typeId) {
        case STM.STMSucceedTypeId:
          {
            const a = k.a();

            if (!this.contStack) {
              exit = TExit.succeed(a);
            } else {
              const cont = this.contStack.value;
              this.contStack = this.contStack.previous;
              curr = cont.apply(a);
            }

            break;
          }

        case STM.STMSucceedNowTypeId:
          {
            const a = k.a;

            if (!this.contStack) {
              exit = TExit.succeed(a);
            } else {
              const cont = this.contStack.value;
              this.contStack = this.contStack.previous;
              curr = cont.apply(a);
            }

            break;
          }

        case STM.STMProvideSomeTypeId:
          {
            this.envStack = new _index.Stack(k.f(this.envStack.value), this.envStack);
            curr = STM.ensuring_(k.stm, STM.succeedWith(() => {
              this.envStack = this.envStack.previous;
            }));
            break;
          }

        case STM.STMOnRetryTypeId:
          {
            this.contStack = new _index.Stack(k, this.contStack);
            curr = k.stm;
            break;
          }

        case STM.STMOnFailureTypeId:
          {
            this.contStack = new _index.Stack(k, this.contStack);
            curr = k.stm;
            break;
          }

        case STM.STMOnSuccessTypeId:
          {
            this.contStack = new _index.Stack(k, this.contStack);
            curr = k.stm;
            break;
          }

        case STM.STMEffectTypeId:
          {
            try {
              const a = k.f(this.journal, this.fiberId, this.envStack.value);

              if (!this.contStack) {
                exit = TExit.succeed(a);
              } else {
                const cont = this.contStack.value;
                this.contStack = this.contStack.previous;
                curr = cont.apply(a);
              }
            } catch (e) {
              if (STM.isFailException(e)) {
                curr = this.unwindStack(e.e, false);

                if (!curr) {
                  exit = TExit.fail(e.e);
                }
              } else if (STM.isRetryException(e)) {
                curr = this.unwindStack(undefined, true);

                if (!curr) {
                  exit = TExit.retry;
                }
              } else if (STM.isDieException(e)) {
                curr = this.unwindStack(e.e, false);

                if (!curr) {
                  exit = TExit.die(e.e);
                }
              } else {
                throw e;
              }
            }
          }
      }
    }

    return exit;
  }

}

exports.STMDriver = STMDriver;
//# sourceMappingURL=driver.js.map