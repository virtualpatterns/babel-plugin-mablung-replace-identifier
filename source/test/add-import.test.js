import { createRequire as CreateRequire } from 'module'
import Babel from '@babel/core'
import Path from 'path'
import Test from 'ava'
import URL from 'url'

import { InvalidImportTypeError } from '../library/error/invalid-import-type-error.cjs'

const Require = CreateRequire(import.meta.url)
const SourceFilePath = URL.fileURLToPath(import.meta.url).replace('release/', 'source/')
const SourceFolderPath = Path.dirname(SourceFilePath).replace('release/', 'source/')

Test.beforeEach((test) => {

  test.context.codeIn = 'console.log(__42)'
  test.context.option = {
    'root': SourceFolderPath,
    'plugins': [
      [
        Require.resolve('@virtualpatterns/babel-plugin-mablung-replace-identifier'),
        {
          'rule': [
            {
              'searchFor': /__42/gi,
              'replaceWith': '42',
              'addImport': []
            }
          ]
        }
      ]
    ]
  }

})

Test('plugins: [ [ \'...\', { rule: [ addImport: default ] } ] ]', async (test) => {

  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'default',
    'source': 'url',
    'option': {
      'nameHint': 'URL'
    }
  })

  let { code: actualCodeOut } = await Babel.transformAsync(test.context.codeIn, test.context.option)
  let expectedCodeOut = 'import _URL from "url";\n' +
                        'console.log(42);'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('plugins: [ [ \'...\', { rule: [ addImport: named ] } ] ]', async (test) => {

  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'named',
    'name': 'createRequire',
    'source': 'module'
  })

  let { code: actualCodeOut } = await Babel.transformAsync(test.context.codeIn, test.context.option)
  let expectedCodeOut = 'import { createRequire as _createRequire } from "module";\n' +
                        'console.log(42);'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('plugins: [ [ \'...\', { rule: [ addImport: namespace ] } ] ]', async (test) => {

  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'namespace',
    'source': 'module',
    'option': {
      'nameHint': 'createRequire'
    }
  })

  let { code: actualCodeOut } = await Babel.transformAsync(test.context.codeIn, test.context.option)
  let expectedCodeOut = 'import * as _createRequire from "module";\n' +
                        'console.log(42);'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('plugins: [ [ \'...\', { rule: [ addImport: sideEffect ] } ] ]', async (test) => {

  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'sideEffect',
    'source': 'module'
  })

  let { code: actualCodeOut } = await Babel.transformAsync(test.context.codeIn, test.context.option)
  let expectedCodeOut = 'import "module";\n' +
                        'console.log(42);'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('plugins: [ [ \'...\', { rule: [ addImport: invalid ] } ] ]', async (test) => {

  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': '_sideEffect',
    'source': 'module'
  })

  await test.throwsAsync(Babel.transformAsync(test.context.codeIn, test.context.option), { 'instanceOf': InvalidImportTypeError })

})
