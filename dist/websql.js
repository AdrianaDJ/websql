!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.websql=r():e.websql=r()}(global,(function(){return function(e){var r={};function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=e,o.c=r,o.d=function(e,r,t){o.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,r){if(1&r&&(e=o(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)o.d(t,n,function(r){return e[r]}.bind(null,n));return t},o.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(r,"a",r),r},o.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},o.p="",o(o.s=0)}([function(e,r,o){"use strict";var t=this&&this.__awaiter||function(e,r,o,t){return new(o||(o=Promise))((function(n,s){function i(e){try{d(t.next(e))}catch(e){s(e)}}function a(e){try{d(t.throw(e))}catch(e){s(e)}}function d(e){e.done?n(e.value):new o((function(r){r(e.value)})).then(i,a)}d((t=t.apply(e,r||[])).next())}))};Object.defineProperty(r,"__esModule",{value:!0});const n=o(1);class s{constructor(e,r={allowMainWebWorker:!1,allowWebWorkerFallback:!1}){if(this.workerUrl=e,this.options=r,this.databaseInstanceCreated=!1,this.postMessageToWorker=(e,r=[],o={})=>new Promise((t,n)=>{const i=new s.MessageChannel;i.port1.onmessage=r=>{i.port1.close();const o=r.data.error;if(o)return n(s.translateError(o));const a=this.remapper(e,r.data.output);t(a)};const a=Object.assign({args:r.slice(),functionName:e},o),d=[i.port2];s.isNodejs?this.worker.postMessage(Object.assign({},a,{transfer:d}),d):s.isSharedWorkerSupported?this.worker.port.postMessage(a,d):this.worker.postMessage(a,d)}),s.isNodejs){console.log("websql: Using Node.JS Worker");const{MessageChannel:r,Worker:o}=require("worker_threads");this.worker=new o(e),s.MessageChannel=r}else if(s.isSharedWorkerSupported)console.log("websql: Using Shared Worker"),this.worker=new SharedWorker(e),this.worker.port.start();else if(!s.isSharedWorkerSupported&&s.isWorkerSupported&&!s.isIEOrLegacyEdge&&r.allowWebWorkerFallback)console.warn("websql: Using Web Worker. Experience will be degraded."),this.worker=new Worker(e);else{if(s.isSharedWorkerSupported||s.isWorkerSupported&&!s.isIEOrLegacyEdge||!r.allowMainWebWorker)throw new Error("Shared Worker are not available in your browser and Web Worker / Web Worker in Main Thread fallback is disabled. Aborting.");{console.warn("websql: Using Pseudo Web Worker. Experience will be degraded heavily."),console.log("Database.isWorkerSupported ",s.isWorkerSupported),console.log("Database.isIEOrLegacyEdge ",s.isIEOrLegacyEdge);const r=o(2);this.worker=new r(e)}}return s.isNodejs||(s.MessageChannel=window.MessageChannel,window.addEventListener("unload",()=>t(this,void 0,void 0,(function*(){this.databaseInstanceCreated&&(s.isSharedWorkerSupported?yield this.postMessageToWorker("saveChanges"):yield this.postMessageToWorker("close"))})))),this.createNewProxy(this,(e,...r)=>t(this,void 0,void 0,(function*(){if("_getWorkerInstance"===e)return this.worker;return this.databaseInstanceCreated||(yield this.createDatabaseInstance()),yield this.postMessageToWorker(e,r)})))}createNewProxy(e,r){return new Proxy(e,{deleteProperty:()=>{throw new Error("Forbidden operation, object is frozen")},get:(e,o)=>"then"===o?null:(...e)=>t(this,void 0,void 0,(function*(){return r(o.toString(),...e)})),has:()=>{throw new Error("Forbidden operation, object is frozen")},set:()=>{throw new Error("Forbidden operation, object is frozen")}})}createDatabaseInstance(){return t(this,void 0,void 0,(function*(){yield this.postMessageToWorker("constructor"),this.databaseInstanceCreated=!0}))}remapper(e,r){switch(e){case"prepare":const e=r;return this.createNewProxy({},(r,...o)=>t(this,void 0,void 0,(function*(){return yield this.postMessageToWorker(`statements.${r.toString()}`,o,{statementId:e})})))}return r}static translateError(e){const r=new Error(e.message);return r.stack=e.stack,r.name=e.name,r}}s.mountName="/sqleet",s.isNodejs="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,s.isSharedWorkerSupported=!s.isNodejs&&"undefined"!=typeof window&&void 0!==window.SharedWorker,s.isWorkerSupported=!s.isNodejs&&"undefined"!=typeof window&&void 0!==window.Worker,s.isIEOrLegacyEdge="undefined"!=typeof window&&n.isIEOrLegacyEdge(),r.Database=s},function(e,r,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.isIEOrLegacyEdge=function(){const e=window.navigator.userAgent;return e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0}},function(module,exports,__webpack_require__){"use strict";function doEval(self,__pseudoworker_script){(function(){eval(__pseudoworker_script)}).call(global)}function PseudoWorker(e){var r,o,t=[],n=[],s=[],i=[],a=[],d=!1,c=this;function u(e,r){for(var o=-1;++o<e.length;)e[o]&&r(e[o])}function l(e){var r=function(e){return function(r){r({type:"error",error:e,message:e.message})}}(e);"function"==typeof c.onerror&&r(c.onerror),o&&"function"==typeof o.onerror&&r(o.onerror),u(n,r),u(i,r)}function f(e,r){function t(o){try{o({data:e,ports:r})}catch(e){l(e)}}o&&"function"==typeof o.onmessage&&t(o.onmessage),u(s,t)}function p(){d=!0}function g(e){function r(r){r({data:e})}d||("function"==typeof c.onmessage&&r(c.onmessage),u(t,r))}function h(e,r){"message"===e?s.push(r):"error"===e&&i.push(r)}var w=new XMLHttpRequest;return w.open("GET",e),w.onreadystatechange=function(){if(4===w.readyState)if(w.status>=200&&w.status<400){r=w.responseText,doEval(o={postMessage:g,addEventListener:h,close:p},r);var t=a;a=[];for(var n=0;n<t.length;n++)f(t[n].msg,t[n].transfer)}else l(new Error("cannot find script "+e))},w.send(),c.postMessage=function(e,o){if(void 0===e)throw new Error("postMessage() requires an argument");d||(r?f(e,o):a.push({msg:e,transfer:o||void 0}))},c.addEventListener=function(e,r){"message"===e?t.push(r):"error"===e&&n.push(r)},c.removeEventListener=function(e,r){var o;if("message"===e)o=t;else{if("error"!==e)return;o=n}for(var s=-1;++s<o.length;){if(o[s]===r){delete o[s];break}}},c.terminate=p,c}module.exports=PseudoWorker}])}));