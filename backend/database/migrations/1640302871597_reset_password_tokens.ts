import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ResetPasswordTokens extends BaseSchema {
  protected tableName = 'reset_password_tokens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary()
      table.uuid('user_uuid').references('users.uuid').onDelete('CASCADE')
      table.dateTime('used_at').nullable()
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
