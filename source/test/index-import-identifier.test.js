import { createRequire as CreateRequire } from 'module'
import Babel from '@babel/core'
import Path from 'path'
import Test from 'ava'
import URL from 'url'

const Require = CreateRequire(import.meta.url)

const SourceFilePath = URL.fileURLToPath(import.meta.url).replace('/release/', '/source/')
const SourceFolderPath = Path.dirname(SourceFilePath)

Test.beforeEach((test) => {

  test.context.codeIn = 'const FilePath = __filePath'
  test.context.option = {
    'root': SourceFolderPath,
    'plugins': [
      [
        Require.resolve('@virtualpatterns/babel-plugin-mablung-replace-identifier'),
        {
          'rule': [
            {
              'searchFor': /__filePath/gi,
              'replaceWith': '...',
              'parserOption': {
                'sourceType': 'module'
              },
              'addImport': []
            }
          ]
        }
      ]
    ]
  }

})

Test('plugins: [ [ \'...\', { rule: [ replaceWith: __importIdentifier, addImport: default ] } ] ]', async (test) => {

  test.context.option.plugins[0][1].rule[0].replaceWith = '__importIdentifier.fileURLToPath(import.meta.url)'
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'default',
    'source': 'url',
    'option': {
      'nameHint': 'URL'
    }
  })

  let { code: actualCodeOut } = await Babel.transformAsync(test.context.codeIn, test.context.option)
  let expectedCodeOut = 'import _URL from "url";\n' +
                        '\n' +
                        'const FilePath = _URL.fileURLToPath(import.meta.url);'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('plugins: [ [ \'...\', { rule: [ replaceWith: __importIdentifier_0, addImport: default ] } ] ]', async (test) => {

  test.context.option.plugins[0][1].rule[0].replaceWith = '__importIdentifier_0.fileURLToPath(import.meta.url)'
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'default',
    'source': 'url',
    'option': {
      'nameHint': 'URL'
    }
  })

  let { code: actualCodeOut } = await Babel.transformAsync(test.context.codeIn, test.context.option)
  let expectedCodeOut = 'import _URL from "url";\n' +
                        '\n' +
                        'const FilePath = _URL.fileURLToPath(import.meta.url);'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('plugins: [ [ \'...\', { rule: [ replaceWith: __importIdentifier, addImport: default and named ] } ] ]', async (test) => {

  test.context.option.plugins[0][1].rule[0].replaceWith = '__importIdentifier.fileURLToPath(import.meta.url)'
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'default',
    'source': 'url',
    'option': {
      'nameHint': 'URL'
    }
  })
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'named',
    'name': 'createRequire',
    'source': 'module'
  })

  let { code: actualCodeOut } = await Babel.transformAsync(test.context.codeIn, test.context.option)
  let expectedCodeOut = 'import { createRequire as _createRequire } from "module";\n' +
                        'import _URL from "url";\n' +
                        '\n' +
                        'const FilePath = _createRequire.fileURLToPath(import.meta.url);'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('plugins: [ [ \'...\', { rule: [ replaceWith: __importIdentifier_0, addImport: default and named ] } ] ]', async (test) => {

  test.context.option.plugins[0][1].rule[0].replaceWith = '__importIdentifier_0.fileURLToPath(import.meta.url)'
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'default',
    'source': 'url',
    'option': {
      'nameHint': 'URL'
    }
  })
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'named',
    'name': 'createRequire',
    'source': 'module'
  })

  let { code: actualCodeOut } = await Babel.transformAsync(test.context.codeIn, test.context.option)
  let expectedCodeOut = 'import { createRequire as _createRequire } from "module";\n' +
                        'import _URL from "url";\n' +
                        '\n' +
                        'const FilePath = _URL.fileURLToPath(import.meta.url);'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('plugins: [ [ \'...\', { rule: [ replaceWith: __importIdentifier_1, addImport: default and named ] } ] ]', async (test) => {

  test.context.option.plugins[0][1].rule[0].replaceWith = '__importIdentifier_1.fileURLToPath(import.meta.url)'
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'default',
    'source': 'url',
    'option': {
      'nameHint': 'URL'
    }
  })
  test.context.option.plugins[0][1].rule[0].addImport.push({
    'type': 'named',
    'name': 'createRequire',
    'source': 'module'
  })

  let { code: actualCodeOut } = await Babel.transformAsync(test.context.codeIn, test.context.option)
  let expectedCodeOut = 'import { createRequire as _createRequire } from "module";\n' +
                        'import _URL from "url";\n' +
                        '\n' +
                        'const FilePath = _createRequire.fileURLToPath(import.meta.url);'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})
