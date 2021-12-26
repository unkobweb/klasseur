import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import {v4 as uuidv4} from "uuid";

export default class Parameter extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public uuid: string

  @column()
  public name: string

  @column()
  public value: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(parameter: Parameter) {
    parameter.uuid = uuidv4()
  }
}
