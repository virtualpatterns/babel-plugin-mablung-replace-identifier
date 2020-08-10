import { addDefault as AddDefaultImport, addNamed as AddNamedImport, addNamespace as AddNamespaceImport, addSideEffect as AddSideEffectImport } from '@babel/helper-module-imports'
import Is from '@pwn/is'
import * as Parser from '@babel/parser'
import { Visitor as BaseVisitor } from '@virtualpatterns/mablung-babel-plugin/visitor'

import { InvalidImportTypeReplaceIdentifierError } from './error/invalid-import-type-replace-identifier-error.cjs'

class Visitor extends BaseVisitor {

  constructor(babel) {
    super(babel)

    this._programPath = null
    this._importIdentifier = []

  }

  get nodeType() {
    return [ 'Program', 'Identifier' ]
  }

  onProgramNode(path) {
    // console.log(`Visitor.onProgramNode('${path.node.name}')`)

    this._programPath = path
    this._importIdentifier = []

  }

  onIdentifierNode(path, state) {
    // console.log(`Visitor.onIdentifierNode('${path.node.name}', state)`)

    let option = state.opts
    let rule = option.rule

    rule.forEach((rule) => {

      rule.searchForPattern = rule.searchForPattern ? rule.searchForPattern : Is.regexp(rule.searchFor) ? rule.searchFor : new RegExp(rule.searchFor, 'gi')
      rule.parserOption = rule.parserOption ? rule.parserOption : {}

      if (rule.searchForPattern.test(path.node.name)) {

        // console.log(`Replacing '${path.node.name}' with '${rule.replaceWith}'`)

        // if (rule.parserOption) {
        //   console.dir(rule.parserOption)
        // }

        if(this._importIdentifier.length <= 0) {

          rule.addImport = rule.addImport ? rule.addImport : []
          rule.addImport.forEach((addImport) => {

            switch (addImport.type) {
              case 'default':
                this._importIdentifier.push(AddDefaultImport(this._programPath, addImport.source, addImport.option))
                break
              case 'named':
                this._importIdentifier.push(AddNamedImport(this._programPath, addImport.name, addImport.source, addImport.option))
                break
              case 'namespace':
                this._importIdentifier.push(AddNamespaceImport(this._programPath, addImport.source, addImport.option))
                break
              case 'sideEffect':
                AddSideEffectImport(this._programPath, addImport.source)
                break
              default:
                throw new InvalidImportTypeReplaceIdentifierError(addImport.type)
            }
            
          })

          // this supports indexed __importIdentifier (.e.g. __importIdentifier_5)
          rule.replaceWith = this._importIdentifier.length <= 0 ? rule.replaceWith : this._importIdentifier.reduce((replaceWith, importIdentifier, index) => replaceWith = replaceWith.replace(new RegExp(`__importIdentifier_${index}`, 'gi'), importIdentifier.name), rule.replaceWith)
          
          // this supports non-indexed __importIdentifier, as was supported only initially
          rule.replaceWith = this._importIdentifier.length <= 0 ? rule.replaceWith : rule.replaceWith.replace(new RegExp('__importIdentifier', 'gi'), this._importIdentifier[this._importIdentifier.length - 1].name)
          
          rule.replaceWithNode = rule.replaceWithNode ?  rule.replaceWithNode : Parser.parseExpression(rule.replaceWith, rule.parserOption)
  
          this._importIdentifier = []

        }

        path.replaceWith(rule.replaceWithNode)

      }

    })

  }

}

export { Visitor }
