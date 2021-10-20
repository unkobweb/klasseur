import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    async login({auth, request, response}: HttpContextContract) {
        const {username, password} = request.all();
        console.log({username, password})
        try {
            const token = await auth.use('api').attempt(username, password);
            return token;
        } catch (error) {
            return response.badRequest('Invalid credentials');
        }
    }
}
