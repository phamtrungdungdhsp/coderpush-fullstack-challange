import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import CustomException from 'App/Exceptions/CustomException'
import { EAction, HTTP_CODES } from '../../constants/Enum'
import { ACTION_FORBIDDEN, USER_NOT_FOUND } from '../../constants/LogicalError'
import { camelPagination } from '../../constants/DatabaseConstant'
import User from '../Models/User'
import Action from '../Models/Action'
import Database from '@ioc:Adonis/Lucid/Database'
import { snakeToCamel } from 'App/Helpers'
import Match from 'App/Models/Match'

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

  /**
   * like person
   * @param userId
   * @param targetId
   * @return Promise<void>
   */
  public async likePerson (userId: number, targetId: number): Promise<void> {
    console.log('go sss');
    
    if (targetId === userId) {
      throw new CustomException(HTTP_CODES.BAD_REQUEST, ACTION_FORBIDDEN)
     }
    // Don't need to check where userId existed or not, it was already checked in middleware
    const target: User|null = await User.find(userId);
    if (!target) {
      throw new CustomException(HTTP_CODES.BAD_REQUEST, USER_NOT_FOUND)
    }
    await Action.updateOrCreate({ host: userId }, { target: targetId, action: EAction.like })
    
    // Check if target liked userId, if yes => create match record
    const liked: Action|null = await Action
      .query()
      .where({ target: userId })
      .first()
    if (liked) {
      // firstUser always be less than secondUser
      await Match.updateOrCreate({ firstUser: userId > targetId ? targetId : userId }, { secondUser:  userId > targetId ? userId : targetId })
    }
  }

  
  /**
   * pass person
   * @param userId
   * @param targetId
   * @return Promise<void>
   */
  public async passPerson (userId: number, targetId: number): Promise<void> {

    console.log('go ss');
    
    if (targetId === userId) {
      throw new CustomException(HTTP_CODES.BAD_REQUEST, ACTION_FORBIDDEN)
    }
    // Don't need to check where userId existed or not, it was already checked in middleware
    const target: User|null = await User.find(userId);
    if (!target) {
      throw new CustomException(HTTP_CODES.BAD_REQUEST, USER_NOT_FOUND)
    }
    await Action.create({ host: userId, target: targetId, action: EAction.pass })
  }

  /**
   * Get people who you've liked
   * @param userId
   * @param page 
   * @param limit 
   * @returns 
   */
  public async getListLikedPersons (userId: number, page: number, limit: number): Promise<ModelPaginatorContract<Action>> {
    const result = await Action
      .query()
      .preload('user')
      .where({ host: userId, action: EAction.like })
      .orderBy('id', 'desc')
      .paginate(page, limit)
    result.namingStrategy = camelPagination
    return result
  }

  /**
   * get list matched person
   * @param userId
   * @param page 
   * @param limit 
   * @returns 
   */
  public async getListMachtedPersons (userId: number, page: number, limit: number): Promise<ModelPaginatorContract<Match>> {
    const result: any = await Match
      .query()
      .where({ firstUser: userId })
      .orWhere({ secondUser: userId })
      .orderBy('id', 'desc')
      .paginate(page, limit)
    
    const ids: number[] = result.rows.reduce((array: number[], item: Match) => {
      array.push(userId === item.firstUser ?  item.secondUser : item.firstUser)
      return array
    }, [])
    const users: User[] = await User
    .query()
    .whereIn('id', ids)
    result.rows = users
    result.namingStrategy = camelPagination
    return result
  }
}
