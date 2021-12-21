import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomException from 'App/Exceptions/CustomException'
import User from 'App/Models/User'
import { HTTP_CODES } from '../../constants/Enum'

export default class Auth {
  public async handle ({ request }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const userId: string|undefined = request.header('userId')
    if (!userId) {
      throw new CustomException(HTTP_CODES.AUTHORIZATION_ERROR)
    }
    const user: User|null = await User.find(userId)
    if (!user) {
      throw new CustomException(HTTP_CODES.AUTHORIZATION_ERROR)
    }
    request.auth = user.toJSON()
    await next()
  }
}
