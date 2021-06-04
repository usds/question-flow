"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionableConfig = void 0;
var lib_1 = require("../lib");
var QuestionableConfig = /** @class */ (function () {
    function QuestionableConfig(config) {
        if (config === void 0) { config = {}; }
        this.dev = false;
        this.mode = lib_1.MODE.VIEW;
        this.showSteps = false;
        Object.assign(this, config);
    }
    return QuestionableConfig;
}());
exports.QuestionableConfig = QuestionableConfig;
//# sourceMappingURL=Config.js.map