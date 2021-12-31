import Mail from '@ioc:Adonis/Addons/Mail';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ResetPasswordToken from 'App/Models/ResetPasswordToken';
import User from 'App/Models/User';
import LoginValidator from 'App/Validators/LoginValidator';
import RegisterValidator from 'App/Validators/RegisterValidator';
import Env from '@ioc:Adonis/Core/Env';
import ResetPasswordValidator from 'App/Validators/ResetPasswordValidator';

export default class AuthController {
    async login({auth, request, response}: HttpContextContract) {
        const {email, password} = await request.validate(LoginValidator);
        try {
            const token = await auth.use('api').attempt(email, password, {
                expiresIn: '6hours'
            });
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
              .from(Env.get('SMTP_USERNAME'))
              .to(email)
              .subject('Creation de votre compte Klasseur')
              .text(`Bonjour, vous venez de créer votre compte sur Klasseur.fr. Votre mot de passe est ${password}`);
          })

        return response.status(201).send({user: user.serialize()})
    }

    async resetPassword({request, response}: HttpContextContract){
        const {email} = await request.validate(RegisterValidator);
        const user = await User.findBy('email', email);
        
        if(!user){
            return response.badRequest('User not found');
        }

        const token = new ResetPasswordToken()
        token.user_uuid = user.uuid;
        await token.save();

        const url = `${Env.get('WEB_URL')}/reset-password?token=${token.uuid}`;

        await Mail.send((message) => {
            message
                .from(Env.get('SMTP_USERNAME'))
                .to(email)
                .subject('Réinitialisation de votre mot de passe')
                .text(`Bonjour, vous venez de demander la réinitialisation de votre mot de passe sur Klasseur.fr. Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien suivant: ${url}
                `);
        })

        return response.status(201).send({user: user.serialize()})
    }

    async changePassword({request, response}: HttpContextContract){
        const {password, token} = await request.validate(ResetPasswordValidator);
        const tokenRecord = await ResetPasswordToken.findBy('uuid', token);

        if(!tokenRecord){
            return response.badRequest('Invalid token');
        }

        //@ts-ignore
        tokenRecord.used_at = new Date();
        await tokenRecord.save();

        const user = await User.findBy('uuid', tokenRecord.user_uuid);
        if (!user) {
            return response.badRequest('User not found');
        }
        user.password = password;
        await user.save();

        return response.status(200).send({user: user.serialize()})
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
