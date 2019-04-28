'use strict'

const Meetup = use('App/Models/Meetup')
const MeetupTopic = use('App/Models/MeetupTopic')

class MeetupController {
  async index ({ request, auth }) {
    const { list, title, recommended } = request.get()

    const preferences = await auth.user.preferences().fetch()

    const meetups = await Meetup.query()
      .leftJoin('meetup_topics as topics', 'meetups.id', 'topics.meetup_id')
      .with('user')
      .with('topics')
      .with('coverPhoto')
      .withCount('subscriptions')
      .andWhere(function () {
        if (list !== 'all') {
          this.where('date', '>', new Date())
        }

        if (title) this.whereRaw(`LOWER(title) like '%${title.toLowerCase()}%'`)

        /** matches if the meetup has at least one of the user's preferences */
        if (recommended && recommended.toLowerCase() !== 'false') {
          this.andWhere(function () {
            const or = []
            if (preferences.frontend) or.push({ 'topics.frontend': true })
            if (preferences.backend) or.push({ 'topics.backend': true })
            if (preferences.mobile) or.push({ 'topics.mobile': true })
            if (preferences.devops) or.push({ 'topics.devops': true })
            if (preferences.management) or.push({ 'topics.management': true })
            if (preferences.marketing) or.push({ 'topics.marketing': true })

            if (or.length) this.orWhere(...or)
          })
        }

        switch (list) {
          case 'subscribed':
            return this.whereExists(function () {
              this.select('*')
                .from('subscriptions')
                .whereRaw(
                  `subscriptions.user_id = ${
                    auth.user.id
                  } and subscriptions.meetup_id = meetups.id`
                )
            })
          default:
            return this.whereNotExists(function () {
              this.select('*')
                .from('subscriptions')
                .whereRaw(
                  `subscriptions.user_id = ${
                    auth.user.id
                  } and subscriptions.meetup_id = meetups.id`
                )
            })
        }
      })
      .fetch()

    return meetups
  }

  async store ({ request, response, auth }) {
    const {
      title,
      description,
      location,
      date,
      topics,
      file_id
    } = request.only([
      'title',
      'description',
      'location',
      'date',
      'file_id',
      'topics'
    ])
    const user = auth.user

    const meetup = await Meetup.create({
      user_id: user.id,
      title,
      description,
      location,
      file_id,
      date
    })

    let topicsModel = null
    try {
      topicsModel = await MeetupTopic.findByOrFail('meetup_id', meetup.id)
      topicsModel.merge({ ...topics })
    } catch (err) {
      topicsModel = await MeetupTopic.create({
        meetup_id: meetup.id,
        ...topics
      })
    }

    await meetup.topics().save(topicsModel)

    return Meetup.query()
      .where('id', meetup.id)
      .with('topics')
      .first()
  }

  async show ({ params, request, response, view }) {
    const meetup = await Meetup.query()
      .where('id', params.id)
      .with('user')
      .with('topics')
      .with('coverPhoto')
      .withCount('subscriptions')
      .first()

    return meetup
  }
}

module.exports = MeetupController
