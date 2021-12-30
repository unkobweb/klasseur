import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class Wizard {
  public async handle ({ response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const users = await User.all()
    if (users.length === 0) {
      await next()
    } else {
      return response.status(403).send({
        error: 'Wizard setup already completed'
      })
    }
  }
}
