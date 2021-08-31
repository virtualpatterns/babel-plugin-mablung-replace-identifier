const { CreatePlugin } = require('@virtualpatterns/babel-plugin-mablung/create-plugin')
const { Visitor } = require('./library/visitor.cjs')

module.exports = CreatePlugin(Visitor)
