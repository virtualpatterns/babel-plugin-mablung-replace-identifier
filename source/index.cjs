const { CreatePlugin } = require('@virtualpatterns/mablung-babel-plugin/create-plugin')

const { Visitor } = require('./library/visitor.cjs')

module.exports = CreatePlugin(Visitor)
