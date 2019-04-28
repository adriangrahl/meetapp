'use strict'

const Model = use('Model')

class MeetupTopic extends Model {
  static get primaryKey () {
    return 'meetup_id'
  }

  meetup () {
    return this.belongsTo('App/Models/Meetup')
  }
}

module.exports = MeetupTopic
