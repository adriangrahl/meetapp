'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetupSchema extends Schema {
  up () {
    this.create('meetups', table => {
      table.increments()
      table.string('title', 100).notNullable()
      table.text('description')
      table.string('location', 254).notNullable()
      table.timestamp('date').notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('meetups')
  }
}

module.exports = MeetupSchema
