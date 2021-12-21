import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TableMatches extends BaseSchema {
  protected tableName = 'matches'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('first_user').unsigned().notNullable().references('id').inTable('users')
      table.bigInteger('second_user').unsigned().notNullable().references('id').inTable('users')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
