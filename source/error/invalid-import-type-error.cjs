import { ReplaceIdentifierError } from './replace-identifier-error.cjs'

class InvalidImportTypeError extends ReplaceIdentifierError {

  constructor(type) {
    super(`Invalid import type '${type}'.`)
  }

}

export { InvalidImportTypeError }
