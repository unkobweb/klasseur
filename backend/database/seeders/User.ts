import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const allUsers = await User.all()

    if (allUsers.length == 0) {
      const user = new User()
      user.email = "sieg.alexandre@gmail.com"
      user.password = "123456"
      user.is_admin = true
      await user.save()
    }
  }
}
