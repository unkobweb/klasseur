import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Document from 'App/Models/Document'
import Tag from 'App/Models/Tag'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const allUsers = await User.all()

    if (allUsers.length == 0) {

      const user = await User.create({
        username: "root",
        password: "root"
      })

      const document = await Document.create({
        filename: "myfilename",
        size: 1024,
        user_uuid: user.uuid
      })

      await Tag.createMany([
        {
          value: "Ordinateur",
          document_uuid: document.uuid
        },
        {
          value: "Facture",
          document_uuid: document.uuid
        },
        {
          value: "Juin",
          document_uuid: document.uuid
        }
      ])
    }
  }
}
