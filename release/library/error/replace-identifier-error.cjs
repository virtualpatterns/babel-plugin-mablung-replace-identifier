"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReplaceIdentifierError = void 0;

var _visitorError = require("@virtualpatterns/mablung-babel-plugin/visitor-error");

class ReplaceIdentifierError extends _visitorError.VisitorError {
  constructor(...parameter) {
    super(...parameter);
  }

}

exports.ReplaceIdentifierError = ReplaceIdentifierError;
//# sourceMappingURL=replace-identifier-error.cjs.map