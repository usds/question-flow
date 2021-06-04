"use strict";
/*
  eslint-disable no-console,
                 @typescript-eslint/no-explicit-any,
                 @typescript-eslint/explicit-module-boundary-types,
*/
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
/**
 * Logs to the console. All arguments logged as an array.
 * @param params
 * @returns
 */
var log = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    return console.log(__spreadArray([], params));
};
exports.log = log;
//# sourceMappingURL=log.js.map