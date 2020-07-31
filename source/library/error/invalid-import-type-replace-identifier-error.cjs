import { ReplaceIdentifierError } from './replace-identifier-error.cjs'

class InvalidImportTypeReplaceIdentifierError extends ReplaceIdentifierError {

  constructor(type) {
    super(`Invalid import type '${type}'.`)
  }

}

export { InvalidImportTypeReplaceIdentifierError }
