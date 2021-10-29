import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import {v4 as uuidv4} from 'uuid'

export default class Document extends BaseModel {
  public static selfAssignPrimaryKey = true
  
  @column({ isPrimary: true })
  public uuid: string

  @column()
  public filename: string

  @column()
  public size: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public user_uuid: string;
  
  @belongsTo(() => User, {
    foreignKey: "user_uuid",
    localKey: "uuid"
  })
  public user: BelongsTo<typeof User>

  @beforeCreate()
  public static async createUUID(document: Document) {
    document.uuid = uuidv4()
  }
}

