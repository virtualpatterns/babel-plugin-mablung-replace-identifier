"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _plugin = require("@virtualpatterns/mablung-babel-plugin/plugin");

var _visitor = require("./visitor.cjs");

var _default = _plugin.Plugin.createPlugin(_visitor.Visitor);

exports.default = _default;
//# sourceMappingURL=index.cjs.map