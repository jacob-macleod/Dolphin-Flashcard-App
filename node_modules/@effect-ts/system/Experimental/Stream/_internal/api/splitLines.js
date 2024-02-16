"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitLines = splitLines;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var _index3 = /*#__PURE__*/require("../../../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Splits strings on newlines. Handles both Windows newlines (`\r\n`) and UNIX newlines (`\n`).
 */
function splitLines(self) {
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
//# sourceMappingURL=splitLines.js.map