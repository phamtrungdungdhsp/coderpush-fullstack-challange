import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'
import { formatPageAndLimit } from 'App/Helpers'
export default class UsersController {
  private userService = new UserService()

  /**
   * Fake api sign in
   * @param response
   * @returns Promise<any>
   */
  public async signIn ({ response }: HttpContextContract) {
    const data = await this.userService.signIn()
    return response.status(200).json(data)
  }

  /**
   * Get list user
   * @param request
   * @param response
   * @returns Promise<any>
   */
  public async getUser ({ request, response }: HttpContextContract) {
    const userId = request.header('userId') || 1
    const { page, limit } = formatPageAndLimit(request.only(['page', 'limit']))
    const data = await this.userService.getUser(+userId, page, limit)
    return response.status(200).json(data)
  }

  /**
   * Get detail user
   * @param params
   * @param response
   * @returns Promise<any>
   */
  public async getDetail ({ params, response }: HttpContextContract) {
    const { userId } = params
    const data = await this.userService.getDetail(+userId)
    return response.status(200).json(data)
  }
}
