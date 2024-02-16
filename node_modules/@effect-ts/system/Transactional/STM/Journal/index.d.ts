import "../../../Operator/index.js";
import * as HM from "../../../Collections/Immutable/HashMap/index.js";
import * as T from "../../../Effect/index.js";
import type { FiberID } from "../../../Fiber/index.js";
import type { AtomicBoolean } from "../../../Support/AtomicBoolean/index.js";
import type { Atomic } from "../../TRef/index.js";
import type { STM } from "../_internal/primitives.js";
import type { Entry } from "../Entry/index.js";
import type { TryCommit } from "../TryCommit/index.js";
import { Done } from "../TryCommit/index.js";
import type { TxnId } from "../TxnId/index.js";
export declare type Journal = Map<Atomic<any>, Entry>;
export declare type Todo = () => unknown;
/**
 * Creates a function that can reset the journal.
 */
export declare function prepareResetJournal(journal: Journal): () => unknown;
/**
 * Commits the journal.
 */
export declare function commitJournal(journal: Journal): void;
/**
 * Analyzes the journal, determining whether it is valid and whether it is
 * read only in a single pass. Note that information on whether the
 * journal is read only will only be accurate if the journal is valid, due
 * to short-circuiting that occurs on an invalid journal.
 */
export declare function analyzeJournal(journal: Journal): "I" | "RW" | "RO";
export declare const emptyTodoMap: HM.HashMap<number, Todo>;
/**
 * Atomically collects and clears all the todos from any `TRef` that
 * participated in the transaction.
 */
export declare function collectTodos(journal: Journal): Map<TxnId, Todo>;
/**
 * Executes the todos in the current thread, sequentially.
 */
export declare function execTodos(todos: Map<TxnId, Todo>): void;
/**
 * Runs all the todos.
 */
export declare function completeTodos<E, A>(io: T.IO<E, A>, journal: Journal): Done<E, A>;
/**
 * For the given transaction id, adds the specified todo effect to all
 * `TRef` values.
 */
export declare function addTodo(txnId: TxnId, journal: Journal, todoEffect: Todo): boolean;
/**
 * Finds all the new todo targets that are not already tracked in the `oldJournal`.
 */
export declare function untrackedTodoTargets(oldJournal: Journal, newJournal: Journal): Journal;
export declare function tryCommit<R, E, A>(fiberId: FiberID, stm: STM<R, E, A>, r: R): TryCommit<E, A>;
export declare function tryCommitAsync<R, E, A>(journal: Journal | undefined, fiberId: FiberID, stm: STM<R, E, A>, txnId: TxnId, done: AtomicBoolean, r: R): (k: (_: T.Effect<R, E, A>) => unknown) => void;
/**
 * Determines if the journal is valid.
 */
export declare function isValid(journal: Journal): boolean;
/**
 * Determines if the journal is invalid.
 */
export declare function isInvalid(journal: Journal): boolean;
//# sourceMappingURL=index.d.ts.map