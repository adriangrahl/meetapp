'use strict'

const Model = use('Model')

class Subscription extends Model {
  static get primaryKey () {
    return ['meetup_id', 'user_id']
  }

  meetup () {
    return this.belongsTo('App/Models/Meetup')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Subscription
