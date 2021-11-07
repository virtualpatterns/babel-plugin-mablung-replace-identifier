import { VisitorError } from '@virtualpatterns/babel-plugin-mablung/index'

class ReplaceIdentifierError extends VisitorError {

  constructor(...parameter) {
    super(...parameter)
  }

}

export { ReplaceIdentifierError }
