import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateDocumentValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public schema = schema.create({
		file: schema.file(),
		tags: schema.array().members(schema.string({trim: true}, [
			rules.tagFormat()
		]))
	})

	public messages = {
		'file.required': 'Vous devez fournir un fichier',
		'tags.required': 'Vous devez fournir un tableau de tag (sépraré par des |, ex: \'facture|ordinateur\')',
		'tags.tagFormat': 'Les tags ne respectent pas tous le format demandé (lettres, chiffres et tiret)'
	}
}
