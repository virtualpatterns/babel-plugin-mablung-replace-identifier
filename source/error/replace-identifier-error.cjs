import { VisitorError } from '@virtualpatterns/mablung-babel-plugin/visitor-error'

class ReplaceIdentifierError extends VisitorError {

  constructor(...parameter) {
    super(...parameter)
  }

}

export { ReplaceIdentifierError }
