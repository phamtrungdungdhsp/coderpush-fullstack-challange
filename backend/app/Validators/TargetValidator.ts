import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TargetValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    targetId: schema.number([
      rules.unsigned()
    ])
  })
  public messages = {
    'targetId.required': 'targetId is required',
    'targetId.number': 'targetId must be a number',
    'targetId.unsigned': 'targetId must be greater than zero'
  }
}
