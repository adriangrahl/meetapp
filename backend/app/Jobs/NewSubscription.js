'use strict'

const Mail = use('Mail')

class NewSubscription {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'NewSubscription-job'
  }

  async handle ({
    email,
    username,
    photoUrl,
    title,
    description,
    location,
    date,
    meetupOwner,
    ownerEmail,
    messages
  }) {
    await Mail.send(
      ['emails.subscription_confirmation'],
      {
        email,
        username,
        photoUrl,
        title,
        description,
        location,
        date,
        meetupOwner,
        messages
      },
      message => {
        message.to(email, username)
        message.from(ownerEmail, meetupOwner)
        message.subject(`Meetup subscription - ${title}`)
      }
    )
  }
}

module.exports = NewSubscription
