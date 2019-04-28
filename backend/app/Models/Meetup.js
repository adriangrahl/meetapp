'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Meetup extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  topics () {
    return this.hasOne('App/Models/MeetupTopic')
  }

  coverPhoto () {
    return this.belongsTo('App/Models/File')
  }

  subscriptions () {
    return this.hasMany('App/Models/Subscription')
  }
}

module.exports = Meetup
