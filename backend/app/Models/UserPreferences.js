'use strict'

const Model = use('Model')

class UserPreferences extends Model {
  static get primaryKey () {
    return 'user_id'
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = UserPreferences
