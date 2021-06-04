"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGlobal = exports.GlobalStateProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var GlobalStateContext = react_1.createContext({
    setState: {},
    state: {},
});
var useGlobalState = function () {
    var context = react_1.useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a GlobalStateContext');
    }
    return context;
};
var GlobalStateProvider = function (_a) {
    var children = _a.children, _b = _a.value, value = _b === void 0 ? {} : _b;
    var _c = react_1.useState(value), state = _c[0], setState = _c[1];
    return (jsx_runtime_1.jsx(GlobalStateContext.Provider, __assign({ value: { setState: setState, state: state } }, { children: children }), void 0));
};
exports.GlobalStateProvider = GlobalStateProvider;
var useQuestionnaire = function () {
    var questionnaire = useGlobalState().state.questionnaire;
    if (!questionnaire) {
        throw new Error('useQuestionnaire has no data');
    }
    return questionnaire;
};
var useConfig = function () {
    var config = useGlobalState().state.config;
    if (!config) {
        throw new Error('useConfig has no data');
    }
    return config;
};
var useGlobal = function () { return ({
    config: useConfig(),
    questionnaire: useQuestionnaire(),
}); };
exports.useGlobal = useGlobal;
//# sourceMappingURL=GlobalState.js.map