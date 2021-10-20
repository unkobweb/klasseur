import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
	  username: schema.string({trim: true}, [
		  rules.unique({table: 'users', column: 'username'})
	  ]),
	  password: schema.string({trim: true}, [
		  rules.confirmed('passwordConfirmed')
	  ]),
  })

	/**
	 * Custom messages for validation failures. You can make use of dot notation `(.)`
	 * for targeting nested fields and array expressions `(*)` for targeting all
	 * children of an array. For example:
	 *
	 * {
	 *   'profile.username.required': 'Username is required',
	 *   'scores.*.number': 'Define scores as valid numbers'
	 * }
	 *
	 */
  public messages = {
	  'username.required': 'You must provide a username',
	  'username.unique': 'username is already used',
	  'password.required': 'You must provide a password',
	  'passwordConfirmed.confirmed': 'You must confirm the password'
  }
}
