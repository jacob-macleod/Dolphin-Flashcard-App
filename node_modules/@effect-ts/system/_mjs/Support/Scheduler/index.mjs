import { DoublyLinkedList } from "../DoublyLinkedList/index.mjs";
let isRunning = false;
const tasks = /*#__PURE__*/new DoublyLinkedList();
export const defaultScheduler = thunk => {
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
//# sourceMappingURL=index.mjs.map