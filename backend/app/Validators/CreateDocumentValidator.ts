import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateDocumentValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public schema = schema.create({
		file: schema.file(),
		tags: schema.string({trim: true})
	})

	public messages = {
		'file.required': 'Vous devez fournir un fichier',
		'tags.required': 'Vous devez fournir un tableau de tag (sépraré par des |, ex: \'facture|ordinateur\')'
	}
}
