import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TableHistories extends BaseSchema {
  protected tableName = 'actions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('host').unsigned().notNullable().references('id').inTable('users')
      table.bigInteger('target').unsigned().notNullable().references('id').inTable('users')
      table.string('action').notNullable() 
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
