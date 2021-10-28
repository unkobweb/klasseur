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

    async authenticate({auth, response}: HttpContextContract){
        const user = await auth.use('api').authenticate() // Try to get the user linked to the bearer token
        const serializedUser = user.serialize() // Serialize the user
        response.status(200).send(serializedUser) // Send it back
    }

    async logout({response}: HttpContextContract){
        response.status(200)
    }
}
