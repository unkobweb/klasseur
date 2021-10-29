import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Document from 'App/Models/Document'
import CreateDocumentValidator from 'App/Validators/CreateDocumentValidator'
import ObjectStoragesController from './ObjectStoragesController'
import fs from 'fs'

const s3 = new ObjectStoragesController()

export default class DocumentsController {
    async me({auth, response}: HttpContextContract){
        const user = await auth.authenticate()

        const documents = await Document.query().preload('user', (userQuery) => {
            userQuery.where("uuid",user.uuid)
        }).preload('tags')

        response.send(documents)
    }

    async upload({request, auth, response}: HttpContextContract){
        const payload = await request.validate(CreateDocumentValidator)

        const user = await auth.authenticate()

        const document = await Document.create({
            filename: payload.filename,
            size: payload.file.size,
            user_uuid: user.uuid
        })

        //@ts-ignore
        s3.upload(user.uuid, Buffer.from(fs.readFileSync(payload.file.tmpPath)), payload.filename)

        response.send(document)
    }

    async download({request, auth, response}: HttpContextContract){
        const uuid = request.param('uuid')

        const user = await auth.authenticate()

        const document = await Document.findBy('uuid', uuid)

        if (!document) {
            response.notFound("Document not found")
        }

        const buffer = await s3.download(user.uuid, document?.filename)

        response.type('file-content-type-goes-here')
        response.send(buffer)
    }
}
