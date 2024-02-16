"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTodo = addTodo;
exports.analyzeJournal = analyzeJournal;
exports.collectTodos = collectTodos;
exports.commitJournal = commitJournal;
exports.completeTodos = completeTodos;
exports.emptyTodoMap = void 0;
exports.execTodos = execTodos;
exports.isInvalid = isInvalid;
exports.isValid = isValid;
exports.prepareResetJournal = prepareResetJournal;
exports.tryCommit = tryCommit;
exports.tryCommitAsync = tryCommitAsync;
exports.untrackedTodoTargets = untrackedTodoTargets;

require("../../../Operator/index.js");

var HM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/HashMap/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var _index4 = /*#__PURE__*/require("../../../Support/Scheduler/index.js");

var _driver = /*#__PURE__*/require("../_internal/driver.js");

var _index5 = /*#__PURE__*/require("../TExit/index.js");

var _index6 = /*#__PURE__*/require("../TryCommit/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a function that can reset the journal.
 */
function prepareResetJournal(journal) {
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


function commitJournal(journal) {
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


function analyzeJournal(journal) {
  let val = "RO";

  for (const entry of journal) {
    val = entry[1].use(_ => _.isInvalid() ? "I" : _.isChanged() ? "RW" : val);

    if (val === "I") {
      return val;
    }
  }

  return val;
}

const emptyTodoMap = /*#__PURE__*/HM.make();
/**
 * Atomically collects and clears all the todos from any `TRef` that
 * participated in the transaction.
 */

exports.emptyTodoMap = emptyTodoMap;

function collectTodos(journal) {
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


function execTodos(todos) {
  const todosSorted = Array.from(todos.entries()).sort((x, y) => x[0] - y[0]);

  for (const [_, todo] of todosSorted) {
    todo();
  }
}
/**
 * Runs all the todos.
 */


function completeTodos(io, journal) {
  const todos = collectTodos(journal);

  if (todos.size > 0) {
    (0, _index4.defaultScheduler)(() => execTodos(todos));
  }

  return new _index6.Done(io);
}
/**
 * For the given transaction id, adds the specified todo effect to all
 * `TRef` values.
 */


function addTodo(txnId, journal, todoEffect) {
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


function untrackedTodoTargets(oldJournal, newJournal) {
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

function tryCommit(fiberId, stm, r) {
  const journal = new Map();
  const value = new _driver.STMDriver(stm, journal, fiberId, r).run();
  const analysis = analyzeJournal(journal);

  if (analysis === "RW") {
    commitJournal(journal);
  } else if (analysis === "I") {
    throw new Error("Bug: invalid journal");
  }

  switch (value._typeId) {
    case _index5.RetryTypeId:
      {
        return new _index6.Suspend(journal);
      }

    case _index5.SucceedTypeId:
      {
        return completeTodos(T.succeed(value.value), journal);
      }

    case _index5.FailTypeId:
      {
        return completeTodos(T.fail(value.value), journal);
      }

    case _index5.DieTypeId:
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
        case _index6.DoneTypeId:
          {
            completeTryCommit(v.io, k, done);
            return;
          }

        case _index6.SuspendTypeId:
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

function tryCommitAsync(journal, fiberId, stm, txnId, done, r) {
  return k => {
    if (!done.get) {
      if (journal == null) {
        const v = tryCommit(fiberId, stm, r);

        switch (v._typeId) {
          case _index6.DoneTypeId:
            {
              completeTryCommit(v.io, k, done);
              break;
            }

          case _index6.SuspendTypeId:
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


function isValid(journal) {
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


function isInvalid(journal) {
  return !isValid(journal);
}
//# sourceMappingURL=index.js.map