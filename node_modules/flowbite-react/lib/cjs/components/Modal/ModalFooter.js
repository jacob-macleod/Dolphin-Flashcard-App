"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalFooter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tailwind_merge_1 = require("tailwind-merge");
const merge_deep_1 = require("../../helpers/merge-deep");
const ModalContext_1 = require("./ModalContext");
const ModalFooter = ({ children, className, theme: customTheme = {}, ...props }) => {
    const { theme: rootTheme, popup } = (0, ModalContext_1.useModalContext)();
    const theme = (0, merge_deep_1.mergeDeep)(rootTheme.footer, customTheme);
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, tailwind_merge_1.twMerge)(theme.base, !popup && theme.popup, className), ...props, children: children }));
};
exports.ModalFooter = ModalFooter;
