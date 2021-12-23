import Mail from '@ioc:Adonis/Addons/Mail';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import LoginValidator from 'App/Validators/LoginValidator';
import RegisterValidator from 'App/Validators/RegisterValidator';

export default class AuthController {
    async login({auth, request, response}: HttpContextContract) {
        const {email, password} = await request.validate(LoginValidator);
        try {
            const token = await auth.use('api').attempt(email, password);
            return token;
        } catch (error) {
            return response.badRequest('Invalid credentials');
        }
    }

    async register({request, response}: HttpContextContract){
        const {email} = await request.validate(RegisterValidator);
        // generate a random password
        const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        
        const user = new User();
        user.email = email;
        user.password = password;
        await user.save();

        await Mail.send((message) => {
            message
              .from('contact@klasseur.fr')
              .to(email)
              .subject('Creation de votre compte Klasseur')
              .text(`Bonjour, vous venez de créer votre compte sur Klasseur.fr. Votre mot de passe est ${password}`);
          })

        return response.status(201).send({user: user.serialize()})
    }

    async authenticate({auth, response}: HttpContextContract){
        const user = await auth.use('api').authenticate() // Try to get the user linked to the bearer token
        const serializedUser = user.serialize() // Serialize the user
        response.status(200).send({user: serializedUser}) // Send it back
    }

    async logout({response}: HttpContextContract){
        response.status(200)
    }
}
