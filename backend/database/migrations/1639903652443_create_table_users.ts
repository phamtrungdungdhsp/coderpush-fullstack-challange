import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateTableUsers extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.integer('age').unsigned().notNullable()
      table.text('picture')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
