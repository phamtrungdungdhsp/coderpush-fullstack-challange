import { IError } from 'App/Interfaces'
import { HTTP_CODES } from '../../constants/Enum'

export default class CustomException {
  protected status: number
  protected data: IError
  constructor (status: HTTP_CODES, data?: IError) {
    this.status = status
    data && (this.data = data)
  }
}
