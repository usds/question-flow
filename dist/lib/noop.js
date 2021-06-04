"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noel = exports.noop = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable @typescript-eslint/no-empty-function */
var log_1 = require("./log");
/**
 * Generic no-operation
 */
var noop = function () { };
exports.noop = noop;
/**
 * Generic no-element
 * @returns empty element
 */
var noel = function (message, context) {
    if (message === void 0) { message = ''; }
    if (context === void 0) { context = ''; }
    log_1.log('Created an empty element', message, context);
    return (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: message }, void 0));
};
exports.noel = noel;
//# sourceMappingURL=noop.js.map