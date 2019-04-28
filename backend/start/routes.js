'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/sessions', 'SessionController.store')

Route.post('/users', 'UserController.store').validator('User')

Route.get('/files/:id', 'FileController.show')
Route.group(() => {
  Route.get('/users', 'UserController.show')
  Route.put('/users', 'UserController.update').validator('UpdateUser')

  Route.post('/meetups', 'MeetupController.store').validator('Meetup')
  Route.get('/meetups', 'MeetupController.index')
  Route.get('/meetups/:id', 'MeetupController.show')

  Route.post('meetups/:meetup_id/subscribe', 'SubscriptionController.subscribe')
  Route.post(
    'meetups/:meetup_id/unsubscribe',
    'SubscriptionController.unsubscribe'
  )

  Route.post('files', 'FileController.store')
  Route.delete('/files/:id', 'FileController.destroy')
}).middleware('auth')
