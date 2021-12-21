import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Match extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'first_user', serializeAs: 'firstUser' })
  public firstUser: number

  @column({ columnName: 'second_user', serializeAs: 'secondUser' })
  public secondUser: number

  @column.dateTime({ autoCreate: true, columnName: 'created_at', serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at', serializeAs: 'updatedAt' })
  public updatedAt: DateTime
}
