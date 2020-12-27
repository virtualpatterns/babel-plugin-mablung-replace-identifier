"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidImportTypeReplaceIdentifierError = void 0;

var _replaceIdentifierError = require("./replace-identifier-error.cjs");

class InvalidImportTypeReplaceIdentifierError extends _replaceIdentifierError.ReplaceIdentifierError {
  constructor(type) {
    super(`Invalid import type '${type}'.`);
  }

}

exports.InvalidImportTypeReplaceIdentifierError = InvalidImportTypeReplaceIdentifierError;
//# sourceMappingURL=invalid-import-type-replace-identifier-error.cjs.map