import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
    async create({auth, request, response}: HttpContextContract){
        const {username, password} = await request.validate(CreateUserValidator);

        const newUser = new User();
        newUser.username = username;
        newUser.password = password;
        await newUser.save();

        // Find again to get the uuid of created user in the response
        return await User.findBy('username',newUser.username);
    }
}
