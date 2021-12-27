import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from 'App/Models/Log'
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

    async deleteUser({ params, response }: HttpContextContract) {
        const user = await User.find(params.uuid)
        if (!user) {
            return response.status(404).json({
                error: 'user not found'
            })
        }
        await user.delete()
        return response.status(200).json({
            message: 'user deleted'
        })
    }

    async getLogs({ request, response }: HttpContextContract) {
        const page = request.qs().page || 1
        const logs = await Log.query().orderBy('created_at','desc').paginate(page, 20)
        return response.json({
            logs
        })
    }
}