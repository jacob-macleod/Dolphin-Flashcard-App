// ets_tracing: off
import "../../../Operator/index.mjs";
import * as HM from "../../../Collections/Immutable/HashMap/index.mjs";
import * as T from "../../../Effect/index.mjs";
import { defaultScheduler } from "../../../Support/Scheduler/index.mjs";
import { STMDriver } from "../_internal/driver.mjs";
import { DieTypeId, FailTypeId, RetryTypeId, SucceedTypeId } from "../TExit/index.mjs";
import { Done, DoneTypeId, Suspend, SuspendTypeId } from "../TryCommit/index.mjs";
/**
 * Creates a function that can reset the journal.
 */

export function prepareResetJournal(journal) {
  const saved = new Map();

  for (const entry of journal) {
    saved.set(entry[0], entry[1].use(_ => _.copy()));
  }

  return () => {
    journal.clear();

    for (const entry of saved) {
      journal.set(entry[0], entry[1]);
    }
  };
}
/**
 * Commits the journal.
 */

export function commitJournal(journal) {
  for (const entry of journal) {
    entry[1].use(_ => _.commit());
  }
}
/**
 * Analyzes the journal, determining whether it is valid and whether it is
 * read only in a single pass. Note that information on whether the
 * journal is read only will only be accurate if the journal is valid, due
 * to short-circuiting that occurs on an invalid journal.
 */

export function analyzeJournal(journal) {
  let val = "RO";

  for (const entry of journal) {
    val = entry[1].use(_ => _.isInvalid() ? "I" : _.isChanged() ? "RW" : val);

    if (val === "I") {
      return val;
    }
  }

  return val;
}
export const emptyTodoMap = /*#__PURE__*/HM.make();
/**
 * Atomically collects and clears all the todos from any `TRef` that
 * participated in the transaction.
 */

export function collectTodos(journal) {
  const allTodos = new Map();

  for (const entry of journal) {
    const tref = entry[1].use(_ => _.tref);
    const todos = tref.todo.get;

    for (const todo of todos) {
      allTodos.set(todo[0], todo[1]);
    }

    tref.todo.set(emptyTodoMap);
  }

  return allTodos;
}
/**
 * Executes the todos in the current thread, sequentially.
 */

export function execTodos(todos) {
  const todosSorted = Array.from(todos.entries()).sort((x, y) => x[0] - y[0]);

  for (const [_, todo] of todosSorted) {
    todo();
  }
}
/**
 * Runs all the todos.
 */

export function completeTodos(io, journal) {
  const todos = collectTodos(journal);

  if (todos.size > 0) {
    defaultScheduler(() => execTodos(todos));
  }

  return new Done(io);
}
/**
 * For the given transaction id, adds the specified todo effect to all
 * `TRef` values.
 */

export function addTodo(txnId, journal, todoEffect) {
  let added = false;

  for (const entry of journal) {
    const tref = entry[1].use(_ => _.tref);
    const oldTodo = tref.todo.get;

    if (!HM.has_(oldTodo, txnId)) {
      const newTodo = HM.set_(oldTodo, txnId, todoEffect);
      tref.todo.set(newTodo);
      added = true;
    }
  }

  return added;
}
/**
 * Finds all the new todo targets that are not already tracked in the `oldJournal`.
 */

export function untrackedTodoTargets(oldJournal, newJournal) {
  const untracked = new Map();

  for (const entry of newJournal) {
    const key = entry[0];
    const value = entry[1];

    if ( // We already tracked this one
    !oldJournal.has(key) && // This `TRef` was created in the current transaction, so no need to
    // add any todos to it, because it cannot be modified from the outside
    // until the transaction succeeds; so any todo added to it would never
    // succeed.
    !value.use(_ => _.isNew)) {
      untracked.set(key, value);
    }
  }

  return untracked;
}
export function tryCommit(fiberId, stm, r) {
  const journal = new Map();
  const value = new STMDriver(stm, journal, fiberId, r).run();
  const analysis = analyzeJournal(journal);

  if (analysis === "RW") {
    commitJournal(journal);
  } else if (analysis === "I") {
    throw new Error("Bug: invalid journal");
  }

  switch (value._typeId) {
    case RetryTypeId:
      {
        return new Suspend(journal);
      }

    case SucceedTypeId:
      {
        return completeTodos(T.succeed(value.value), journal);
      }

    case FailTypeId:
      {
        return completeTodos(T.fail(value.value), journal);
      }

    case DieTypeId:
      {
        return completeTodos(T.die(value.value), journal);
      }
  }
}

function completeTryCommit(io, k, done) {
  done.set(true);
  k(io);
}

function suspendTryCommit(fiberId, stm, txnId, done, r, k, accum, journal) {
  // eslint-disable-next-line no-constant-condition
  while (1) {
    addTodo(txnId, journal, () => tryCommitAsync(undefined, fiberId, stm, txnId, done, r)(k));

    if (isInvalid(journal)) {
      const v = tryCommit(fiberId, stm, r);

      switch (v._typeId) {
        case DoneTypeId:
          {
            completeTryCommit(v.io, k, done);
            return;
          }

        case SuspendTypeId:
          {
            const untracked = untrackedTodoTargets(accum, v.journal);

            if (untracked.size > 0) {
              for (const entry of untracked) {
                accum.set(entry[0], entry[1]);
              }

              journal = untracked;
            }

            break;
          }
      }
    } else {
      return;
    }
  }
}

export function tryCommitAsync(journal, fiberId, stm, txnId, done, r) {
  return k => {
    if (!done.get) {
      if (journal == null) {
        const v = tryCommit(fiberId, stm, r);

        switch (v._typeId) {
          case DoneTypeId:
            {
              completeTryCommit(v.io, k, done);
              break;
            }

          case SuspendTypeId:
            {
              suspendTryCommit(fiberId, stm, txnId, done, r, k, v.journal, v.journal);
              break;
            }
        }
      } else {
        suspendTryCommit(fiberId, stm, txnId, done, r, k, journal, journal);
      }
    }
  };
}
/**
 * Determines if the journal is valid.
 */

export function isValid(journal) {
  let valid = true;

  for (const entry of journal) {
    valid = entry[1].use(_ => _.isValid());

    if (!valid) {
      return valid;
    }
  }

  return valid;
}
/**
 * Determines if the journal is invalid.
 */

export function isInvalid(journal) {
  return !isValid(journal);
}
//# sourceMappingURL=index.mjs.map