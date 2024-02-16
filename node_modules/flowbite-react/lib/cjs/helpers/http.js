"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeResJson = void 0;
const safeResJson = (res) => {
    if (res.ok) {
        return res.json();
    }
    throw new Error('Internal server error!');
};
exports.safeResJson = safeResJson;
