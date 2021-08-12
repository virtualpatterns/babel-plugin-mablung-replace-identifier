import { VisitorError } from '@virtualpatterns/babel-plugin-mablung/visitor-error'

class ReplaceIdentifierError extends VisitorError {

  constructor(...parameter) {
    super(...parameter)
  }

}

export { ReplaceIdentifierError }
