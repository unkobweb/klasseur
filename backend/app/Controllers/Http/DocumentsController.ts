import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Document from 'App/Models/Document'

export default class DocumentsController {
    async me({auth, response}: HttpContextContract){
        const user = await auth.authenticate()

        const documents = await Document.query().preload('user', (userQuery) => {
            userQuery.where("uuid",user.uuid)
        }).preload('tags')

        response.send(documents)
    }
}
