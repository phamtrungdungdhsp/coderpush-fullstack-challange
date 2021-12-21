import { IError } from 'App/Interfaces'

export const USER_NOT_FOUND: IError = { code: 1, message: 'User not found' }

export const ACTION_FORBIDDEN: IError = { code: 2, message: 'You can not like/pass yourself' }
