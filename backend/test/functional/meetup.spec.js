'use strict'

const { test, trait, before, after } = use('Test/Suite')('Meetup')
const Factory = use('Factory')

const Meetup = use('App/Models/Meetup')
const User = use('App/Models/User')
const UserPreferences = use('App/Models/UserPreferences')
const MeetupTopic = use('App/Models/MeetupTopic')

trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Auth/Client')

let user = null
let meetup = null

before(async () => {
  user = await Factory.model('App/Models/User').create()
  meetup = await Factory.model('App/Models/Meetup').create({ user_id: user.id })
})

test('should be able to create a meetup', async ({ assert, client }) => {
  const title = 'adonis meetup'
  const description = 'test meetup creation'
  const location = 'Joinville SC'
  const date = '2019-04-09 13:46'

  const response = await client
    .post('/meetups')
    .send({
      title,
      description,
      location,
      date
    })
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.equal(title, response.body.title)
  assert.equal(description, response.body.description)
  assert.equal(location, response.body.location)
  assert.equal('2019-04-09T13:46:00.000Z', response.body.date)
})

test('should not be able to create a meetup without validation', async ({
  client
}) => {
  const title = 'adonis meetup'
  const description = 'test meetup creation'
  const location = 'Joinville SC'

  const response = await client
    .post('/meetups')
    .send({
      title,
      description,
      location
    })
    .loginVia(user)
    .end()

  response.assertStatus(400)
})

test('should be able to list meetups and see 4 items', async ({
  assert,
  client
}) => {
  await Factory.model('App/Models/Meetup').createMany(3)

  const response = await client
    .get('/meetups')
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.equal(4, response.body.length)
})

test('should be able to insert topics', async ({ assert, client }) => {
  const title = 'adonis meetup'
  const description = 'test meetup creation'
  const location = 'Joinville SC'
  const date = '2019-04-09 13:46'

  const topics = {
    frontend: true,
    backend: true,
    mobile: true,
    devops: true,
    management: false,
    marketing: false
  }

  const response = await client
    .post('/meetups')
    .send({
      title,
      description,
      location,
      date,
      topics
    })
    .loginVia(user)
    .end()

  assert.hasAnyKeys(response.body, { topics: 1 })
  assert.equal(topics.frontend, response.body.topics.frontend)
  assert.equal(topics.backend, response.body.topics.backend)
  assert.equal(topics.mobile, response.body.topics.mobile)
  assert.equal(topics.devops, response.body.topics.devops)
  assert.equal(topics.management, response.body.topics.management)
  assert.equal(topics.marketing, response.body.topics.marketing)
  response.assertStatus(200)
})

test('should be able to subscribe to a meetup', async ({ assert, client }) => {
  const response = await client
    .post(`/meetups/${meetup.id}/subscribe`)
    .loginVia(user)
    .end()

  response.assertStatus(200)
})

test('should be able to call subscribe two times without errors', async ({
  assert,
  client
}) => {
  await client
    .post(`/meetups/${meetup.id}/subscribe`)
    .loginVia(user)
    .end()

  const response = await client
    .post(`/meetups/${meetup.id}/subscribe`)
    .loginVia(user)
    .end()

  response.assertStatus(200)
})

test('should be able to unsubscribe', async ({ assert, client }) => {
  const response = await client
    .post(`/meetups/${meetup.id}/unsubscribe`)
    .loginVia(user)
    .end()

  response.assertStatus(204)
})

test('should only list next meetups', async ({ assert, client }) => {
  meetup = await Meetup.find(meetup.id)
  await meetup.delete()

  const title = 'Future Meetup'
  const description = 'test meetup creation'
  const location = 'Joinville SC'

  var d = new Date()

  const twoDaysAgo = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate() -
    2} ${d.getHours()}:${d.getMinutes()}`

  const twoDaysFromNow = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate() +
    2} ${d.getHours()}:${d.getMinutes()}`

  await Meetup.create({
    user_id: user.id,
    title: 'past meetup',
    description,
    location,
    date: twoDaysAgo
  })

  await Meetup.create({
    user_id: user.id,
    title,
    description,
    location,
    date: twoDaysFromNow
  })

  const response = await client
    .get('/meetups')
    // .query({ list: 'all', page: 1 })
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.equal(1, response.body.length)
  assert.equal(title, response.body[0].title)
})

