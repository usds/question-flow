"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react/jsx-runtime"),t=require("react"),r=require("use-wizard"),n=require("lodash"),i=require("@trussworks/react-uswds"),o=require("luxon"),s=require("file-saver"),a=require("@ramonak/react-progress-bar"),c=require("@rjsf/semantic-ui"),u=require("class-validator");function l(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var d=l(s),f=l(a),p=l(c);function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function g(e,t){if(e){if("string"==typeof e)return v(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?v(e,t):void 0}}function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=r){var n,i,o=[],s=!0,a=!1;try{for(r=r.call(e);!(s=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);s=!0);}catch(e){a=!0,i=e}finally{try{s||null==r.return||r.return()}finally{if(a)throw i}}return o}}(e,t)||g(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function y(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var O,j,m,S=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};h(this,e),y(this,"started",void 0),y(this,"finished",void 0),y(this,"birthdate",void 0),y(this,"age",void 0),y(this,"responses",[]),Object.assign(this,t),this.started=new Date},w=t.createContext({setState:{},state:{}}),E=function(){var e=t.useContext(w);if(!e)throw new Error("useGlobalState must be used within a GlobalStateContext");return e},P=function(r){var n=r.children,i=r.value,o=void 0===i?{}:i,s=b(t.useState(o),2),a=s[0],c=s[1];return e.jsx(w.Provider,Object.assign({value:{setState:c,state:a}},{children:n}),void 0)},x=function(){var e=E().state.questionnaire;if(!e)throw new Error("useQuestionnaire has no data");return e},T=function(){var e=E().state.config;if(!e)throw new Error("useConfig has no data");return e},R=function(){return{config:T(),questionnaire:x()}};function I(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function A(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?I(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):I(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}!function(e){e.DOB="dob",e.MULTIPLE_CHOICE="multiple_choice",e.MULTIPLE_SELECT="multiple_select"}(O||(O={})),function(e){e.LANDING="Landing",e.NO_RESULTS="No Results",e.RESULTS="Results",e.SUMMARY="Summary"}(j||(j={})),function(e){e.EDIT="Edit"}(m||(m={}));var N,D,L,k,C,_,q,U=A(A(A({},j),O),m);!function(e){e[e.FORWARD=1]="FORWARD",e[e.BACKWARD=-1]="BACKWARD"}(N||(N={})),function(e){e.COMPLETE="complete",e.CURRENT="current",e.INCOMPLETE="incomplete"}(D||(D={})),function(e){e.CALL="call",e.HYBRID="hybrid",e.ONLINE="online"}(L||(L={})),function(e){e.RESET="RESET",e.UPDATE="UPDATE"}(k||(k={})),function(e){e.DAY="day",e.MONTH="month",e.YEAR="year"}(C||(C={})),function(e){e.DEV="dev",e.EDIT="edit",e.VIEW="view"}(_||(_={})),function(e){e.BASE="usds-q",e.DEV_PANEL_SECTION="usds-q-dev-panel",e.DOB="usds-q-dob",e.MULTI_CHOICE="usds-q-multi-choice",e.MULTI_CHOICE_GROUP="usds-q-multi-choice-group",e.MULTI_SELECT="usds-q-multi-select",e.MULTI_SELECT_GROUP="usds-q-multi-select-group",e.NAVBAR="usds-q-navbar",e.NAVBAR_BUTTON="usds-q-navbar-button",e.PROGRESS_BAR="usds-q-progress-bar",e.PROGRESS_BAR_BOTTOM_SECTION="usds-q-progress-bar-bottom-section",e.PROGRESS_BAR_TOP_SECTION="usds-q-progress-bar-top-section",e.RESULTS_SUMMARY_BOX="usds-q-results-summary-box",e.RESULTS_SUMMARY_HEADER="usds-q-results-summary-header",e.STEP_FOOTER="usds-q-step-footer",e.STEP_HEADER="usds-q-step-header",e.STEP_INFO="usds-q-step-info",e.STEP_LAYOUT="usds-q-step-layout",e.STEP_LAYOUT_SECTION="usds-q-step-layout-section",e.STEP_SUBTITLE="usds-q-step-subtitle"}(q||(q={}));var B=function(e,t){return Object.values(e).includes(t)};function M(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function F(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?M(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):M(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var G=function(e,t){switch(null==t?void 0:t.type){case k.RESET:return new S;case k.UPDATE:return n.merge(F({},e),F({},t.value));default:return e}},Y=require("moment"),H=function(e){return!(!e||e.length<8)&&!!Y(e,"MM/DD/YYYY",!0).isValid()},V=function(e){if(H(e)){var t=new Date(+e.substring(6,10),+e.substring(0,2)-1,+e.substring(3,5));return o.DateTime.fromJSDate(t)}},Q=function(e){if(e&&H(e)){var t=V(e);if(t)return function(e){var t=o.DateTime.now(),r=t.year,n=t.month,i=t.day,s=e.year,a=e.month,c=e.day,u=r-s,l=0;n>=a?l=n-a:(u-=1,l=12+n-a);var d=0;return i>=c?d=i-c:(d=31+i-c,(l+=-1)<0&&(l=11,u-=1)),{days:d,months:l,years:u}}(t)}},W={buttons:{next:{label:"Get Started"}},id:j.LANDING,section:{id:j.LANDING},title:j.LANDING,type:j.LANDING},z={id:j.RESULTS,section:{id:j.RESULTS},title:j.RESULTS,type:j.RESULTS},J={landingPage:W,noResultsPage:{id:j.NO_RESULTS,section:{id:j.RESULTS},title:j.NO_RESULTS,type:j.NO_RESULTS},resultsPage:z,summaryPage:{buttons:{next:{label:"Submit"}},id:j.SUMMARY,section:{id:j.RESULTS},title:j.SUMMARY,type:j.SUMMARY}};function $(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function K(e,t,r){return t&&$(e.prototype,t),r&&$(e,r),e}var X=function(){function e(){h(this,e)}return K(e,null,[{key:"sanitize",value:function(e){return e.toLowerCase().trim()}},{key:"matches",value:function(t,r){return!(!t||!r)&&e.sanitize(t)===e.sanitize(r)}}]),e}();function Z(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ee(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Z(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Z(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var te=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return console.log(ee({},t))},re=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return(t||r)&&te("Created an empty element",t,r),e.jsx(e.Fragment,{children:t},void 0)},ne=function(){function t(){h(this,t)}return K(t,null,[{key:"getHeader",value:function(t,r){var n,i,o=null===(n=t.step)||void 0===n?void 0:n.title;if(!o)return re();r.steps.showStepId&&(o="".concat(null===(i=t.step)||void 0===i?void 0:i.id,": ").concat(o));return e.jsx("h3",Object.assign({className:"usa-card__heading ".concat(q.STEP_HEADER)},{children:o}),void 0)}},{key:"getSubtitle",value:function(t){var r,n=null===(r=t.step)||void 0===r?void 0:r.subTitle;return n?e.jsx("p",{className:q.STEP_SUBTITLE,dangerouslySetInnerHTML:{__html:n}},void 0):re()}},{key:"getInfoBox",value:function(t){var r,n=null===(r=t.step)||void 0===r?void 0:r.info;return n?e.jsx(i.SiteAlert,Object.assign({variant:"info",showIcon:!1,className:"outline-1px ".concat(q.STEP_INFO)},{children:n}),void 0):re()}},{key:"getFooter",value:function(t){var r,n=null===(r=t.step)||void 0===r?void 0:r.footer;return n?e.jsx("p",{className:"font-sans-6 ".concat(q.STEP_FOOTER),dangerouslySetInnerHTML:{__html:n}},void 0):re()}},{key:"resetQuestionable",value:function(e){e.dispatchForm({type:k.RESET}),e.wizard.goToStep("A")}},{key:"saveAsJson",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"questionable.json",r=new Blob([e],{type:"text/plain;charset=utf-8"});d.default.saveAs(r,t)}}]),t}(),ie=function(t){if(!R().config.dev)return re();return e.jsxs(e.Fragment,{children:[e.jsx(i.Accordion,{items:[{content:e.jsx("pre",{children:e.jsx("code",{children:JSON.stringify(t.form,null,4)},void 0)},void 0),expanded:!1,id:"developer-output",title:"Temporary developer panel"}]},void 0),e.jsx("br",{},void 0),e.jsx("nav",Object.assign({className:q.NAVBAR},{children:e.jsx(i.Button,Object.assign({type:"reset",secondary:!0,onClick:function(){return ne.resetQuestionable(t)}},{children:"Reset"}),void 0)}),void 0)]},void 0)},oe=function(t){var r=R(),n=r.config,i=r.questionnaire;if(n.progressBar.hide)return re();var o=i.getProgressPercent(t,n);return e.jsx("div",Object.assign({className:q.PROGRESS_BAR},{children:e.jsx(f.default,{completed:o,bgColor:n.progressBar.bgColor,baseBgColor:n.progressBar.baseBgColor,isLabelVisible:!1,borderRadius:"0px"},void 0)}),void 0)},se=function(t){return e.jsx(i.StepIndicatorStep,{label:t.name,status:t.status||"incomplete"},t.id)},ae=function(t){var r=R(),n=r.config,o=r.questionnaire;if(n.progressBar.hide)return re();var s=o.getSections(t,n);return 0===s.length?re():e.jsx(i.StepIndicator,Object.assign({centered:!0,counters:"small"},{children:s.map(se)}),void 0)},ce=function(t){var r=t.props,n=t.position,i=R().config;if(i.progressBar.hide||i.progressBar.position!==n)return re();switch(i.progressBar.type){case"progress-bar":return e.jsx(oe,Object.assign({},r),void 0);case"step-indicator":return e.jsx(ae,Object.assign({},r),void 0);default:return re("Could not find progress type",i.progressBar.type)}},ue=require("./survey.json");function le(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function de(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?le(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):le(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var fe={properties:{step:{$ref:"#/definitions/IStep",title:"Step"}}},pe=de(de({type:"object"},fe),ue),ve=function(){function t(){h(this,t)}return K(t,null,[{key:"getReason",value:function(e,t,r){var n,i=null===(n=t.match)||void 0===n?void 0:n.explanation,o=r.questionnaire,s=r.config;if(!i)return"";if(null!=s&&s.dev&&t.match){var a,c;if(i+="<br><br>",void 0!==t.match.ageCalc||void 0!==t.match.minAge||void 0!==t.match.maxAge)i+="You are ".concat(null===(a=e.form.age)||void 0===a?void 0:a.years," years "),i+="and ".concat(null===(c=e.form.age)||void 0===c?void 0:c.months," months old. ");Object.keys(t.match.responses).forEach((function(e){var t=o.getQuestionById(e);i+='You answered "<b>'.concat(t.answer,'</b>" to the question "<i>').concat(t.title,'.</i>" ')}))}return i}},{key:"getResults",value:function(r,n){return n.questionnaire.getResults(r.form).map((function(i){return e.jsxs("li",Object.assign({className:"padding-bottom-2"},{children:[e.jsxs("span",{children:[i.label,":","  ",e.jsx("b",{children:i.name},void 0)]},void 0),e.jsx("div",{className:"text-light",dangerouslySetInnerHTML:{__html:t.getReason(r,i,n)}},void 0)]}),"".concat(r.stepId,"_").concat(i.id))}))}}]),t}(),ge=function(){function e(){h(this,e)}return K(e,null,[{key:"goToStep",value:function(e,t){t.wizard.goToStep(e)}},{key:"goToNextStep",value:function(t,r,n){e.goToStep(r.getNextStep(t,n),t)}},{key:"goToPrevStep",value:function(t,r,n){e.goToStep(r.getPreviousStep(t,n),t)}},{key:"isNextEnabled",value:function(t){var r,n,i;if(null==t||!t.step)throw new Error("This survery is not defined");return t.stepId===U.LANDING||(t.stepId===U.SUMMARY||!!t.form&&((null===(r=t.step)||void 0===r?void 0:r.type)===O.DOB?void 0!==(null===(n=t.form)||void 0===n||null===(i=n.age)||void 0===i?void 0:i.years)&&t.form.age.years>=0:e.isValid(t.form,t.step.id)))}},{key:"isValid",value:function(e,t){var r,i=e.responses.find((function(e){return e.id===t}));if(!i)return!1;var o=n.values(i.answers);switch(i.type){case U.DOB:return void 0!==(null==e||null===(r=e.age)||void 0===r?void 0:r.years)&&e.age.years>0;case U.MULTIPLE_CHOICE:return void 0!==i.answer&&void 0!==(null==o?void 0:o.find((function(e){return e.title===i.answer})));default:return!0}}},{key:"getFieldSetName",value:function(e){return n.kebabCase(e.step.title)}},{key:"getDomId",value:function(t,r){var i=e.getFieldSetName(r);return"".concat(i,"-").concat(n.kebabCase(t))}}]),e}(),be=function(){function t(){h(this,t)}return K(t,null,[{key:"updateForm",value:function(e,t){Object.assign(t.step,{answer:e});var r={answers:[t.step]};return t.dispatchForm({type:k.UPDATE,value:r})}},{key:"isSelected",value:function(e,t){if(null!=t&&t.form){var r=t.form.responses.find((function(e){return e.id===t.step.id}));if(r)return ge.isValid(t.form,t.step.id)&&r.answer===e}}},{key:"getRadio",value:function(r,n,o){var s,a=function(){return t.updateForm(r.title,n)},c=ge.getDomId(r.title,n);return e.jsx(i.Radio,{id:c,name:ge.getFieldSetName(n),label:r.title,value:r.title,checked:!0===t.isSelected(r.title,n),className:q.MULTI_CHOICE,onChange:a,onClick:a,tile:!0===(null===(s=o.questions)||void 0===s?void 0:s.showAnswerBorder)},c)}},{key:"getRadios",value:function(r,n){return e.jsx(i.Fieldset,Object.assign({legend:r.step.title,className:q.MULTI_CHOICE_GROUP,legendStyle:"srOnly"},{children:r.step.answers.map((function(e){return t.getRadio(e,r,n)}))}),void 0)}},{key:"getCheckbox",value:function(r,n,o){var s,a=function(){return t.updateForm(r.title,n)},c=ge.getDomId(r.title,n);return e.jsx(i.Checkbox,{id:c,name:ge.getFieldSetName(n),label:r.title,value:r.title,checked:!0===t.isSelected(r.title,n),className:q.MULTI_SELECT,onChange:a,onClick:a,tile:!0===(null===(s=o.questions)||void 0===s?void 0:s.showAnswerBorder)},c)}},{key:"getCheckboxes",value:function(r,n){return e.jsx(i.Fieldset,Object.assign({legend:r.step.title,className:q.MULTI_SELECT_GROUP,legendStyle:"srOnly"},{children:r.step.answers.map((function(e){return t.getCheckbox(e,r,n)}))}),void 0)}},{key:"getBirthdate",value:function(e){var t;if(null!==(t=e.form)&&void 0!==t&&t.birthdate)return V(e.form.birthdate)}},{key:"toBirthdate",value:function(e){if(e.month&&e.day&&e.year)return"".concat(e.month.padStart(2,"0"),"/").concat(e.day.padStart(2,"0"),"/").concat(e.year)}}]),t}(),he=function(t){return e.jsx(i.Button,Object.assign({className:"".concat(q.NAVBAR_BUTTON," ").concat(q.NAVBAR_BUTTON,"-").concat(t.dir),"data-testid":"".concat(t.dir,"-button-").concat(t.stepId),disabled:t.disabled(),onClick:t.onClick,type:"button",unstyled:"link"===t.mode,outline:"link"!==t.mode&&"prev"===t.dir},{children:t.label}),void 0)},ye=function(t){var r,n,i=R(),o=i.questionnaire,s=i.config,a=t.step,c=t.verticalPos!==s.nav.prev.verticalPos,u=t.stepId===U.LANDING||t.stepId===o.flow[1],l=t.stepId===U.RESULTS||t.stepId===U.NO_RESULTS,d=s.mode!==_.EDIT||t.stepId===o.flow[0]&&s.mode===_.EDIT;if(c||(u||l)&&d)return re();var f=(null==a||null===(r=a.buttons)||void 0===r||null===(n=r.prev)||void 0===n?void 0:n.label)||s.nav.prev.defaultLabel||"Previous";return e.jsx(he,Object.assign({},{dir:"prev",disabled:function(){return!1},label:f,mode:s.nav.prev.mode||"link",onClick:function(){return ge.goToPrevStep(t,o,s)},stepId:"".concat(t.stepId)}),void 0)},Oe=function(t){var r,n,i=R(),o=i.questionnaire,s=i.config,a=t.step,c=t.verticalPos!==s.nav.next.verticalPos,u=t.stepId===U.RESULTS||t.stepId===U.NO_RESULTS,l=s.mode!==_.EDIT||t.stepId===o.flow[o.flow.length-1]&&s.mode===_.EDIT;if(c||u&&l)return re();var d=(null==a||null===(r=a.buttons)||void 0===r||null===(n=r.next)||void 0===n?void 0:n.label)||s.nav.next.defaultLabel||"Previous";return e.jsx(he,Object.assign({},{dir:"next",disabled:function(){return s.mode===_.VIEW&&!ge.isNextEnabled(t)},label:d,mode:s.nav.next.mode||"button",onClick:function(){return ge.goToNextStep(t,o,s)},stepId:"".concat(t.stepId)}),void 0)},je=function(t){return e.jsxs("nav",Object.assign({className:"".concat(q.NAVBAR," ").concat(q.NAVBAR,"-").concat(t.verticalPos)},{children:[e.jsx(ye,Object.assign({},t),void 0),e.jsx(Oe,Object.assign({},t),void 0)]}),void 0)};function me(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Se(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?me(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):me(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var we=function(t){var r=R().questionnaire;return e.jsxs("div",{children:[e.jsx(je,Object.assign({},Se(Se({},t),{},{verticalPos:"top"})),void 0),e.jsx("section",{children:e.jsx(i.CardGroup,{children:e.jsxs(i.Card,Object.assign({headerFirst:!0,gridLayout:{tablet:{col:12}},containerProps:{className:"border-ink"}},{children:[e.jsx(i.CardHeader,Object.assign({className:"bg-base-lightest"},{children:e.jsxs("h1",{children:["Edit the ",r.header]},void 0)}),void 0),e.jsx(i.CardBody,Object.assign({className:"padding-top-3"},{children:t.children}),void 0),e.jsx(i.CardFooter,{children:'Click "Save" to save your edits, or "Next" to continue editing'},void 0)]}),void 0)},void 0)},void 0)]},void 0)},Ee=function(t){var r=R().questionnaire,o=function(e){var t=de({},fe);return B(j,e.step.type)?t.properties.step.$ref="#/definitions/IPage":B(O,e.step.type)&&(t.properties.step.$ref="#/definitions/IQuestion"),n.merge(t,pe)}(t),s=n.kebabCase(r.header);return e.jsx(p.default,Object.assign({schema:o,uiSchema:{step:{"ui:order":["title","subTitle","bodyHeader","bodySubHeader","body","info","footer","*"]}},onSubmit:function(e){var t=e.formData;ne.saveAsJson(t,"".concat(s,".json"))},formData:{step:t.step}},{children:e.jsx("div",{children:e.jsx(i.Button,Object.assign({type:"submit"},{children:"Save"}),void 0)},void 0)}),void 0)},Pe=function(t){return e.jsx(we,Object.assign({},t,{children:e.jsx(Ee,Object.assign({},t),void 0)}),void 0)};function xe(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Te(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?xe(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):xe(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Re(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ie(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Re(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Re(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Ae=function(t){var r=R().config,n=r.steps,o=n.borderClass,s=n.titleClass;return e.jsxs("div",{children:[e.jsx(je,Object.assign({},Ie(Ie({},t),{},{verticalPos:"top"})),void 0),e.jsx("section",Object.assign({className:q.STEP_LAYOUT},{children:e.jsx(i.CardGroup,{children:e.jsxs(i.Card,Object.assign({headerFirst:!0,gridLayout:{tablet:{col:12}},containerProps:{className:o}},{children:[e.jsx(i.CardHeader,Object.assign({className:s},{children:ne.getHeader(t,r)}),void 0),e.jsxs(i.CardBody,{children:[ne.getSubtitle(t),t.children,ne.getInfoBox(t)]},void 0),e.jsx(i.CardFooter,{children:ne.getFooter(t)},void 0)]}),void 0)},void 0)}),void 0),e.jsx(je,Object.assign({},Ie(Ie({},t),{},{verticalPos:"bottom"})),void 0)]},void 0)},Ne=function(t){var r=t.step;return r?e.jsx(Ae,Object.assign({},t,{children:e.jsx("p",{children:r.body},void 0)}),void 0):re()},De=function(t){return t.step?e.jsx(Ae,Object.assign({},t),void 0):re()},Le=function(t){var r=t.step,n=R(),o=n.questionnaire;if(!r)return re();var s=o.getAction();return e.jsx(Ae,Object.assign({},t,{children:e.jsxs(i.SummaryBox,Object.assign({heading:r.bodyHeader||"",className:q.RESULTS_SUMMARY_HEADER},{children:[e.jsx("p",{children:r.bodySubHeader},void 0),e.jsx("ul",Object.assign({className:"usa-list usa-list--unstyled ".concat(q.RESULTS_SUMMARY_BOX)},{children:ve.getResults(t,n)}),void 0),e.jsx("p",{dangerouslySetInnerHTML:{__html:(null==r?void 0:r.body)||""}},void 0),e.jsx("h2",{children:s.title},void 0),e.jsx("p",{children:s.description},void 0),e.jsx("p",{dangerouslySetInnerHTML:{__html:s.action}},void 0),"."]}),void 0)}),void 0)},ke=function(t){var r=t.form.responses.map((function(t){return e.jsx("li",Object.assign({className:"padding-bottom-2"},{children:e.jsxs("span",Object.assign({className:"text-light"},{children:[t.title,":  ",e.jsx("b",{children:t.answer},void 0)]}),void 0)}),t.id)}));return e.jsx("ul",Object.assign({className:"usa-list usa-list--unstyled"},{children:r}),void 0)},Ce=function(t){return t.step?e.jsx(Ae,Object.assign({},t,{children:ke(t)}),void 0):re()};function _e(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function qe(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?_e(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_e(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Ue(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var Be=function(r){var o,s,a,c,u,l,d=r.step,f={day:null===(o=be.getBirthdate(r))||void 0===o||null===(s=o.day)||void 0===s?void 0:s.toString(),month:null===(a=be.getBirthdate(r))||void 0===a||null===(c=a.month)||void 0===c?void 0:c.toString(),year:null===(u=be.getBirthdate(r))||void 0===u||null===(l=u.year)||void 0===l?void 0:l.toString()},p=b(t.useState(f),2),v=p[0],g=p[1];if(!d)return re();var h,O=function(e,t){var n=e.target.value;if(n){v[t]=n,g(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Ue(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ue(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},v));var i=be.toBirthdate(v),o=Q(i);o&&r.dispatchForm({type:k.UPDATE,value:{age:o,birthdate:i}})}},j=function(t,o){var s=2;return t===C.YEAR&&(s=4),e.jsx(i.DateInput,{id:ge.getDomId(t,r),name:o,label:n.capitalize(t),unit:t,maxLength:s,minLength:s,defaultValue:v[t],onChange:function(e){return O(e,t)}},void 0)};return h="date_of_birth",e.jsxs(i.DateInputGroup,{children:[j(C.MONTH,h),j(C.DAY,h),j(C.YEAR,h)]},void 0)},Me=function(t){return e.jsx(Ae,Object.assign({},t,{children:e.jsx(Be,Object.assign({},t),void 0)}),void 0)},Fe=function(e){var t,r=R().config;return void 0===(null==e||null===(t=e.step)||void 0===t?void 0:t.answers)?re():be.getCheckboxes(e,r)},Ge=function(t){return e.jsx(Ae,Object.assign({},t,{children:e.jsx(Fe,Object.assign({},t),void 0)}),void 0)},Ye=function(e){var t,r=R().config;return void 0===(null==e||null===(t=e.step)||void 0===t?void 0:t.answers)?re("Question and answer are not defined"):be.getRadios(e,r)},He=function(t){return e.jsx(Ae,Object.assign({},t,{children:e.jsx(Ye,Object.assign({},t),void 0)}),void 0)};function Ve(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Qe(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Ve(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ve(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var We=function(t,r){return B(O,r.type)?function(t){var r=t.stepId,n=R().questionnaire,i=n.getStepById("".concat(r));if(!B(O,i.type))return re("Not a question");var o=n.getQuestionById(i.id),s=Qe({},Qe({step:o},t));switch(o.type){case O.DOB:return e.jsx(Me,Object.assign({},s),void 0);case O.MULTIPLE_CHOICE:return e.jsx(He,Object.assign({},s),void 0);case O.MULTIPLE_SELECT:return e.jsx(Ge,Object.assign({},s),void 0);default:return re("Question does not exist","QuestionFactory")}}(t):B(j,r.type)?function(t){var r=t.stepId,n=R().questionnaire,i=n.getStepById("".concat(r));if(!B(j,i.type))return re("Not a page");var o=n.getPageById(i.id),s=qe({},qe({step:o},t));switch(o.type){case j.LANDING:return e.jsx(Ne,Object.assign({},s),void 0);case j.NO_RESULTS:return e.jsx(De,Object.assign({},s),void 0);case j.RESULTS:return e.jsx(Le,Object.assign({},s),void 0);case j.SUMMARY:return e.jsx(Ce,Object.assign({},s),void 0);default:return re("Page does not exist","PageFactory")}}(t):re("Step does not exist","StepFactory")},ze=function(t){var r=t.stepId,n=R(),i=n.questionnaire,o=n.config,s=i.getStepById("".concat(r));return o.mode===_.EDIT?function(t,r){var n=Te({},Te({step:R().questionnaire.getStepById(r.id)},t));if(B(O,r.type)){var i=n;return e.jsx(Pe,Object.assign({},i),void 0)}if(B(j,r.type)){var o=n;return e.jsx(Pe,Object.assign({},o),void 0)}return re("Not an editable type")}(t,s):We(t,s)};function Je(e,t,r){if(!t.has(e))throw new TypeError("attempted to "+r+" private field on non-instance");return t.get(e)}function $e(e,t,r){return function(e,t,r){if(t.set)t.set.call(e,r);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=r}}(e,Je(e,t,"set"),r),r}function Ke(e,t){return function(e,t){return t.get?t.get.call(e):t.value}(e,Je(e,t,"get"))}function Xe(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ze(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Xe(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Xe(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var et=new WeakMap,tt=new WeakMap,rt=new WeakMap,nt=new WeakMap,it=new WeakMap,ot=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};h(this,e),et.set(this,{writable:!0,value:_.VIEW}),tt.set(this,{writable:!0,value:{next:{defaultLabel:"Next",horizontalPos:"left",mode:"button",verticalPos:"bottom"},prev:{defaultLabel:"Go back",horizontalPos:"left",mode:"link",verticalPos:"top"}}}),rt.set(this,{writable:!0,value:{baseBgColor:"#f0f0f0",bgColor:"#005ea2",hide:!1,position:"bottom",type:"progress-bar"}}),nt.set(this,{writable:!0,value:{showAnswerBorder:!0}}),it.set(this,{writable:!0,value:{borderClass:"border-0",showStepId:!1,titleClass:""}}),n.merge(this,t),this.dev&&(Ke(this,it).showStepId=!0)}return K(e,[{key:"dev",get:function(){return Ke(this,et)===_.DEV}},{key:"mode",get:function(){return Ke(this,et)},set:function(e){n.isString(e)?B(_,e)?$e(this,et,e):$e(this,et,_.VIEW):$e(this,et,e)}},{key:"nav",get:function(){return Ze({},Ke(this,tt))},set:function(e){n.merge(Ke(this,tt),e)}},{key:"progressBar",get:function(){return Ze({},Ke(this,rt))},set:function(e){n.merge(Ke(this,rt),e)}},{key:"questions",get:function(){return Ze({},Ke(this,nt))},set:function(e){n.merge(Ke(this,nt),e)}},{key:"steps",get:function(){return Ze({},Ke(this,it))},set:function(e){n.merge(Ke(this,it),e)}}]),e}();function st(e){return function(e){if(Array.isArray(e))return v(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||g(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function at(e){return(at="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ct(e,t,r,n){var i,o=arguments.length,s=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"===("undefined"==typeof Reflect?"undefined":at(Reflect))&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(s=(o<3?i(s):o>3?i(t,r,s):i(t,r))||s);return o>3&&s&&Object.defineProperty(t,r,s),s}function ut(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var lt=function(){function e(t){h(this,e),y(this,"questions",void 0),y(this,"header",void 0),y(this,"results",void 0),y(this,"flow",void 0),y(this,"sections",void 0),y(this,"actions",void 0),y(this,"pages",J),y(this,"steps",void 0),Object.assign(this,t),this.steps=st(this.questions),this.init(),this.flow=this.steps.map((function(e){return e.id}))}return K(e,[{key:"getStepById",value:function(e){var t=this.steps.find((function(t){return t.id===e}));if(!t)throw new Error("Step id: ".concat(e," not found in survery"));return t}},{key:"getPageById",value:function(e){var t=this.getStepById(e);if(!B(j,t.type))throw new Error("Step id: ".concat(e," is not a page"));return t}},{key:"getQuestion",value:function(e){if(!e.id)throw new Error("Question ".concat(e," is not defined"));return this.getQuestionById(e.id)}},{key:"getQuestionById",value:function(e){var t=this.getStepById(e);if(!B(O,t.type))throw new Error("Step id: ".concat(e," not a question"));return t}},{key:"getStep",value:function(e,t,r){var n=this,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new ot,o=-1!==this.flow.indexOf(e)?this.flow[this.flow.indexOf(e)+r]:void 0;if(!o)return e;if(i.mode===_.EDIT)return o;if(o===U.RESULTS&&0===this.getResults(t).length)return U.NO_RESULTS;if(o===U.NO_RESULTS&&this.getResults(t).length>0)return U.RESULTS;var s,a=this.getStepById(o);if(null==a||!a.requirements)return o;if(a.requirements.forEach((function(e){var r=n.meetsAllRequirements(e,t);s=void 0===s?r:s||r})),s)return o;var c=this.getStep(o,t,r);return c!==o?c:e}},{key:"getNextStep",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new ot,r=e.stepId;return this.getStep(r,e.form,N.FORWARD,t)}},{key:"getPreviousStep",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new ot,r=e.stepId;return this.getStep(r,e.form,N.BACKWARD,t)}},{key:"getProgressPercent",value:function(e,t){var r,n;if(X.matches(null===(r=e.step)||void 0===r||null===(n=r.section)||void 0===n?void 0:n.id,j.RESULTS))return 100;var i=this.getSections(e,t),o=i[i.length-1];if(null==o||!o.lastStep)return.5;var s=this.flow.indexOf("".concat(e.stepId)),a=o.lastStep+2;return t.mode===_.EDIT&&(a=this.flow.length-1),Math.round(s/a*100)}},{key:"getSections",value:function(e,t){var r=this;if(!e)return[];var n=e.stepId,i=this.getStepById(n),o=this.steps.indexOf(i),s=this.sections.filter((function(t){return 0===t.requirements.length||t.requirements.some((function(t){return r.meetsAllRequirements(t,e.form)}))}));return t.mode===_.EDIT&&(s=st(this.sections)),s.map((function(e){var t=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ut(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ut(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e);return t.lastStep=r.questions.reduce((function(t,r,n){return r.section.id===e.id?n:t}),-1),X.matches(t.id,j.RESULTS)?t.lastStep=r.questions.length-2:X.matches(t.id,j.LANDING)&&(t.lastStep=0),t.lastStep<0?t.status=D.INCOMPLETE:X.matches(t.id,i.section.id)?t.status=D.CURRENT:t.lastStep<o&&(t.status=D.COMPLETE),t}))}},{key:"getResults",value:function(e){var t=this;return this.results.filter((function(r){return r.requirements.some((function(n){return!!t.meetsAllRequirements(n,e)&&(Object.assign(r,{match:n}),!0)}))}))}},{key:"getAction",value:function(){var e=Math.floor(Math.random()*this.actions.length);return this.actions[e]}},{key:"init",value:function(){var e,t,r;if((null===(e=this.questions)||void 0===e?void 0:e.length)<=0)throw new Error("No questions have been defined.");if((null===(t=this.header)||void 0===t?void 0:t.length)<=0)throw new Error("No header has been defined.");if((null===(r=this.results)||void 0===r?void 0:r.length)<=0)throw new Error("No results have been defined.");var n="step is not correctly defined or defined more than once";if(this.steps[0].type!==j.LANDING&&this.steps.unshift(this.pages.landingPage),1!==this.steps.filter((function(e){return e.type===j.LANDING})).length)throw new Error("".concat(j.LANDING," ").concat(n,"."));if(this.steps[this.steps.length-1].type!==j.NO_RESULTS&&this.steps.push(this.pages.noResultsPage),1!==this.steps.filter((function(e){return e.type===j.NO_RESULTS})).length)throw new Error("".concat(j.NO_RESULTS," ").concat(n,"."));if(this.steps[this.steps.length-2].type!==j.RESULTS&&this.steps.splice(this.steps.length-1,0,this.pages.resultsPage),1!==this.steps.filter((function(e){return e.type===j.RESULTS})).length)throw new Error("".concat(j.RESULTS," ").concat(n,"."));if(this.steps[this.steps.length-3].type!==j.SUMMARY&&this.steps.splice(this.steps.length-2,0,this.pages.summaryPage),1!==this.steps.filter((function(e){return e.type===j.SUMMARY})).length)throw new Error("".concat(j.SUMMARY," ").concat(n,"."))}},{key:"meetsAllRequirements",value:function(t,r){var n=t.minAge,i=t.maxAge,o=t.responses,s=t.ageCalc;return e.meetsMinAgeRequirements(r,n)&&e.meetsMaxAgeRequirements(r,i)&&e.meetsAgeCalcRequirements(r,s)&&this.meetsAnswerRequirements(o)}},{key:"meetsAnswerRequirements",value:function(e){var t=this;return!e||e.length<=0||e.every((function(e){var r,n=t.getQuestion(e.question);return!((null===(r=n.answers)||void 0===r?void 0:r.length)>0)||e.answers.some((function(e){var t;return void 0!==n.answer&&n.answer===(null===(t=n.answers.find((function(t){return t.id===e.id})))||void 0===t?void 0:t.title)}))}))}}],[{key:"meetsMinAgeRequirements",value:function(e,t){if(!t)return!0;if(void 0===e.age)return!1;var r=e.age,n=r.years,i=r.months;return n>(null==t?void 0:t.years)||n>=(null==t?void 0:t.years)&&i>=(null==t?void 0:t.months)}},{key:"meetsMaxAgeRequirements",value:function(e,t){if(!t)return!0;if(void 0===e.age)return!1;var r=e.age,n=r.years,i=r.months;return n<(null==t?void 0:t.years)||n<=(null==t?void 0:t.years)&&i<=(null==t?void 0:t.months)}},{key:"meetsAgeCalcRequirements",value:function(e,t){return!t||void 0!==e.birthdate&&t(e.birthdate)}}]),e}();ct([u.ArrayUnique((function(e){return e.id}))],lt.prototype,"questions",void 0),ct([u.ArrayUnique((function(e){return e.label}))],lt.prototype,"results",void 0),ct([u.ArrayUnique((function(e){return e.id}))],lt.prototype,"sections",void 0),exports.Questionable=function(n){var i=n.questionnaire;if(!i)throw new Error("questionable is undefined");var o=b(r.useWizard(i.flow),2),s=o[0],a=o[1],c=b(t.useReducer(G,new S),2),u=c[0],l=c[1];return e.jsx(P,Object.assign({value:n},{children:e.jsxs("div",Object.assign({className:q.BASE},{children:[e.jsx("section",Object.assign({className:"section ".concat(q.PROGRESS_BAR_TOP_SECTION)},{children:e.jsx(ce,Object.assign({},{position:"top",props:{dispatchForm:l,form:u,stepId:s,wizard:a}}),void 0)}),void 0),e.jsx("section",Object.assign({className:"section ".concat(q.STEP_LAYOUT_SECTION)},{children:e.jsx(ze,Object.assign({},{dispatchForm:l,form:u,stepId:s,wizard:a}),void 0)}),void 0),e.jsx("section",Object.assign({className:"section ".concat(q.PROGRESS_BAR_BOTTOM_SECTION)},{children:e.jsx(ce,Object.assign({},{position:"bottom",props:{dispatchForm:l,form:u,stepId:s,wizard:a}}),void 0)}),void 0),e.jsx("section",Object.assign({className:"section ".concat(q.DEV_PANEL_SECTION)},{children:e.jsx(ie,Object.assign({},{dispatchForm:l,form:u,stepId:s,wizard:a}),void 0)}),void 0)]}),void 0)}),void 0)},exports.QuestionableConfig=ot,exports.Questionnaire=lt,exports.surveySchema=ue;
//# sourceMappingURL=index.js.map
