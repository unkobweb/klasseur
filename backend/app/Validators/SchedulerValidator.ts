import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SchedulerValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
	  name: schema.string({trim: true}),
	  value: schema.string({trim: true})
  })

  public messages = {
	  'name.required': 'Name is required',
	  'value.required': 'Value is required'
  }
}
