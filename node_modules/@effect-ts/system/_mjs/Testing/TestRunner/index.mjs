// ets_tracing: off
import * as Clock from "../../Clock/index.mjs";
import * as T from "../../Effect/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as L from "../../Layer/index.mjs";
import * as Annotations from "../Annotations/index.mjs";
import * as TestAnnotationRenderer from "../TestAnnotationRenderer/index.mjs";
import { Duration } from "../TestClock/index.mjs";
import { defaultExecutor } from "../TestExecutor/index.mjs";
import { FromConsole } from "../TestLogger/index.mjs";
import { DefaultTestReporter } from "../TestReporter/index.mjs";
const defaultClock = /*#__PURE__*/L.fromFunction(Clock.HasClock)(() => new Clock.LiveClock());
const defaultLayer = /*#__PURE__*/defaultClock["+++"](FromConsole);
export class TestRunner {
  constructor(executor, platform = T.defaultPlatform, reporter = DefaultTestReporter(TestAnnotationRenderer.standard), bootstrap = defaultLayer) {
    this.executor = executor;
    this.platform = platform;
    this.reporter = reporter;
    this.bootstrap = bootstrap;
    this.runtime = new T.CustomRuntime(undefined, this.platform);

    this.run = spec => T.chain_(T.timed(this.executor.run(spec, T.parallelN(4))), ({
      tuple: [d, e]
    }) => T.as_(this.reporter(Duration(d), e), e));
  }

}
export const defaultTestRunner = /*#__PURE__*/new TestRunner( /*#__PURE__*/defaultExecutor( /*#__PURE__*/Annotations.live["+++"]( /*#__PURE__*/L.succeed(T.defaultEnv))));
//# sourceMappingURL=index.mjs.map