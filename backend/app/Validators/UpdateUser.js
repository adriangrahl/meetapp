'use strict'

const Antl = use('Antl')

class UpdateUser {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      password: 'confirmed'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UpdateUser
