import type * as T from "../../Effect/index.js";
import type { Has } from "../../Has/index.js";
import type { ExecutedSpec } from "../ExecutedSpec/index.js";
import type { TestAnnotationRenderer } from "../TestAnnotationRenderer/index.js";
import type { Duration } from "../TestClock/index.js";
import type { TestLogger } from "../TestLogger/index.js";
/**
 * A `TestReporter[E]` is capable of reporting test results
 * with error type `E`.
 */
export declare type TestReporter<E> = (duration: Duration, executedSpec: ExecutedSpec<E>) => T.RIO<Has<TestLogger>, void>;
export declare function DefaultTestReporter<E>(_: TestAnnotationRenderer): TestReporter<E>;
//# sourceMappingURL=index.d.ts.map