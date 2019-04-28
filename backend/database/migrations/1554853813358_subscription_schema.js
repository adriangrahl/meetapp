'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubscriptionSchema extends Schema {
  up () {
    this.create('subscriptions', table => {
      table
        .integer('meetup_id')
        .references('id')
        .inTable('meetups')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.primary(['meetup_id', 'user_id'])
      table.timestamps()
    })
  }

  down () {
    this.drop('subscriptions')
  }
}

module.exports = SubscriptionSchema
