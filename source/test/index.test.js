import { createRequire as CreateRequire } from 'module'
import Babel from '@babel/core'
import Path from 'path'
import Test from 'ava'
import URL from 'url'

const Require = CreateRequire(import.meta.url)
const SourceFilePath = URL.fileURLToPath(import.meta.url).replace('release/', 'source/')
const SourceFolderPath = Path.dirname(SourceFilePath).replace('release/', 'source/')

Test('plugins: [ index.cjs ]', async (test) => {

  let codeIn = 'console.log(\'Hello, world!\')'
  let option = {
    'root': SourceFolderPath,
    'plugins': [
      Require.resolve('@virtualpatterns/babel-plugin-mablung-replace-identifier')
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = 'console.log(\'Hello, world!\');'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('plugins: [ [ index.cjs ] ]', async (test) => {

  let codeIn = 'console.log(\'Hello, world!\')'
  let option = {
    'root': SourceFolderPath,
    'plugins': [
      [
        Require.resolve('@virtualpatterns/babel-plugin-mablung-replace-identifier')
      ]
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = 'console.log(\'Hello, world!\');'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('plugins: [ [ \'...\', {} ] ]', async (test) => {

  let codeIn = 'console.log(\'Hello, world!\')'
  let option = {
    'root': SourceFolderPath,
    'plugins': [
      [
        Require.resolve('@virtualpatterns/babel-plugin-mablung-replace-identifier'),
        {}
      ]
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = 'console.log(\'Hello, world!\');'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('plugins: [ [ \'...\', { rule: [] } ] ]', async (test) => {

  let codeIn = 'console.log(\'Hello, world!\')'
  let option = {
    'root': SourceFolderPath,
    'plugins': [
      [
        Require.resolve('@virtualpatterns/babel-plugin-mablung-replace-identifier'),
        {
          'rule': []
        }
      ]
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = 'console.log(\'Hello, world!\');'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('plugins: [ [ \'...\', { rule: [ searchFor: __filePath, replaceWith: __filename ] } ] ]', async (test) => {

  let codeIn = 'const FilePath = __filePath'
  let option = {
    'root': SourceFolderPath,
    'plugins': [
      [
        Require.resolve('@virtualpatterns/babel-plugin-mablung-replace-identifier'),
        {
          'rule': [
            {
              'searchFor': '__filePath',
              'replaceWith': '__filename'
            }
          ]
        }
      ]
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = 'const FilePath = __filename;'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('plugins: [ [ \'...\', { rule: [ searchFor: __filePath, replaceWith: import.meta.url, parserOption: { ... } ] } ] ]', async (test) => {

  let codeIn = 'const FilePath = __filePath'
  let option = {
    'root': SourceFolderPath,
    'plugins': [
      [
        Require.resolve('@virtualpatterns/babel-plugin-mablung-replace-identifier'),
        {
          'rule': [
            {
              'searchFor': '__filePath',
              'replaceWith': 'import.meta.url',
              'parserOption': {
                'sourceType': 'module'
              }
            }
          ]
        }
      ]
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = 'const FilePath = import.meta.url;'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('plugins: [ [ \'...\', { rule: [ searchFor: __filePath, replaceWith: __importIdentifier ] } ] ]', async (test) => {

  let codeIn = 'const FilePath = __filePath'
  let option = {
    'root': SourceFolderPath,
    'plugins': [
      [
        Require.resolve('@virtualpatterns/babel-plugin-mablung-replace-identifier'),
        {
          'rule': [
            {
              'searchFor': '__filePath',
              'replaceWith': '__importIdentifier.fileURLToPath(import.meta.url)',
              'parserOption': {
                'sourceType': 'module'
              },
              'addImport': [
                {
                  'type': 'default',
                  'source': 'url',
                  'option': {
                    'nameHint': 'URL'
                  }
                }
              ]
            }
          ]
        }
      ]
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = 'import _URL from "url";\n' +
                        '\n' +
                        'const FilePath = _URL.fileURLToPath(import.meta.url);'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('plugins: [ [ \'...\', { rule: [ searchFor: __require, replaceWith: __importIdentifier ] } ] ]', async (test) => {

  let codeIn = 'const Require = __require'
  let option = {
    'root': SourceFolderPath,
    'plugins': [
      [
        Require.resolve('@virtualpatterns/babel-plugin-mablung-replace-identifier'),
        {
          'rule': [
            {
              'searchFor': /__require/gi,
              'replaceWith': '__importIdentifier(import.meta.url)',
              'parserOption': {
                'sourceType': 'module'
              },
              'addImport': [
                {
                  'type': 'named',
                  'name': 'createRequire',
                  'source': 'module'
                }
              ]
            }
          ]
        }
      ]
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = 'import { createRequire as _createRequire } from "module";\n' +
                        '\n' +
                        'const Require = _createRequire(import.meta.url);'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})

Test('plugins: [ [ \'...\', { rule: [ searchFor: __filePath and __require, replaceWith: __importIdentifier ] } ] ]', async (test) => {

  let codeIn =  'const FilePath = __filePath\n' +
                'const Require = __require'
  
  let option = {
    'root': SourceFolderPath,
    'plugins': [
      [
        Require.resolve('@virtualpatterns/babel-plugin-mablung-replace-identifier'),
        {
          'rule': [
            {
              'searchFor': '__filePath',
              'replaceWith': '__importIdentifier.fileURLToPath(import.meta.url)',
              'parserOption': {
                'sourceType': 'module'
              },
              'addImport': [
                {
                  'type': 'default',
                  'source': 'url',
                  'option': {
                    'nameHint': 'URL'
                  }
                }
              ]
            },
            {
              'searchFor': '__require',
              'replaceWith': '__importIdentifier(import.meta.url)',
              'parserOption': {
                'sourceType': 'module'
              },
              'addImport': [
                {
                  'type': 'named',
                  'name': 'createRequire',
                  'source': 'module'
                }
              ]
            }
          ]
        }
      ]
    ]
  }

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, option)
  let expectedCodeOut = 'import { createRequire as _createRequire } from "module";\n' +
                        'import _URL from "url";\n' +
                        '\n' +
                        'const FilePath = _URL.fileURLToPath(import.meta.url);\n\n' +
                        'const Require = _createRequire(import.meta.url);'

  // test.log(actualCodeOut)
  test.is(actualCodeOut, expectedCodeOut)

})
