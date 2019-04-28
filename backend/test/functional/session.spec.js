'use strict'

const { test, trait, before, after } = use('Test/Suite')('Authentication')
const Factory = use('Factory')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

let user = null

before(async () => {
  user = await Factory.model('App/Models/User').create()
})

test('should be able to authenticate with valid credentials', async ({
  assert,
  client
}) => {
  const response = await client
    .post('/sessions')
    .send({
      email: user.email,
      password: 'secret'
    })
    .end()

  response.assertStatus(200)
  assert.hasAnyKeys({ token: 1 }, response.body)
})

test('should not be able to authenticate with invalid credentials', async ({
  client
}) => {
  const response = await client
    .post('/sessions')
    .send({
      email: user.email,
      password: 'wrongpassword'
    })
    .end()

  response.assertStatus(401)
})

test('should verify if its the first login of the user', async ({
  assert,
  client
}) => {
  const response = await client
    .post('/sessions')
    .send({
      email: user.email,
      password: 'secret'
    })
    .end()

  assert.equal(true, response.body.user.first_login)
  response.assertStatus(200)
})

test('should verify if its the second login of the user', async ({
  assert,
  client
}) => {
  await client
    .post('/sessions')
    .send({
      email: user.email,
      password: 'secret'
    })
    .end()

  const secondLogin = await client
    .post('/sessions')
    .send({
      email: user.email,
      password: 'secret'
    })
    .end()

  assert.equal(false, secondLogin.body.user.first_login)
  secondLogin.assertStatus(200)
})

test('should be able to access protected routes when presented the token', async ({
  client
}) => {
  const session = await client
    .post('/sessions')
    .send({
      email: user.email,
      password: 'secret'
    })
    .end()

  const response = await client
    .get('/users')
    .header('Authorization', `Bearer ${session.body.token}`)
    .end()

  response.assertStatus(200)
})

test('should not be able to access protected routes when token not presented', async ({
  client
}) => {
  const response = await client.get('/users').end()

  response.assertStatus(401)
})

test('should not be able to access protected routes with invalid token', async ({
  client
}) => {
  const response = await client
    .get('/users')
    .header('Authorization', 'Bearer wrongtoken')
    .end()

  response.assertStatus(401)
})

after(async () => {
  /** Even though i'm using databaseTransaction trait, there's a bug with
   * factories used on before/beforeEach (it remains persisted after test) */
  user = await User.find(user.id)
  await user.delete()
})
