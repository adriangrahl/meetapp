'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserPreferencesSchema extends Schema {
  up () {
    this.create('user_preferences', table => {
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .primary()
      table.bool('frontend').defaultTo(false)
      table.bool('backend').defaultTo(false)
      table.bool('mobile').defaultTo(false)
      table.bool('devops').defaultTo(false)
      table.bool('management').defaultTo(false)
      table.bool('marketing').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('user_preferences')
  }
}

module.exports = UserPreferencesSchema
