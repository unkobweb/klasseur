import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import {v4 as uuidv4} from "uuid";

export default class ResetPasswordToken extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public uuid: string

  @column()
  public user_uuid: string

  @column()
  public used_at: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_uuid',
    localKey: 'uuid',
  })
  public user: BelongsTo<typeof User>

  @beforeCreate()
  public static async createUUID(resetPasswordToken: ResetPasswordToken) {
    resetPasswordToken.uuid = uuidv4()
  }
}
