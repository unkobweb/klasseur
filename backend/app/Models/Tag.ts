import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Document from './Document'

export default class Tag extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public uuid: string

  @column()
  public value: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public document_uuid: string

  @belongsTo(() => Document, {
    foreignKey: "document_uuid",
    localKey: "uuid"
  })
  public tag: BelongsTo<typeof Document>

  @beforeCreate()
  public static async createUUID(tag: Tag) {
    tag.uuid = uuidv4()
  }
}
