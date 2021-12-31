import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Parameter from 'App/Models/Parameter'
import SchedulerValidator from 'App/Validators/SchedulerValidator'

export default class SchedulersController {
    async setScheduler({ request, response }: HttpContextContract) {
        const {name, value} = await request.validate(SchedulerValidator)
        const scheduler = await Parameter.findBy('name', name)
        if (scheduler) {
            scheduler.value = value
            await scheduler.save()
        } else {
            const newScheduler = new Parameter()
            newScheduler.name = name
            newScheduler.value = value
            await newScheduler.save()
        }
        return response.json({
            message: 'Scheduler updated successfully'
        })
    }

    async getSchedulers({ response }: HttpContextContract) {
        const dbScheduler = (await Parameter.findBy('name', 'db_save_scheduler')) || ''
        const fileScheduler = (await Parameter.findBy('name', 'file_save_scheduler')) || ''
        return response.json({
            dbScheduler,
            fileScheduler
        })
    }

    async deleteScheduler({ params, response }: HttpContextContract) {
        const scheduler = await Parameter.findBy('name', params.name)
        if (scheduler) {
            await scheduler.delete()
            return response.json({
                message: 'Scheduler deleted successfully'
            })
        }
        return response.json({
            message: 'Scheduler not found'
        })
    }
}
