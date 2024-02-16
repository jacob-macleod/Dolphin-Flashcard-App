import { Stack } from "../../../Stack/index.mjs";
import * as TExit from "../TExit/index.mjs";
import * as STM from "./primitives.mjs";
export class STMDriver {
  constructor(self, journal, fiberId, r0) {
    this.self = self;
    this.journal = journal;
    this.fiberId = fiberId;
    this.envStack = new Stack(r0);
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
            this.envStack = new Stack(k.f(this.envStack.value), this.envStack);
            curr = STM.ensuring_(k.stm, STM.succeedWith(() => {
              this.envStack = this.envStack.previous;
            }));
            break;
          }

        case STM.STMOnRetryTypeId:
          {
            this.contStack = new Stack(k, this.contStack);
            curr = k.stm;
            break;
          }

        case STM.STMOnFailureTypeId:
          {
            this.contStack = new Stack(k, this.contStack);
            curr = k.stm;
            break;
          }

        case STM.STMOnSuccessTypeId:
          {
            this.contStack = new Stack(k, this.contStack);
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
//# sourceMappingURL=driver.mjs.map