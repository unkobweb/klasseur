import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Document from 'App/Models/Document'
import CreateDocumentValidator from 'App/Validators/CreateDocumentValidator'
import Drive from '@ioc:Adonis/Core/Drive'
import fs from 'fs'
import Tag from 'App/Models/Tag'
import UpdateDocumentValidator from 'App/Validators/UpdateDocumentValidator'

export default class DocumentsController {
    async me({auth, response}: HttpContextContract){
        const user = await auth.authenticate()

        const documents = await Document.query().preload('user').preload('tags', (tagsQuery) => {
            tagsQuery.orderBy('value', 'asc')
        }).where('user_uuid',user.uuid).orderBy('created_at','desc')

        response.send(documents)
    }

    async upload({request, auth, response}: HttpContextContract){
        const payload = await request.validate(CreateDocumentValidator)

        const user = await auth.authenticate()

        if (!payload.file.tmpPath){
            return response.badRequest("Upload file failed")
        }

        const document = await Document.create({
            filename: payload.file.clientName,
            size: payload.file.size,
            user_uuid: user.uuid
        })

        const tags = payload.tags.map(tag => tag.toLowerCase())

        await Tag.createMany(tags.map(tag => ({
            value: tag,
            document_uuid: document.uuid
        })))

        await document.load('tags')

        await Drive.put(`${user.uuid}/${document.filename}`, Buffer.from(fs.readFileSync(payload.file.tmpPath)))
        response.send(document)
    }

    async download({request, auth, response}: HttpContextContract){
        const uuid = request.param('uuid')

        const user = await auth.authenticate()

        

        const document = await Document.query().preload('user').where('user_uuid',user.uuid).andWhere('uuid',uuid).first()

        if (!document) {
            return response.notFound("Document not found")
        }

        const url = await Drive.getSignedUrl(`${user.uuid}/${document.filename}`, {
            expiresIn: '3mins'
        })

        response.json({url})
    }

    async update({request, auth, response}: HttpContextContract){
        const uuid = request.param('uuid')

        const payload = await request.validate(UpdateDocumentValidator)

        const user = await auth.authenticate()

        const document = await Document.query().preload('user').preload('tags').where('user_uuid',user.uuid).andWhere('uuid',uuid).first();

        if (!document) {
            return response.notFound("Document not found")
        }
        // for each tag of document, delete it
        await Tag.query().where('document_uuid',document.uuid).delete()

        // for each tag in payload, create a new tag and attach it to document
        for (const tag of payload.tags) {
            await Tag.create({
                value: tag.toLowerCase(),
                document_uuid: document.uuid
            })
        }

        await document.load('tags', (tagsQuery) => {
            tagsQuery.orderBy('value', 'asc')
        })

        response.send(document)
    }

    async delete({request, auth, response}: HttpContextContract){
        const uuid = request.param('uuid')

        const user = await auth.authenticate()

        const document = await Document.query().preload('user').where('user_uuid',user.uuid).andWhere('uuid',uuid).first()

        if (!document) {
            return response.notFound("Document not found")
        }

        await Drive.delete(`${user.uuid}/${document.filename}`)

        await document.delete()

        response.send(document)
    }
}
