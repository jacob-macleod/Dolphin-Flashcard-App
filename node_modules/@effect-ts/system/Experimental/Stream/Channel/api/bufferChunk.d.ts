import * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import type * as Ref from "../../../../Ref/index.js";
import type * as C from "../core.js";
export declare function bufferChunk<InElem, InErr, InDone>(ref: Ref.Ref<CK.Chunk<InElem>>): C.Channel<unknown, InErr, CK.Chunk<InElem>, InDone, InErr, CK.Chunk<InElem>, InDone>;
//# sourceMappingURL=bufferChunk.d.ts.map