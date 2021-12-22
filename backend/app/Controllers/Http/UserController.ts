import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'
import { formatPageAndLimit } from 'App/Helpers'
import TargetValidator from 'App/Validators/TargetValidator'
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
    const { id: userId } = request.auth
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

  /**
   * like person
   * @param request
   * @param response
   * @returns Promise<void>
   */
  public async likePerson ({ request, response }: HttpContextContract) {
    const { id: userId } = request.auth
    const { targetId } = await request.validate(TargetValidator)
    const data = await this.userService.likePerson(userId, targetId)
    return response.status(200).json(data)
  }

  /**
   * pass person
   * @param request
   * @param response
   * @returns Promise<void>
   */
  public async passPerson ({ request, response }: HttpContextContract) {
    const { id: userId } = request.auth
    const { targetId } = await request.validate(TargetValidator)
    await this.userService.passPerson(userId, targetId)
    return response.status(200).json({ data: null })
  }

  /**
   * get list persons who you've like
   * @param request
   * @param response
   * @returns Promise<any>
   */
  public async getListLikedPersons ({ request, response }: HttpContextContract) {
    const { id: userId } = request.auth
    const { page, limit } = formatPageAndLimit(request.only(['page', 'limit']))
    const data = await this.userService.getListLikedPersons(userId, page, limit)
    return response.status(200).json(data)
  }

  public async getListMachtedPersons ({ request, response }: HttpContextContract) {
    const { id: userId } = request.auth
    const { page, limit } = formatPageAndLimit(request.only(['page', 'limit']))
    const data = await this.userService.getListMachtedPersons(userId, page, limit)
    return response.status(200).json(data)
  }
}
