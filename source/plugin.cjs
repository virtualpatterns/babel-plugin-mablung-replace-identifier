const { CreatePlugin } = require('@virtualpatterns/babel-plugin-mablung/index')

const { Visitor } = require('./library/visitor.cjs')

module.exports = CreatePlugin(Visitor)
