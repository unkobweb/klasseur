import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const allUsers = await User.all()

    if (allUsers.length == 0) {
      console.log("here")
      await User.create({
        username: "root",
        password: "root"
      })
    }
  }
}
