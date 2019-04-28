'use strict'

const Model = use('Model')

const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  preferences () {
    return this.hasOne('App/Models/UserPreferences')
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  subscriptions () {
    return this.hasMany('App/Models/Subscription')
  }
}

module.exports = User
