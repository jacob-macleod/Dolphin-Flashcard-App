// ets_tracing: off
import * as T from "../deps-core.mjs";
import * as R from "./deps-ref.mjs";
import { ReleaseMap } from "./ReleaseMap.mjs";
import { Running } from "./Running.mjs";
export const makeReleaseMap = /*#__PURE__*/T.map_( /*#__PURE__*/R.makeRef( /*#__PURE__*/new Running(0, /*#__PURE__*/new Map())), s => new ReleaseMap(s));
//# sourceMappingURL=makeReleaseMap.mjs.map