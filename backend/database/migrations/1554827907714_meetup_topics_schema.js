'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetupTopicsSchema extends Schema {
  up () {
    this.create('meetup_topics', table => {
      table
        .integer('meetup_id')
        .references('id')
        .inTable('meetups')
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
    this.drop('meetup_topics')
  }
}

module.exports = MeetupTopicsSchema
