import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.boolean('is_admin').defaultTo(false).notNullable();
      table.boolean('need_change_password').defaultTo(true).notNullable();
      table.timestamps(true,true);
      table.unique(['email']);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
