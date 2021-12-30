/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.post('/auth/login', "AuthController.login")
  Route.post('/auth/change-password',"AuthController.changePassword")
  Route.group(() => {

    Route.get('/auth/user',"AuthController.authenticate")
    Route.get('/auth/logout',"AuthController.logout")
    Route.post('/auth/reset-password',"AuthController.resetPassword")

    Route.group(() => {
      Route.post('/',"UsersController.create");
      Route.patch('/change-password', "UsersController.changePassword");
    }).prefix('/user');

    Route.group(() => {
      Route.get('/me', "DocumentsController.me")
      Route.post('/upload', "DocumentsController.upload")
      Route.get('/download/:uuid', "DocumentsController.download")
      Route.patch('/:uuid', "DocumentsController.update")
      Route.delete('/:uuid', "DocumentsController.delete")
    }).prefix('/documents')

    Route.group(() => {
      Route.get('/stats', "AdminController.stats")
      Route.post('/auth/register', "AuthController.register")
      Route.get('/all-users', "AdminController.allUsers")
      Route.delete('/user/:uuid', "AdminController.deleteUser")
      Route.post('/scheduler', "SchedulersController.setScheduler")
      Route.get('/schedulers', "SchedulersController.getSchedulers")
      Route.delete('/scheduler/:name', "SchedulersController.deleteScheduler")
      Route.get('/logs', "AdminController.getLogs")
    }).middleware('isAdmin')

  }).middleware('auth');

  Route.group(() => {
    Route.get('/config', "WizardsController.getConfig")
    Route.post('/config', "WizardsController.setConfig")
    Route.post('/test-drive', "WizardsController.testDrive")
    Route.post('/test-mail', "WizardsController.testMail")
    Route.post('/create-admin', "WizardsController.createAdmin")
  }).middleware('wizard')

  Route.get('/', () => 'Hello world')

}).prefix('/api');