test('should only list unsubscribed next meetups', async ({
  assert,
  client
}) => {
  meetup = await Meetup.find(meetup.id)
  await meetup.delete()

  const subscribed = await Factory.model('App/Models/Meetup').create({
    user_id: user.id
  })
  const unsubscribed = await Factory.model('App/Models/Meetup').create({
    user_id: user.id
  })

  await client
    .post(`/meetups/${subscribed.id}/subscribe`)
    .loginVia(user)
    .end()

  const response = await client
    .get('/meetups')
    .query({ list: 'unsubscribed', page: 1 })
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.equal(1, response.body.length)
  assert.equal(unsubscribed.id, response.body[0].id)
})

test('should only list subscribed next meetups', async ({ assert, client }) => {
  meetup = await Meetup.find(meetup.id)
  await meetup.delete()

  const subscribed = await Factory.model('App/Models/Meetup').create({
    user_id: user.id
  })
  await Factory.model('App/Models/Meetup').create({
    user_id: user.id
  })

  await client
    .post(`/meetups/${subscribed.id}/subscribe`)
    .loginVia(user)
    .end()

  const response = await client
    .get('/meetups')
    .query({ list: 'subscribed', page: 1 })
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.equal(1, response.body.length)
  assert.equal(subscribed.id, response.body[0].id)
})

test('should be able to search meetups by title', async ({
  assert,
  client
}) => {
  const secondMeetup = await Factory.model('App/Models/Meetup').create({
    user_id: user.id
  })
  await Factory.model('App/Models/Meetup').create({
    user_id: user.id
  })

  const response = await client
    .get('/meetups')
    .query({ page: 1, title: secondMeetup.title })
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.equal(1, response.body.length)
  assert.equal(secondMeetup.id, response.body[0].id)
})

test('should be able to show details of specific meetup', async ({
  assert,
  client
}) => {
  const response = await client
    .get(`/meetups/${meetup.id}`)
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.equal(meetup.id, response.body.id)
})

test('should be able to show number of subscribed users', async ({
  assert,
  client
}) => {
  await client
    .post(`/meetups/${meetup.id}/subscribe`)
    .loginVia(user)
    .end()

  const response = await client
    .get(`/meetups/${meetup.id}`)
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.equal(meetup.id, response.body.id)
  assert.equal(1, response.body.__meta__.subscriptions_count)
})

test('should be able to show only recommended meetups', async ({
  assert,
  client
}) => {
  user = await User.find(user.id)
  await user.delete()

  const newUser = await User.create({
    username: 'Adrian test',
    email: 'adrian.test@gmail.com',
    password: 'secret'
  })

  let preferencesModel = await UserPreferences.create({
    user_id: newUser.id,
    backend: true
  })

  await newUser.preferences().save(preferencesModel)

  const recommended = await Meetup.create({
    title: 'recommended meetup',
    description: 'any description',
    location: 'some place',
    date: '2999-04-09 13:46',
    user_id: newUser.id
  })

  let topicsModel = await MeetupTopic.create({
    meetup_id: recommended.id,
    backend: true,
    mobile: true
  })

  await recommended.topics().save(topicsModel)

  const unrecommended = await Meetup.create({
    title: 'unrecommended meetup',
    description: 'any description',
    location: 'some place',
    date: '2999-04-09 13:46',
    user_id: newUser.id
  })

  topicsModel = await MeetupTopic.create({
    meetup_id: unrecommended.id,
    frontend: true
  })

  await unrecommended.topics().save(topicsModel)

  const response = await client
    .get('/meetups')
    .query({ page: 1, recommended: true })
    .loginVia(newUser)
    .end()

  response.assertStatus(200)
  assert.equal(1, response.body.length)
  assert.equal(recommended.id, response.body[0].id)
})

after(async () => {
  /** Even though i'm using databaseTransaction trait, there's a bug with
   * factories used on before/beforeEach (it remains persisted after test) */
  user = await User.find(user.id)
  await user.delete()
  meetup = await Meetup.find(meetup.id)
  await meetup.delete()
})
