// ets_tracing: off
import * as T from "../../Effect/index.mjs";
import * as L from "../../Layer/index.mjs";
import * as Random from "../../Random/index.mjs";
import * as Annotations from "../Annotations/index.mjs";
import * as Live from "../Live/index.mjs";
import * as TestClock from "../TestClock/index.mjs";
const defaultEnv = /*#__PURE__*/L.succeed(T.defaultEnv);
const deterministicRandom = /*#__PURE__*/L.fromEffect_( /*#__PURE__*/T.succeedWith(() => new Random.LiveRandom(4374897389)), Random.HasRandom);
export const TestEnvironment = /*#__PURE__*/defaultEnv[">=>"]( /*#__PURE__*/Annotations.live["+++"](Live.live)[">+>"]( /*#__PURE__*/TestClock.defaultTestClock["+++"](deterministicRandom)));
//# sourceMappingURL=index.mjs.map