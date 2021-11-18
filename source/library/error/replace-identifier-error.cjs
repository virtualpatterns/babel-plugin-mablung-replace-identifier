import { VisitorError } from '@virtualpatterns/babel-plugin-mablung'

class ReplaceIdentifierError extends VisitorError {

  constructor(...parameter) {
    super(...parameter)
  }

}

export { ReplaceIdentifierError }
