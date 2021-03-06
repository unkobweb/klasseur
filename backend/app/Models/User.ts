import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import Hash from '@ioc:Adonis/Core/Hash';
import {v4 as uuidv4} from "uuid";
import Document from './Document';
import ResetPasswordToken from './ResetPasswordToken';

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true
  
  @column({ isPrimary: true })
  public uuid: string

  @column()
  public email: string;

  @column({serializeAs: null})
  public password: string;

  @column()
  public is_admin: boolean;

  @column()
  public need_change_password: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Document, {
    foreignKey: "user_uuid",
    localKey: "uuid"
  })
  public documents: HasMany<typeof Document>

  @hasMany(() => ResetPasswordToken, {
    foreignKey: "user_uuid",
    localKey: "uuid"
  })
  public resetPasswordTokens: HasMany<typeof ResetPasswordToken>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static async createUUID(user: User) {
    user.uuid = uuidv4()
  }
}
