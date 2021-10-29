import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateDocumentValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public schema = schema.create({
		filename: schema.string({ trim: true }),
		file: schema.file()
	})

	public messages = {
		'filename.unique': 'Le nom de fichier existe déja',
		'filename.required': 'Vous devez spécifier un nom',
		'file.required': 'Vous devez fournir un fichier'
	}
}
