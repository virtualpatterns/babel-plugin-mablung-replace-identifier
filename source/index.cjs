const { CreatePlugin } = require('@virtualpatterns/babel-plugin-mablung')

const { Visitor } = require('./library/visitor.cjs')

module.exports = CreatePlugin(Visitor)
