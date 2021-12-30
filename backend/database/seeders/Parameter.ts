import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Parameter from 'App/Models/Parameter'

export default class ParameterSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const parameters = [
      { name: 'DRIVE_DISK', value: 'local' },
      { name: 'S3_KEY', value: '' },
      { name: 'S3_SECRET', value: '' },
      { name: 'S3_REGION', value: '' },
      { name: 'S3_BUCKET', value: '' },
      { name: 'S3_ENDPOINT', value: '' },
      { name: 'SMTP_HOST', value: '' },
      { name: 'SMTP_PORT', value: '' },
      { name: 'SMTP_USERNAME', value: '' },
      { name: 'SMTP_PASSWORD', value: '' }
    ]
    // if parameter doesn't exist in db, create it
    for (let i = 0; i < parameters.length; i++) {
      const parameter = await Parameter.findBy('name', parameters[i].name)
      if (parameter === null) {
        await Parameter.create({
          name: parameters[i].name,
          value: parameters[i].value
        })
      }
    }
  }
}
