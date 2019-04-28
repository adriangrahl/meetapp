'use strict'

const Database = use('Database')
const Subscription = use('App/Models/Subscription')
const Meetup = use('App/Models/Meetup')
const Antl = use('Antl')
const Env = use('Env')
const Job = use('App/Jobs/NewSubscription')
const Kue = use('Kue')

class SubscriptionController {
  async subscribe ({ auth, params }) {
    const data = {
      meetup_id: parseInt(params.meetup_id),
      user_id: auth.user.id
    }

    const subscription = await Database.from('subscriptions')
      .where(data)
      .first()

    const meetup = await Meetup.findOrFail(params.meetup_id)
    const meetupUser = await meetup.user().fetch()
    const user = auth.user
    const image = meetup.file_id
      ? `${Env.get('APP_URL')}/files/${meetup.file_id}`
      : ''
    const date = `${meetup.date.getDate()}/${meetup.date.getMonth()}/${meetup.date.getFullYear()}`

    if (Env.get('NODE_ENV') !== 'testing') {
      Kue.dispatch(Job.key, {
        email: user.email,
        username: user.username,
        photoUrl: image,
        title: meetup.title,
        description: meetup.description,
        location: meetup.location,
        date,
        meetupOwner: meetupUser.username,
        ownerEmail: meetupUser.email,
        messages: {
          congratulations: Antl.get('general.Congratulations'),
          successfully_subscribed: Antl.get('general.successfully_subscribed'),
          details: Antl.get('general.Details'),
          meetup_place: Antl.get('general.meetup_place'),
          at: Antl.get('general.at'),
          cheers: Antl.get('general.Cheers')
        }
      })
    }

    return subscription || Subscription.create(data)
  }

  async unsubscribe ({ auth, params, response }) {
    await Database.from('subscriptions')
      .where({
        meetup_id: parseInt(params.meetup_id),
        user_id: auth.user.id
      })
      .del()

    return response.status(204).send()
  }
}

module.exports = SubscriptionController
