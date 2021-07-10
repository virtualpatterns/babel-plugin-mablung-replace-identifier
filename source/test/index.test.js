import Test from 'ava'

Test.before(async (test) => {
  test.context.index = await import('../index.cjs')
})

;[
  'OK',
  'default'
].forEach((name) => {

  Test(name, async (test) => {
    test.truthy(test.context.index[name])
  })
  
})
