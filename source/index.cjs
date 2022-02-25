import { CreatePlugin } from '@virtualpatterns/babel-plugin-mablung'

import { Visitor } from './library/visitor.cjs'

module.exports = CreatePlugin(Visitor)
