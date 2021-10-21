import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator';

export default class AuthController {
    async login({auth, request, response}: HttpContextContract) {
        const {username, password} = await request.validate(LoginValidator);
        console.log({username, password})
        try {
            const token = await auth.use('api').attempt(username, password);
            return token;
        } catch (error) {
            return response.badRequest('Invalid credentials');
        }
    }
}
