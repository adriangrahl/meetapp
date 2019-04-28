'use strict'

const User = use('App/Models/User')
const UserPreferences = use('App/Models/UserPreferences')

class UserController {
  async show ({ auth }) {
    const user = auth.user
    await user.load('preferences')
    return user
  }

  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create({ ...data, first_login: true })

    return user
  }

  async update ({ request, response, auth }) {
    const user = auth.user
    const { username, password, preferences } = request.only([
      'username',
      'password',
      'preferences'
    ])

    let preferencesModel = null
    try {
      preferencesModel = await UserPreferences.findByOrFail('user_id', user.id)
      preferencesModel.merge({ ...preferences })
    } catch (err) {
      preferencesModel = await UserPreferences.create({
        user_id: user.id,
        ...preferences
      })
    }

    await user.preferences().save(preferencesModel)

    user.merge({ username, password })
    await user.save()

    return User.query()
      .where('id', user.id)
      .with('preferences')
      .first()
  }
}

module.exports = UserController
