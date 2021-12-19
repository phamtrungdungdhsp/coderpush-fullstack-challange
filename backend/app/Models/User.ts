import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'first_name', serializeAs: 'firstName' })
  public firstName: string

  @column({ columnName: 'last_name', serializeAs: 'lastName' })
  public lastName: string

  @column()
  public age: string

  @column()
  public picture: string

  @column.dateTime({ autoCreate: true, columnName: 'created_at', serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at', serializeAs: 'createdAt' })
  public updatedAt: DateTime
}
