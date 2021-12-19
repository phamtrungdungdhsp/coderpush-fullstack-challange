import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import CustomException from 'App/Exceptions/CustomException'
import { HTTP_CODES } from '../../constants/Enum'
import { USER_NOT_FOUND } from '../../constants/LogicalError'
import { camelPagination } from '../../constants/DatabaseConstant'
import User from '../Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import { snakeToCamel } from 'App/Helpers'

export default class UserService {
  /**
   * fake api sign in
   */
  public async signIn () {
    const result = await Database.rawQuery('select * from users order by rand() limit 1')
    return result[0].length === 1 && Object.keys(result[0][0]).reduce((obj: any, key: string) => {
      obj[snakeToCamel(key)] = result[0][0][key]
      return obj
    }, {})
  }

  /**
   * get list user
   * @param userId
   * @param page 
   * @param limit 
   * @returns Promise<any>
   */
  public async getUser (userId: number, page = 1, limit = 10): Promise<ModelPaginatorContract<User>> {
    const result = await User.query()
      .whereNot('id', userId)
      .orderBy('id', 'desc')
      .paginate(page, limit)
    result.namingStrategy = camelPagination
    return result
  }

  /**
   * 
   * @param userId
   * @returns Promise<User|null>
   */
  public async getDetail (userId: number): Promise<User | null> {
    const user: User | null = await User.find(userId)
    if (!user) {
      throw new CustomException(HTTP_CODES.BAD_REQUEST, USER_NOT_FOUND)
    }
    return user
  }
}
