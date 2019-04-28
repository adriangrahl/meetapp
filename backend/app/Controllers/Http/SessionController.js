'use strict'

const User = use('App/Models/User')

class SessionController {
  async store ({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)

    const user = await User.query()
      .where('email', email)
      .with('preferences')
      .first()

    if (user.first_login) {
      user.first_login = false
      await user.save()
      user.first_login = true
    }

    token['user'] = user

    return token
  }
}

module.exports = SessionController
