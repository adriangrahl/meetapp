'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', async faker => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: 'secret'
  }
})

Factory.blueprint('App/Models/Meetup', async (faker, i, data) => {
  return {
    title: faker.sentence({ words: 5 }),
    description: faker.paragraph({ sentences: 3 }),
    location: faker.address(),
    date: `${faker.integer({
      min: new Date().getFullYear() + 1,
      max: 2030
    })}-${faker.integer({ min: 1, max: 12 })}-${faker.integer({
      min: 1,
      max: 28
    })} ${faker.integer({ min: 0, max: 23 })}:${faker.integer({
      min: 0,
      max: 59
    })}`,
    user_id: data.user_id
  }
})
