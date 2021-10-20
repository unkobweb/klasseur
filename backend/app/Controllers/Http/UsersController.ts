import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
    async create({auth, request, response}: HttpContextContract){
        // Check if user is root
        const user = await auth.authenticate();
        if (user.username !== "root") {
            return response.forbidden('Forbidden');
        }

        const {username, password} = await request.validate(CreateUserValidator);

        const newUser = new User();
        newUser.username = username;
        newUser.password = password;
        await newUser.save();

        return newUser;
    }
}
