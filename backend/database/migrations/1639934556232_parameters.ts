import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Parameters extends BaseSchema {
  protected tableName = 'parameters'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary()
      table.string('name').notNullable()
      table.string('value').notNullable()

      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
