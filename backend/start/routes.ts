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
  Route.group(() => {

    Route.get('/auth/user',"AuthController.authenticate")
    Route.get('/auth/logout',"AuthController.logout")

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
    }).middleware('isAdmin')

  }).middleware('auth');

}).prefix('/api');
