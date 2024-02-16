// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Splits strings on newlines. Handles both Windows newlines (`\r\n`) and UNIX newlines (`\n`).
 */

export function splitLines(self) {
  const next = (leftover, wasSplitCRLF) => CH.readWithCause(incomingChunk => {
    const buffer = CK.builder();
    let inCRLF = wasSplitCRLF;
    let carry = O.getOrElse_(leftover, () => "");
    CK.forEach_(incomingChunk, string => {
      const concatenated = carry + string;

      if (string.length > 0) {
        const continueFrom = inCRLF && carry.length > 0 ? carry.length - 1 : carry.length;
        return (({
          tuple: [sliceStart, _, midCRLF]
        }) => {
          carry = concatenated.slice(sliceStart);
          inCRLF = midCRLF;
        })(CK.reduce_(CK.drop_(CK.zipWithIndex(CK.from(concatenated)), continueFrom), Tp.tuple(0, false, inCRLF), ({
          tuple: [sliceStart, skipNext, midCRLF]
        }, {
          tuple: [char, index]
        }) => {
          if (skipNext) {
            return Tp.tuple(sliceStart, false, false);
          } else {
            switch (char) {
              case "\n":
                {
                  buffer.append(concatenated.slice(sliceStart, index));
                  return Tp.tuple(index + 1, false, midCRLF);
                }

              case "\r":
                {
                  if (index + 1 < concatenated.length && concatenated[index + 1] === "\n") {
                    buffer.append(concatenated.slice(sliceStart, index));
                    return Tp.tuple(index + 2, true, false);
                  } else if (index === concatenated.length - 1) {
                    return Tp.tuple(sliceStart, false, true);
                  } else {
                    return Tp.tuple(index, false, false);
                  }
                }

              default:
                {
                  return Tp.tuple(sliceStart, false, midCRLF);
                }
            }
          }
        }));
      }
    });
    return CH.zipRight_(CH.write(buffer.build()), next(carry.length > 0 ? O.some(carry) : O.none, inCRLF));
  }, halt => O.fold_(leftover, () => CH.failCause(halt), value => CH.zipRight_(CH.write(CK.single(value)), CH.failCause(halt))), done => O.fold_(leftover, () => CH.end(done), value => CH.zipRight_(CH.write(CK.single(value)), CH.end(done))));

  return new C.Stream(self.channel[">>>"](next(O.none, false)));
}
//# sourceMappingURL=splitLines.mjs.map