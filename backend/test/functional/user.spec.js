'use strict'

const { test, trait, before, after } = use('Test/Suite')('User')
const Factory = use('Factory')

const User = use('App/Models/User')

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

let user = null

before(async () => {
  user = await Factory.model('App/Models/User').create()
})

test('should be able to sign up with username, email and password', async ({
  client
}) => {
  const response = await client
    .post('/users')
    .send({
      username: 'adriangrahl',
      email: 'adriangrahl@gmail.com',
      password: '123'
    })
    .end()
  response.assertStatus(200)
})

test('should not be able to sign up with missing fields', async ({
  client
}) => {
  const response = await client
    .post('/users')
    .send({ username: 'adriangrahl' })
    .end()

  response.assertStatus(400)
})

test('should be able to bypass auth middleware', async ({ client }) => {
  const response = await client
    .get('/users')
    .loginVia(user)
    .end()

  response.assertStatus(200)
})

test('should be able to update user basic data', async ({ client, assert }) => {
  const response = await client
    .put('/users')
    .send({
      username: 'Adrian Grahl Pereira',
      password: '123',
      password_confirmation: '123'
    })
    .loginVia(user)
    .end()

  assert.equal('Adrian Grahl Pereira', response.body.username)
  response.assertStatus(200)
})

test('should not be able to update user data with wrong password confirmation', async ({
  client
}) => {
  const response = await client
    .put('/users')
    .send({
      username: 'Adrian Grahl Pereira',
      password: '123',
      password_confirmation: '123456'
    })
    .loginVia(user)
    .end()

  response.assertStatus(400)
})

test('should be able to change username without informing the password', async ({
  client,
  assert
}) => {
  const response = await client
    .put('/users')
    .send({
      username: 'Adrian Grahl'
    })
    .loginVia(user)
    .end()

  assert.equal('Adrian Grahl', response.body.username)
  response.assertStatus(200)
})

test('should be able to change users password', async ({ client, assert }) => {
  await client
    .put('/users')
    .send({
      password: '123',
      password_confirmation: '123'
    })
    .loginVia(user)
    .end()

  const session = await client
    .post('/sessions')
    .send({
      email: user.email,
      password: '123'
    })
    .end()

  const response = await client
    .get('/users')
    .header('Authorization', `Bearer ${session.body.token}`)
    .end()

  response.assertStatus(200)
})

test('should be able to change users preferences', async ({
  client,
  assert
}) => {
  const preferences = {
    frontend: true,
    backend: true,
    mobile: true,
    devops: true,
    management: false,
    marketing: false
  }

  const response = await client
    .put('/users')
    .send({
      preferences
    })
    .loginVia(user)
    .end()

  assert.equal(preferences.frontend, response.body.preferences.frontend)
  assert.equal(preferences.backend, response.body.preferences.backend)
  assert.equal(preferences.mobile, response.body.preferences.mobile)
  assert.equal(preferences.devops, response.body.preferences.devops)
  assert.equal(preferences.management, response.body.preferences.management)
  assert.equal(preferences.marketing, response.body.preferences.marketing)
  response.assertStatus(200)
})

test('should be able to get user logged data', async ({ client, assert }) => {
  const response = await client
    .get('/users')
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.equal(user.id, response.body.id)
  assert.equal(user.username, response.body.username)
  assert.hasAnyKeys({ preferences: 1 }, response.body)
})

after(async () => {
  /** Even though i'm using databaseTransaction trait, there's a bug with
   * factories used on before/beforeEach (it remains persisted after test) */
  user = await User.find(user.id)
  await user.delete()
})
