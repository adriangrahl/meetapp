'use strict'

const { test, trait } = use('Test/Suite')('Cover Photo')
const Helpers = use('Helpers')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

test('should be able to create a cover photo', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  assert.plan(1)
  try {
    await client
      .post('/files')
      .field('title', 'SemanaOmnistack')
      .attach('file', Helpers.tmpPath('test/semana-omnistack.png'))
      .loginVia(user)
      .end()
  } catch (err) {
    /** client not being able to handle multipart (message: "superagent double callback bug") */
  }

  const exists = Helpers.promisify(require('fs').stat)
  const isExist = await exists(Helpers.tmpPath('uploads/semana-omnistack.png'))
  assert.isOk(isExist)

  const remove = Helpers.promisify(require('fs').unlink)
  await remove(Helpers.tmpPath('uploads/semana-omnistack.png'))
})
