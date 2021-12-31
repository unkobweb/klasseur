import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from 'App/Validators/RegisterValidator';
import Parameter from 'App/Models/Parameter'
import nodemailer from 'nodemailer'
import aws from 'aws-sdk'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User';
import Log from 'App/Models/Log';

export default class WizardsController {
    async getConfig({ response }: HttpContextContract) {
        const config = await Parameter.all()
        return response.json({
            config
        })
    }

    async setConfig({ request, response }: HttpContextContract) {
        const payload = request.all()
        
        Object.keys(payload).forEach(async key => {
            await Parameter.query().where('name', key).update({
                value: payload[key]
            })
            Env.set(key, payload[key])
        })

        const config = await Parameter.all()

        return response.json({
            config
        })
    }

    async testDrive({ request, response }: HttpContextContract) {
        const message = await new Promise(resolve => {
            const payload = request.all()
            
            const s3 = new aws.S3({
                credentials: {
                    accessKeyId: payload.S3_KEY,
                    secretAccessKey: payload.S3_SECRET,
                },
                region: payload.S3_REGION,
                endpoint: payload.S3_ENDPOINT,
                sslEnabled: true,
            });
            
            s3.listObjectsV2(
                {
                    Bucket: payload.S3_BUCKET,
                },
                (err, data) => {
                    if (err) {
                        resolve({
                            type: 'error',
                            title: 'Connexion impossible',
                            description: "Impossible de se connecter à l'espace de stockage",
                        })
                    } else {
                        resolve({
                            type: 'success',
                            title: 'Connexion réussie',
                            description: "Connexion réussie à l'espace de stockage",
                        })
                    }
                }
            );
        })
        response.json(message)
    }

    async testMail({ request, response }: HttpContextContract) {
        const payload = request.all()

        const transporter = nodemailer.createTransport({
            host: payload.SMTP_HOST,
            port: payload.SMTP_PORT,
            secure: false,
            auth: {
                user: payload.SMTP_USERNAME,
                pass: payload.SMTP_PASSWORD
            },
        });
        try {
            await transporter.sendMail({
                from: `"Klasseur" <${payload.SMTP_USERNAME}>`,
                to: payload.SMTP_USERNAME,
                subject: 'Klasseur - Test de connexion',
                text: 'Si vous recevez cet email, cela signifie que vous avez réussi à vous connecter à votre serveur SMTP',
            })
            return response.json({
                type: 'success',
                title: 'Connexion réussie',
                description: "Connexion réussie à votre serveur SMTP, un email a été envoyé à l'adresse " + payload.SMTP_USERNAME,
            })
        } catch (error) {
            return response.json({
                type: 'error',
                title: 'Connexion impossible',
                description: "Impossible d'envoyer un email à l'adresse " + payload.SMTP_USERNAME,
            })   
        }
    }

    async createAdmin({ request, response }: HttpContextContract) {
        const payload = await request.validate(RegisterValidator)

        const user = new User()
        user.email = payload.email
        // generate a random password
        const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        user.password = password
        user.is_admin = true
        await user.save()

        const transporter = nodemailer.createTransport({
            host: Env.get('SMTP_HOST'),
            port: Env.get('SMTP_PORT'),
            secure: false,
            auth: {
                user: Env.get('SMTP_USERNAME'),
                pass: Env.get('SMTP_PASSWORD')
            },
        });
        await transporter.sendMail({
            from: `"Klasseur" <${Env.get('SMTP_USERNAME')}>`,
            to: payload.email,
            subject: 'Klasseur - Création de votre compte',
            text: `Bonjour,\n\nVotre compte a été créé avec succès.\n\nVotre mot de passe est ${password}`,
        })
        
        setTimeout(async () => {
            await Log.create({
                type: "info",
                title: "Redémarrage de l'API",
                content: "L'API a été redémarrée pour prendre en compte les nouvelles variables d'environnement (Stockage, serveur SMTP)",
            })
            process.exit(0)
        })

        response.status(200)
    }
}
