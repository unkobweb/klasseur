import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.timestamps(true,true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
