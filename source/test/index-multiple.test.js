import { createRequire as CreateRequire } from 'module'
import Babel from '@babel/core'
import Test from 'ava'

const Require = CreateRequire(import.meta.url)

Test('rule.replaceWith = \'__importIdentifier_0.fileURLToPath(import.meta.url)\' and \'__importIdentifier_0(import.meta.url)\'', async (test) => {

  let codeIn =  'const FilePath = __filePath\n' +
                'const Require = __require'
  
  let option = {
    'plugins': [
      [
        Require.resolve('../index.cjs'),
        {
          'rule': [
            {
              'searchFor': '__filePath',
              'replaceWith': '__importIdentifier_0.fileURLToPath(import.meta.url)',
              'parserOption': {
                'plugins': [ 'importMeta' ],
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
              'replaceWith': '__importIdentifier_0(import.meta.url)',
              'parserOption': {
                'plugins': [ 'importMeta' ],
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
