"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = void 0;
var Answer = /** @class */ (function () {
    function Answer(form) {
        if (form === void 0) { form = {}; }
        this.answers = {};
        Object.assign(this, form);
        this.started = new Date();
    }
    return Answer;
}());
exports.Answer = Answer;
//# sourceMappingURL=Answer.js.map