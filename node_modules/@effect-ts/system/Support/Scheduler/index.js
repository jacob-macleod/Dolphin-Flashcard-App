"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultScheduler = void 0;

var _index = /*#__PURE__*/require("../DoublyLinkedList/index.js");

let isRunning = false;
const tasks = /*#__PURE__*/new _index.DoublyLinkedList();

const defaultScheduler = thunk => {
  tasks.add(thunk);

  if (!isRunning) {
    isRunning = true;
    Promise.resolve().then(() => {
      while (tasks.length > 0) {
        tasks.shift()();
      }

      isRunning = false;
    });
  }
};

exports.defaultScheduler = defaultScheduler;
//# sourceMappingURL=index.js.map