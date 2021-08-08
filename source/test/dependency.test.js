import { Check } from '@virtualpatterns/mablung-check-dependency'

import Test from 'ava'

const Process = process

Test('(default)', async (test) => {

  let dependency = await Check(Process.cwd())

  // test.log(dependency)
  test.deepEqual(dependency.missing, {})
  test.deepEqual(dependency.unused, [])

})
