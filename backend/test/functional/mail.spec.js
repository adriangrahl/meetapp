'use strict'

// This test work only WITHOUT kue job
/* const { test, trait, before, after } = use('Test/Suite')('Mail')
const Mail = use('Mail')
const Factory = use('Factory')

const Meetup = use('App/Models/Meetup')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

let user = null
let meetup = null

before(async () => {
  user = await Factory.model('App/Models/User').create()
  meetup = await Factory.model('App/Models/Meetup').create({ user_id: user.id })
})

test('should send email as subscription confirmation', async ({
  assert,
  client
}) => {
  Mail.fake()

  const response = await client
    .post(`/meetups/${meetup.id}/subscribe`)
    .loginVia(user)
    .end()

  response.assertStatus(200)

  const recentEmail = Mail.pullRecent()

  assert.equal(recentEmail.to.address, user.email)
  assert.equal(recentEmail.to.name, user.username)

  Mail.restore()
})

after(async () => {
  // Even though i'm using databaseTransaction trait, there's a bug with
  // factories used on before/beforeEach (it remains persisted after test)
  user = await User.find(user.id)
  await user.delete()
  meetup = await Meetup.find(meetup.id)
  await meetup.delete()
}) */
