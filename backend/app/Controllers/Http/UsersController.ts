import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import ChangePasswordValidator from 'App/Validators/ChangePasswordValidator';
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
    async create({request}: HttpContextContract){
        const {email, password} = await request.validate(CreateUserValidator);

        const newUser = new User();
        newUser.email = email;
        newUser.password = password;
        await newUser.save();

        // Find again to get the uuid of created user in the response
        return await User.findBy('email',newUser.email);
    }

    async changePassword({request, auth, response}: HttpContextContract) {
        const user = await auth.authenticate();
        const {password} = await request.validate(ChangePasswordValidator);

        user.password = password;

        await user.save();

        return response.send(user);
    }
}
