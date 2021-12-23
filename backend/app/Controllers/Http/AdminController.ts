import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AdminsController {
    async stats({ response }: HttpContextContract) {
        const users = await User.query().preload('documents')
        const documentSize = users.map(user => {
            return {
                email: user.email,
                documents: user.documents.reduce((acc, doc) => acc + doc.size,0)
            }
        })
        const documentCount = users.map(user => {
            return {
                email: user.email,
                documents: user.documents.length
            }
        })
        // count all documents
        const totalDocuments = documentCount.reduce((acc, doc) => acc + doc.documents, 0)
        // count all documents size
        const totalDocumentsSize = documentSize.reduce((acc, doc) => acc + doc.documents, 0)
        // count all users
        const totalUsers = users.length
        
        return response.json({
            documentSize,
            documentCount,
            totalDocuments,
            totalDocumentsSize,
            totalUsers
        })
    }

    async allUsers({ response }: HttpContextContract) {
        const users = await User.all()
        return response.json({users})
    }
}