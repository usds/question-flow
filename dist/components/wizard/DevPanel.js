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
exports.DevPanel = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_uswds_1 = require("@trussworks/react-uswds");
var noop_1 = require("../../lib/noop");
var GlobalState_1 = require("../../state/GlobalState");
var Wizard_1 = require("../lib/Wizard");
var DevPanel = function (props) {
    var config = GlobalState_1.useGlobal().config;
    if (!config.dev) {
        return noop_1.noel();
    }
    var reset = function () { return Wizard_1.Wizard.resetQuestionable(props); };
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsx(react_uswds_1.Accordion, { items: [
                    {
                        content: (jsx_runtime_1.jsx("pre", { children: jsx_runtime_1.jsx("code", { children: JSON.stringify(props.form, null, 4) }, void 0) }, void 0)),
                        expanded: false,
                        id: 'developer-output',
                        title: 'Temporary developer panel',
                    },
                ] }, void 0),
            jsx_runtime_1.jsx("br", {}, void 0),
            jsx_runtime_1.jsx("nav", __assign({ className: "wizard-layout__navbar" }, { children: jsx_runtime_1.jsx(react_uswds_1.Button, __assign({ type: "reset", secondary: true, onClick: reset }, { children: "Reset" }), void 0) }), void 0)] }, void 0));
};
exports.DevPanel = DevPanel;
//# sourceMappingURL=DevPanel.js.map