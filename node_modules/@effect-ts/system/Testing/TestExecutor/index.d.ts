import type { ExecutionStrategy, UIO } from "../../Effect/index.js";
import type { Has } from "../../Has/index.js";
import type { Layer } from "../../Layer/index.js";
import type { Annotations } from "../Annotations/index.js";
import * as ES from "../ExecutedSpec/index.js";
import * as Spec from "../Spec/index.js";
export interface TestExecutor<R, E> {
    readonly run: (spec: Spec.ZSpec<R, E>, defExec: ExecutionStrategy) => UIO<ES.ExecutedSpec<E>>;
    readonly environment: Layer<unknown, never, R>;
}
export declare function defaultExecutor<R extends Has<Annotations>, E>(env: Layer<unknown, never, R>): TestExecutor<R, E>;
//# sourceMappingURL=index.d.ts.map